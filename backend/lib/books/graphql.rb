module Books
  module GraphQL
    BookType = ::GraphQL::ObjectType.define do
      name "Book"
      description "A book"
      field :id, types.ID
      field :title, !types.String
      field :blurb, !types.String
      field :permalink, !types.String
      field :defaultBranch, BranchType do
        resolve -> (book, _args, ctx) {
          branch_repo = BranchRepository.new
          branches = branch_repo.by_book(book.id).to_a
          branches.detect(&:default)
        }
      end
    end

    PartType = ::GraphQL::EnumType.define do
      name "Book Parts"
      description "Parts of the book"
      value "FRONTMATTER", "The front of the book, introductions, prefaces, etc."
      value "MAINMATTER", "The main content of the book"
      value "BACKMATTER", "The back of the book, appendixes, etc."
    end


    BranchType = ::GraphQL::ObjectType.define do
      name "Branch"
      description "A branch"

      field :id, types.ID
      field :name, !types.String
      field :default, !types.Boolean
      field :chapters, types[ChapterType] do
        argument :part, !PartType

        resolve -> (branch, args, ctx) {
          commit_repo = CommitRepository.new
          commit = commit_repo.latest_for_branch(branch.id)
          return [] unless commit

          chapter_repo = ChapterRepository.new
          chapter_repo.for_commit_and_part(commit.id, args["part"].downcase)
        }
      end

      field :chapter, ChapterType do
        argument :permalink, !types.String

        resolve -> (branch, args, ctx) {
          commit_repo = CommitRepository.new
          commit = commit_repo.latest_for_branch(branch.id)
          return [] unless commit

          chapter_repo = ChapterRepository.new
          chapter_repo.for_commit_and_permalink(commit.id, args["permalink"])
        }
      end
    end

    ChapterType = ::GraphQL::ObjectType.define do
      name "Chapter"
      description "A chapter"

      field :id, types.ID
      field :title, !types.String
      field :part, !types.String
      field :position, !types.Int
      field :permalink, !types.String

      field :elements, types[ElementType] do
        resolve -> (chapter, _args, _ctx) {
          element_repo = ElementRepository.new
          element_repo.by_chapter(chapter.id)
        }
      end
    end

    ElementType = ::GraphQL::ObjectType.define do
      name "Element"
      description "An element"

      field :id, types.ID
      field :content, types.String
    end

    UserType = ::GraphQL::ObjectType.define do
      name "User"
      description "A user"

      field :id, types.ID
      field :email, types.String
    end

    QueryType = ::GraphQL::ObjectType.define do
      name "Query"
      description "The query root of this schema"

      field :books, types[BookType] do
        resolve -> (obj, args, ctx) {
          book_repo = BookRepository.new
          book_repo.all
        }
      end

      field :book do
        argument :permalink, !types.String

        type BookType
        resolve -> (obj, args, ctx) {
          book_repo = BookRepository.new
          book_repo.find_by_permalink(args[:permalink])
        }
      end

      field :currentUser do
        type UserType

        resolve -> (obj, args, ctx) {
          ctx[:current_user]
        }
      end
    end

    LoginMutationType = ::GraphQL::ObjectType.define do
      name "LoginMutation"

      field :token, types.String do
        description "Login attempt"
        argument :email, !types.String
        argument :password, !types.String

        resolve -> (obj, args, ctx) {
          user_repo = UserRepository.new
          user = user_repo.find_by_email(args["email"])
          if user.correct_password?(args["password"])
            user_repo.regenerate_token(user.id)
          end
        }
      end
    end

    Schema = ::GraphQL::Schema.define do
      query QueryType
      mutation LoginMutationType
    end
  end
end

