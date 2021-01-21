import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BookPermissionCheckResult": [
      "Book",
      "PermissionDenied"
    ],
    "LoginResult": [
      "FailedLoginResult",
      "SuccessfulLoginResult"
    ]
  }
};
      export default result;
    
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A book */
export type Book = {
  readonly __typename: 'Book';
  readonly blurb: Scalars['String'];
  readonly branch: Branch;
  readonly branches: ReadonlyArray<Branch>;
  readonly commit: Commit;
  readonly currentUserAuthor: Scalars['Boolean'];
  readonly defaultBranch: Branch;
  readonly id: Scalars['ID'];
  readonly latestCommit: Commit;
  readonly notes: ReadonlyArray<Note>;
  readonly permalink: Scalars['String'];
  readonly readers: ReadonlyArray<Reader>;
  readonly title: Scalars['String'];
};


/** A book */
export type BookBranchArgs = {
  name: Scalars['String'];
};


/** A book */
export type BookCommitArgs = {
  gitRef?: Maybe<Scalars['String']>;
};


/** A book */
export type BookLatestCommitArgs = {
  gitRef?: Maybe<Scalars['String']>;
};


/** A book */
export type BookNotesArgs = {
  elementId: Scalars['String'];
};

/** Parts of the book */
export enum BookParts {
  /** The front of the book, introductions, prefaces, etc. */
  Frontmatter = 'FRONTMATTER',
  /** The main content of the book */
  Mainmatter = 'MAINMATTER',
  /** The back of the book, appendixes, etc. */
  Backmatter = 'BACKMATTER'
}

/** The result from attempting a login */
export type BookPermissionCheckResult = Book | PermissionDenied;

/** A branch */
export type Branch = {
  readonly __typename: 'Branch';
  readonly chapter: Chapter;
  readonly chapters: ReadonlyArray<Chapter>;
  readonly commits: ReadonlyArray<Commit>;
  readonly default: Scalars['Boolean'];
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};


/** A branch */
export type BranchChapterArgs = {
  permalink: Scalars['String'];
};


/** A branch */
export type BranchChaptersArgs = {
  part: BookParts;
};

/** A chapter */
export type Chapter = {
  readonly __typename: 'Chapter';
  readonly commit: Commit;
  readonly elements: ReadonlyArray<Element>;
  readonly footnotes: ReadonlyArray<Footnote>;
  readonly id: Scalars['ID'];
  readonly nextChapter?: Maybe<Chapter>;
  readonly part: Scalars['String'];
  readonly permalink: Scalars['String'];
  readonly position: Scalars['Int'];
  readonly previousChapter?: Maybe<Chapter>;
  readonly sections: ReadonlyArray<Section>;
  readonly title: Scalars['String'];
};

/** A comment */
export type Comment = {
  readonly __typename: 'Comment';
  readonly createdAt: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly text: Scalars['String'];
  readonly user: User;
};

/** A commit */
export type Commit = {
  readonly __typename: 'Commit';
  readonly branch: Branch;
  readonly chapter: Chapter;
  readonly chapters: ReadonlyArray<Chapter>;
  readonly createdAt: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly message?: Maybe<Scalars['String']>;
  readonly sha: Scalars['String'];
};


/** A commit */
export type CommitChapterArgs = {
  permalink: Scalars['String'];
};


/** A commit */
export type CommitChaptersArgs = {
  part: BookParts;
};

/** An element */
export type Element = {
  readonly __typename: 'Element';
  readonly chapter: Chapter;
  readonly content?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly identifier?: Maybe<Scalars['String']>;
  readonly image?: Maybe<Image>;
  readonly noteCount: Scalars['Int'];
  readonly notes: ReadonlyArray<Note>;
  readonly tag: Scalars['String'];
};


/** An element */
export type ElementNotesArgs = {
  state: NoteState;
};

export type FailedLoginResult = {
  readonly __typename: 'FailedLoginResult';
  readonly error: Scalars['String'];
};

export type Footnote = {
  readonly __typename: 'Footnote';
  readonly content: Scalars['String'];
  readonly identifier: Scalars['String'];
  readonly number: Scalars['Int'];
};

/** An image */
export type Image = {
  readonly __typename: 'Image';
  readonly caption?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly path: Scalars['String'];
};

export type Invitation = {
  readonly __typename: 'Invitation';
  readonly bookId: Scalars['String'];
  readonly userId: Scalars['String'];
};

/** The result from attempting a login */
export type LoginResult = FailedLoginResult | SuccessfulLoginResult;

export type Mutations = {
  readonly __typename: 'Mutations';
  readonly addComment: Comment;
  readonly closeNote: Note;
  readonly deleteComment: Comment;
  readonly inviteUser: Invitation;
  /** Attempt a login */
  readonly login: LoginResult;
  readonly openNote: Note;
  readonly submitNote: Note;
  readonly updateComment: Comment;
  readonly updateNote: Note;
};


export type MutationsAddCommentArgs = {
  noteId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationsCloseNoteArgs = {
  id: Scalars['ID'];
};


export type MutationsDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationsInviteUserArgs = {
  bookId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationsLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationsOpenNoteArgs = {
  id: Scalars['ID'];
};


export type MutationsSubmitNoteArgs = {
  bookPermalink: Scalars['ID'];
  elementId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationsUpdateCommentArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationsUpdateNoteArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};

/** A note */
export type Note = {
  readonly __typename: 'Note';
  readonly comments: ReadonlyArray<Comment>;
  readonly createdAt: Scalars['String'];
  readonly element: Element;
  readonly id: Scalars['ID'];
  readonly number: Scalars['Int'];
  readonly state: Scalars['String'];
  readonly text: Scalars['String'];
  readonly user: User;
};

export enum NoteState {
  /** Open notes */
  Open = 'OPEN',
  /** Closed notes */
  Closed = 'CLOSED'
}

export type PermissionDenied = {
  readonly __typename: 'PermissionDenied';
  readonly error: Scalars['String'];
};

/** The query root of this schema */
export type Query = {
  readonly __typename: 'Query';
  readonly book: BookPermissionCheckResult;
  readonly books: ReadonlyArray<Book>;
  readonly comments: ReadonlyArray<Comment>;
  readonly currentUser?: Maybe<User>;
  readonly elementsWithNotes: ReadonlyArray<Element>;
  readonly note: Note;
  readonly users: ReadonlyArray<User>;
};


/** The query root of this schema */
export type QueryBookArgs = {
  permalink: Scalars['String'];
};


/** The query root of this schema */
export type QueryCommentsArgs = {
  noteId: Scalars['ID'];
};


/** The query root of this schema */
export type QueryElementsWithNotesArgs = {
  bookPermalink: Scalars['String'];
  state: NoteState;
};


/** The query root of this schema */
export type QueryNoteArgs = {
  bookPermalink: Scalars['String'];
  number: Scalars['Int'];
};


/** The query root of this schema */
export type QueryUsersArgs = {
  githubLogin: Scalars['String'];
};

/** A reader for a book */
export type Reader = {
  readonly __typename: 'Reader';
  readonly author: Scalars['Boolean'];
  readonly email: Scalars['String'];
  readonly githubLogin?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

/** A section */
export type Section = {
  readonly __typename: 'Section';
  readonly id: Scalars['ID'];
  readonly link: Scalars['String'];
  readonly subsections: ReadonlyArray<Section>;
  readonly title: Scalars['String'];
};

export type SuccessfulLoginResult = {
  readonly __typename: 'SuccessfulLoginResult';
  readonly email: Scalars['String'];
  readonly token: Scalars['String'];
};

/** A user */
export type User = {
  readonly __typename: 'User';
  readonly email: Scalars['String'];
  readonly githubLogin?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

export type BookQueryVariables = Exact<{
  permalink: Scalars['String'];
  gitRef?: Maybe<Scalars['String']>;
}>;


export type BookQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly title: string, readonly permalink: string, readonly currentUserAuthor: boolean, readonly latestCommit: { readonly __typename: 'Commit', readonly sha: string }, readonly commit: { readonly __typename: 'Commit', readonly sha: string, readonly createdAt: string, readonly branch: { readonly __typename: 'Branch', readonly name: string }, readonly frontmatter: ReadonlyArray<(
        { readonly __typename: 'Chapter' }
        & ChapterFieldsFragment
      )>, readonly mainmatter: ReadonlyArray<(
        { readonly __typename: 'Chapter' }
        & ChapterFieldsFragment
      )>, readonly backmatter: ReadonlyArray<(
        { readonly __typename: 'Chapter' }
        & ChapterFieldsFragment
      )> } } | { readonly __typename: 'PermissionDenied', readonly error: string } };

export type ChapterFieldsFragment = { readonly __typename: 'Chapter', readonly id: string, readonly title: string, readonly position: number, readonly permalink: string };

export type BranchQueryVariables = Exact<{
  bookPermalink: Scalars['String'];
  name: Scalars['String'];
}>;


export type BranchQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly id: string, readonly title: string, readonly branch: { readonly __typename: 'Branch', readonly id: string, readonly default: boolean, readonly name: string, readonly commits: ReadonlyArray<{ readonly __typename: 'Commit', readonly sha: string, readonly message?: Maybe<string>, readonly createdAt: string }> } } | { readonly __typename: 'PermissionDenied' } };

export type BranchesQueryVariables = Exact<{
  bookPermalink: Scalars['String'];
}>;


export type BranchesQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly id: string, readonly title: string, readonly branches: ReadonlyArray<{ readonly __typename: 'Branch', readonly id: string, readonly default: boolean, readonly name: string }> } | { readonly __typename: 'PermissionDenied' } };

export type ChapterQueryVariables = Exact<{
  bookPermalink: Scalars['String'];
  chapterPermalink: Scalars['String'];
  gitRef?: Maybe<Scalars['String']>;
}>;


export type ChapterQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly title: string, readonly id: string, readonly permalink: string, readonly latestCommit: { readonly __typename: 'Commit', readonly sha: string }, readonly commit: { readonly __typename: 'Commit', readonly id: string, readonly sha: string, readonly createdAt: string, readonly branch: { readonly __typename: 'Branch', readonly name: string }, readonly chapter: { readonly __typename: 'Chapter', readonly id: string, readonly title: string, readonly position: number, readonly permalink: string, readonly part: string, readonly sections: ReadonlyArray<(
          { readonly __typename: 'Section', readonly subsections: ReadonlyArray<(
            { readonly __typename: 'Section' }
            & SectionFragmentFragment
          )> }
          & SectionFragmentFragment
        )>, readonly previousChapter?: Maybe<(
          { readonly __typename: 'Chapter' }
          & ChapterFragmentFragment
        )>, readonly nextChapter?: Maybe<(
          { readonly __typename: 'Chapter' }
          & ChapterFragmentFragment
        )>, readonly footnotes: ReadonlyArray<{ readonly __typename: 'Footnote', readonly identifier: string, readonly content: string }>, readonly elements: ReadonlyArray<{ readonly __typename: 'Element', readonly id: string, readonly content?: Maybe<string>, readonly tag: string, readonly noteCount: number, readonly identifier?: Maybe<string>, readonly image?: Maybe<{ readonly __typename: 'Image', readonly id: string, readonly caption?: Maybe<string>, readonly path: string }> }> } } } | { readonly __typename: 'PermissionDenied', readonly error: string } };

export type SectionFragmentFragment = { readonly __typename: 'Section', readonly id: string, readonly title: string, readonly link: string };

export type ChapterFragmentFragment = { readonly __typename: 'Chapter', readonly id: string, readonly title: string, readonly position: number, readonly part: string, readonly permalink: string };

export type NoteMutationMutationVariables = Exact<{
  bookPermalink: Scalars['ID'];
  elementId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type NoteMutationMutation = { readonly __typename: 'Mutations', readonly submitNote: (
    { readonly __typename: 'Note' }
    & NoteFragment
  ) };

export type ChapterNotesQueryVariables = Exact<{
  elementId: Scalars['String'];
  bookPermalink: Scalars['String'];
}>;


export type ChapterNotesQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly id: string, readonly notes: ReadonlyArray<(
      { readonly __typename: 'Note' }
      & NoteFragment
    )> } | { readonly __typename: 'PermissionDenied' } };

export type BookIdTitleAndReadersQueryVariables = Exact<{
  permalink: Scalars['String'];
}>;


export type BookIdTitleAndReadersQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly id: string, readonly title: string, readonly readers: ReadonlyArray<{ readonly __typename: 'Reader', readonly githubLogin?: Maybe<string>, readonly name: string }> } | { readonly __typename: 'PermissionDenied', readonly error: string } };

export type UsersQueryVariables = Exact<{
  githubLogin: Scalars['String'];
}>;


export type UsersQuery = { readonly __typename: 'Query', readonly users: ReadonlyArray<{ readonly __typename: 'User', readonly id: string, readonly githubLogin?: Maybe<string>, readonly name: string }> };

export type InviteUserMutationVariables = Exact<{
  bookId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type InviteUserMutation = { readonly __typename: 'Mutations', readonly inviteUser: { readonly __typename: 'Invitation', readonly bookId: string, readonly userId: string } };

export type ReadersQueryVariables = Exact<{
  permalink: Scalars['String'];
}>;


export type ReadersQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly readers: ReadonlyArray<{ readonly __typename: 'Reader', readonly id: string, readonly author: boolean, readonly githubLogin?: Maybe<string>, readonly name: string }> } | { readonly __typename: 'PermissionDenied', readonly error: string } };

export type CloseNoteMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CloseNoteMutationMutation = { readonly __typename: 'Mutations', readonly closeNote: { readonly __typename: 'Note', readonly id: string, readonly state: string } };

export type AddCommentMutationMutationVariables = Exact<{
  noteId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type AddCommentMutationMutation = { readonly __typename: 'Mutations', readonly addComment: (
    { readonly __typename: 'Comment' }
    & CommentFragmentFragment
  ) };

export type CommentFragmentFragment = { readonly __typename: 'Comment', readonly id: string, readonly text: string, readonly createdAt: string, readonly user: { readonly __typename: 'User', readonly id: string, readonly email: string, readonly name: string } };

export type CommentsQueryQueryVariables = Exact<{
  noteId: Scalars['ID'];
}>;


export type CommentsQueryQuery = { readonly __typename: 'Query', readonly comments: ReadonlyArray<(
    { readonly __typename: 'Comment' }
    & CommentFragmentFragment
  )> };

export type DeleteCommentMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCommentMutationMutation = { readonly __typename: 'Mutations', readonly deleteComment: { readonly __typename: 'Comment', readonly id: string } };

export type UpdateCommentMutationMutationVariables = Exact<{
  id: Scalars['ID'];
  text: Scalars['String'];
}>;


export type UpdateCommentMutationMutation = { readonly __typename: 'Mutations', readonly updateComment: { readonly __typename: 'Comment', readonly id: string, readonly text: string } };

export type NoteQueryVariables = Exact<{
  bookPermalink: Scalars['String'];
  number: Scalars['Int'];
}>;


export type NoteQuery = { readonly __typename: 'Query', readonly note: (
    { readonly __typename: 'Note', readonly element: (
      { readonly __typename: 'Element' }
      & ElementWithInfoFragment
    ) }
    & NoteFragment
  ) };

export type OpenNoteMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OpenNoteMutationMutation = { readonly __typename: 'Mutations', readonly openNote: { readonly __typename: 'Note', readonly id: string, readonly state: string } };

export type UpdateNoteMutationMutationVariables = Exact<{
  id: Scalars['ID'];
  text: Scalars['String'];
}>;


export type UpdateNoteMutationMutation = { readonly __typename: 'Mutations', readonly updateNote: { readonly __typename: 'Note', readonly id: string, readonly text: string, readonly state: string } };

export type NoteBookQueryVariables = Exact<{
  bookPermalink: Scalars['String'];
}>;


export type NoteBookQuery = { readonly __typename: 'Query', readonly book: { readonly __typename: 'Book', readonly id: string, readonly permalink: string, readonly title: string } | { readonly __typename: 'PermissionDenied' } };

export type ElementWithInfoFragment = { readonly __typename: 'Element', readonly id: string, readonly content?: Maybe<string>, readonly tag: string, readonly image?: Maybe<{ readonly __typename: 'Image', readonly id: string, readonly path: string, readonly caption?: Maybe<string> }>, readonly chapter: { readonly __typename: 'Chapter', readonly title: string, readonly part: string, readonly position: number, readonly permalink: string, readonly commit: { readonly __typename: 'Commit', readonly sha: string, readonly branch: { readonly __typename: 'Branch', readonly name: string } } } };

export type NoteFragment = { readonly __typename: 'Note', readonly id: string, readonly number: number, readonly text: string, readonly createdAt: string, readonly state: string, readonly user: { readonly __typename: 'User', readonly id: string, readonly email: string, readonly name: string }, readonly comments: ReadonlyArray<{ readonly __typename: 'Comment', readonly id: string, readonly text: string, readonly createdAt: string, readonly user: { readonly __typename: 'User', readonly id: string, readonly email: string, readonly name: string } }> };

export type BookNotesQueryVariables = Exact<{
  bookPermalink: Scalars['String'];
  state: NoteState;
}>;


export type BookNotesQuery = { readonly __typename: 'Query', readonly elementsWithNotes: ReadonlyArray<(
    { readonly __typename: 'Element', readonly notes: ReadonlyArray<(
      { readonly __typename: 'Note' }
      & NoteFragment
    )> }
    & ElementWithInfoFragment
  )> };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { readonly __typename: 'Query', readonly books: ReadonlyArray<{ readonly __typename: 'Book', readonly id: string, readonly title: string, readonly permalink: string, readonly blurb: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { readonly __typename: 'Query', readonly currentUser?: Maybe<{ readonly __typename: 'User', readonly id: string, readonly githubLogin?: Maybe<string>, readonly email: string }> };

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutationMutation = { readonly __typename: 'Mutations', readonly login: { readonly __typename: 'FailedLoginResult', readonly error: string } | { readonly __typename: 'SuccessfulLoginResult', readonly email: string, readonly token: string } };

export const ChapterFieldsFragmentDoc = gql`
    fragment chapterFields on Chapter {
  id
  title
  position
  permalink
}
    `;
export const SectionFragmentFragmentDoc = gql`
    fragment sectionFragment on Section {
  id
  title
  link
}
    `;
export const ChapterFragmentFragmentDoc = gql`
    fragment chapterFragment on Chapter {
  id
  title
  position
  part
  permalink
}
    `;
export const CommentFragmentFragmentDoc = gql`
    fragment commentFragment on Comment {
  id
  text
  createdAt
  user {
    id
    email
    name
  }
}
    `;
export const ElementWithInfoFragmentDoc = gql`
    fragment elementWithInfo on Element {
  id
  content
  tag
  image {
    id
    path
    caption
  }
  chapter {
    title
    part
    position
    permalink
    commit {
      sha
      branch {
        name
      }
    }
  }
}
    `;
export const NoteFragmentDoc = gql`
    fragment note on Note {
  id
  number
  text
  createdAt
  state
  user {
    __typename
    id
    email
    name
  }
  comments {
    id
    text
    createdAt
    user {
      __typename
      id
      email
      name
    }
  }
}
    `;
export const BookDocument = gql`
    query book($permalink: String!, $gitRef: String) {
  book(permalink: $permalink) {
    ... on PermissionDenied {
      error
    }
    ... on Book {
      title
      permalink
      currentUserAuthor
      latestCommit(gitRef: $gitRef) {
        sha
      }
      commit(gitRef: $gitRef) {
        sha
        createdAt
        branch {
          name
        }
        frontmatter: chapters(part: FRONTMATTER) {
          ...chapterFields
        }
        mainmatter: chapters(part: MAINMATTER) {
          ...chapterFields
        }
        backmatter: chapters(part: BACKMATTER) {
          ...chapterFields
        }
      }
    }
  }
}
    ${ChapterFieldsFragmentDoc}`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      permalink: // value for 'permalink'
 *      gitRef: // value for 'gitRef'
 *   },
 * });
 */
export function useBookQuery(baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, baseOptions);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, baseOptions);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const BranchDocument = gql`
    query branch($bookPermalink: String!, $name: String!) {
  book(permalink: $bookPermalink) {
    ... on Book {
      id
      title
      branch(name: $name) {
        id
        default
        name
        commits {
          sha
          message
          createdAt
        }
      }
    }
  }
}
    `;

/**
 * __useBranchQuery__
 *
 * To run a query within a React component, call `useBranchQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchQuery({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useBranchQuery(baseOptions: Apollo.QueryHookOptions<BranchQuery, BranchQueryVariables>) {
        return Apollo.useQuery<BranchQuery, BranchQueryVariables>(BranchDocument, baseOptions);
      }
export function useBranchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BranchQuery, BranchQueryVariables>) {
          return Apollo.useLazyQuery<BranchQuery, BranchQueryVariables>(BranchDocument, baseOptions);
        }
export type BranchQueryHookResult = ReturnType<typeof useBranchQuery>;
export type BranchLazyQueryHookResult = ReturnType<typeof useBranchLazyQuery>;
export type BranchQueryResult = Apollo.QueryResult<BranchQuery, BranchQueryVariables>;
export const BranchesDocument = gql`
    query branches($bookPermalink: String!) {
  book(permalink: $bookPermalink) {
    ... on Book {
      id
      title
      branches {
        id
        default
        name
      }
    }
  }
}
    `;

/**
 * __useBranchesQuery__
 *
 * To run a query within a React component, call `useBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchesQuery({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *   },
 * });
 */
export function useBranchesQuery(baseOptions: Apollo.QueryHookOptions<BranchesQuery, BranchesQueryVariables>) {
        return Apollo.useQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, baseOptions);
      }
export function useBranchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BranchesQuery, BranchesQueryVariables>) {
          return Apollo.useLazyQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, baseOptions);
        }
export type BranchesQueryHookResult = ReturnType<typeof useBranchesQuery>;
export type BranchesLazyQueryHookResult = ReturnType<typeof useBranchesLazyQuery>;
export type BranchesQueryResult = Apollo.QueryResult<BranchesQuery, BranchesQueryVariables>;
export const ChapterDocument = gql`
    query chapter($bookPermalink: String!, $chapterPermalink: String!, $gitRef: String) {
  book(permalink: $bookPermalink) {
    ... on PermissionDenied {
      error
    }
    ... on Book {
      title
      id
      permalink
      latestCommit(gitRef: $gitRef) {
        sha
      }
      commit(gitRef: $gitRef) {
        id
        sha
        createdAt
        branch {
          name
        }
        chapter(permalink: $chapterPermalink) {
          id
          title
          position
          permalink
          part
          sections {
            ...sectionFragment
            subsections {
              ...sectionFragment
            }
          }
          previousChapter {
            ...chapterFragment
          }
          nextChapter {
            ...chapterFragment
          }
          footnotes {
            identifier
            content
          }
          elements {
            id
            content
            tag
            noteCount
            identifier
            image {
              id
              caption
              path
            }
          }
        }
      }
    }
  }
}
    ${SectionFragmentFragmentDoc}
${ChapterFragmentFragmentDoc}`;

/**
 * __useChapterQuery__
 *
 * To run a query within a React component, call `useChapterQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterQuery({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *      chapterPermalink: // value for 'chapterPermalink'
 *      gitRef: // value for 'gitRef'
 *   },
 * });
 */
export function useChapterQuery(baseOptions: Apollo.QueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
        return Apollo.useQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, baseOptions);
      }
export function useChapterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
          return Apollo.useLazyQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, baseOptions);
        }
export type ChapterQueryHookResult = ReturnType<typeof useChapterQuery>;
export type ChapterLazyQueryHookResult = ReturnType<typeof useChapterLazyQuery>;
export type ChapterQueryResult = Apollo.QueryResult<ChapterQuery, ChapterQueryVariables>;
export const NoteMutationDocument = gql`
    mutation noteMutation($bookPermalink: ID!, $elementId: ID!, $text: String!) {
  submitNote(bookPermalink: $bookPermalink, elementId: $elementId, text: $text) {
    ...note
  }
}
    ${NoteFragmentDoc}`;
export type NoteMutationMutationFn = Apollo.MutationFunction<NoteMutationMutation, NoteMutationMutationVariables>;

/**
 * __useNoteMutationMutation__
 *
 * To run a mutation, you first call `useNoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [noteMutationMutation, { data, loading, error }] = useNoteMutationMutation({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *      elementId: // value for 'elementId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useNoteMutationMutation(baseOptions?: Apollo.MutationHookOptions<NoteMutationMutation, NoteMutationMutationVariables>) {
        return Apollo.useMutation<NoteMutationMutation, NoteMutationMutationVariables>(NoteMutationDocument, baseOptions);
      }
export type NoteMutationMutationHookResult = ReturnType<typeof useNoteMutationMutation>;
export type NoteMutationMutationResult = Apollo.MutationResult<NoteMutationMutation>;
export type NoteMutationMutationOptions = Apollo.BaseMutationOptions<NoteMutationMutation, NoteMutationMutationVariables>;
export const ChapterNotesDocument = gql`
    query chapterNotes($elementId: String!, $bookPermalink: String!) {
  book(permalink: $bookPermalink) {
    ... on Book {
      id
      notes(elementId: $elementId) {
        ...note
      }
    }
  }
}
    ${NoteFragmentDoc}`;

/**
 * __useChapterNotesQuery__
 *
 * To run a query within a React component, call `useChapterNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterNotesQuery({
 *   variables: {
 *      elementId: // value for 'elementId'
 *      bookPermalink: // value for 'bookPermalink'
 *   },
 * });
 */
export function useChapterNotesQuery(baseOptions: Apollo.QueryHookOptions<ChapterNotesQuery, ChapterNotesQueryVariables>) {
        return Apollo.useQuery<ChapterNotesQuery, ChapterNotesQueryVariables>(ChapterNotesDocument, baseOptions);
      }
export function useChapterNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChapterNotesQuery, ChapterNotesQueryVariables>) {
          return Apollo.useLazyQuery<ChapterNotesQuery, ChapterNotesQueryVariables>(ChapterNotesDocument, baseOptions);
        }
export type ChapterNotesQueryHookResult = ReturnType<typeof useChapterNotesQuery>;
export type ChapterNotesLazyQueryHookResult = ReturnType<typeof useChapterNotesLazyQuery>;
export type ChapterNotesQueryResult = Apollo.QueryResult<ChapterNotesQuery, ChapterNotesQueryVariables>;
export const BookIdTitleAndReadersDocument = gql`
    query bookIDTitleAndReaders($permalink: String!) {
  book(permalink: $permalink) {
    ... on PermissionDenied {
      error
    }
    ... on Book {
      id
      title
      readers {
        githubLogin
        name
      }
    }
  }
}
    `;

/**
 * __useBookIdTitleAndReadersQuery__
 *
 * To run a query within a React component, call `useBookIdTitleAndReadersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookIdTitleAndReadersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookIdTitleAndReadersQuery({
 *   variables: {
 *      permalink: // value for 'permalink'
 *   },
 * });
 */
export function useBookIdTitleAndReadersQuery(baseOptions: Apollo.QueryHookOptions<BookIdTitleAndReadersQuery, BookIdTitleAndReadersQueryVariables>) {
        return Apollo.useQuery<BookIdTitleAndReadersQuery, BookIdTitleAndReadersQueryVariables>(BookIdTitleAndReadersDocument, baseOptions);
      }
export function useBookIdTitleAndReadersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookIdTitleAndReadersQuery, BookIdTitleAndReadersQueryVariables>) {
          return Apollo.useLazyQuery<BookIdTitleAndReadersQuery, BookIdTitleAndReadersQueryVariables>(BookIdTitleAndReadersDocument, baseOptions);
        }
export type BookIdTitleAndReadersQueryHookResult = ReturnType<typeof useBookIdTitleAndReadersQuery>;
export type BookIdTitleAndReadersLazyQueryHookResult = ReturnType<typeof useBookIdTitleAndReadersLazyQuery>;
export type BookIdTitleAndReadersQueryResult = Apollo.QueryResult<BookIdTitleAndReadersQuery, BookIdTitleAndReadersQueryVariables>;
export const UsersDocument = gql`
    query users($githubLogin: String!) {
  users(githubLogin: $githubLogin) {
    id
    githubLogin
    name
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      githubLogin: // value for 'githubLogin'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const InviteUserDocument = gql`
    mutation inviteUser($bookId: ID!, $userId: ID!) {
  inviteUser(bookId: $bookId, userId: $userId) {
    bookId
    userId
  }
}
    `;
export type InviteUserMutationFn = Apollo.MutationFunction<InviteUserMutation, InviteUserMutationVariables>;

/**
 * __useInviteUserMutation__
 *
 * To run a mutation, you first call `useInviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserMutation, { data, loading, error }] = useInviteUserMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteUserMutation, InviteUserMutationVariables>) {
        return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument, baseOptions);
      }
export type InviteUserMutationHookResult = ReturnType<typeof useInviteUserMutation>;
export type InviteUserMutationResult = Apollo.MutationResult<InviteUserMutation>;
export type InviteUserMutationOptions = Apollo.BaseMutationOptions<InviteUserMutation, InviteUserMutationVariables>;
export const ReadersDocument = gql`
    query readers($permalink: String!) {
  book(permalink: $permalink) {
    ... on PermissionDenied {
      error
    }
    ... on Book {
      readers {
        id
        author
        githubLogin
        name
      }
    }
  }
}
    `;

/**
 * __useReadersQuery__
 *
 * To run a query within a React component, call `useReadersQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadersQuery({
 *   variables: {
 *      permalink: // value for 'permalink'
 *   },
 * });
 */
export function useReadersQuery(baseOptions: Apollo.QueryHookOptions<ReadersQuery, ReadersQueryVariables>) {
        return Apollo.useQuery<ReadersQuery, ReadersQueryVariables>(ReadersDocument, baseOptions);
      }
export function useReadersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadersQuery, ReadersQueryVariables>) {
          return Apollo.useLazyQuery<ReadersQuery, ReadersQueryVariables>(ReadersDocument, baseOptions);
        }
export type ReadersQueryHookResult = ReturnType<typeof useReadersQuery>;
export type ReadersLazyQueryHookResult = ReturnType<typeof useReadersLazyQuery>;
export type ReadersQueryResult = Apollo.QueryResult<ReadersQuery, ReadersQueryVariables>;
export const CloseNoteMutationDocument = gql`
    mutation closeNoteMutation($id: ID!) {
  closeNote(id: $id) {
    id
    state
  }
}
    `;
export type CloseNoteMutationMutationFn = Apollo.MutationFunction<CloseNoteMutationMutation, CloseNoteMutationMutationVariables>;

/**
 * __useCloseNoteMutationMutation__
 *
 * To run a mutation, you first call `useCloseNoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseNoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeNoteMutationMutation, { data, loading, error }] = useCloseNoteMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCloseNoteMutationMutation(baseOptions?: Apollo.MutationHookOptions<CloseNoteMutationMutation, CloseNoteMutationMutationVariables>) {
        return Apollo.useMutation<CloseNoteMutationMutation, CloseNoteMutationMutationVariables>(CloseNoteMutationDocument, baseOptions);
      }
export type CloseNoteMutationMutationHookResult = ReturnType<typeof useCloseNoteMutationMutation>;
export type CloseNoteMutationMutationResult = Apollo.MutationResult<CloseNoteMutationMutation>;
export type CloseNoteMutationMutationOptions = Apollo.BaseMutationOptions<CloseNoteMutationMutation, CloseNoteMutationMutationVariables>;
export const AddCommentMutationDocument = gql`
    mutation addCommentMutation($noteId: ID!, $text: String!) {
  addComment(noteId: $noteId, text: $text) {
    ...commentFragment
  }
}
    ${CommentFragmentFragmentDoc}`;
export type AddCommentMutationMutationFn = Apollo.MutationFunction<AddCommentMutationMutation, AddCommentMutationMutationVariables>;

/**
 * __useAddCommentMutationMutation__
 *
 * To run a mutation, you first call `useAddCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutationMutation, { data, loading, error }] = useAddCommentMutationMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutationMutation, AddCommentMutationMutationVariables>) {
        return Apollo.useMutation<AddCommentMutationMutation, AddCommentMutationMutationVariables>(AddCommentMutationDocument, baseOptions);
      }
export type AddCommentMutationMutationHookResult = ReturnType<typeof useAddCommentMutationMutation>;
export type AddCommentMutationMutationResult = Apollo.MutationResult<AddCommentMutationMutation>;
export type AddCommentMutationMutationOptions = Apollo.BaseMutationOptions<AddCommentMutationMutation, AddCommentMutationMutationVariables>;
export const CommentsQueryDocument = gql`
    query commentsQuery($noteId: ID!) {
  comments(noteId: $noteId) {
    ...commentFragment
  }
}
    ${CommentFragmentFragmentDoc}`;

/**
 * __useCommentsQueryQuery__
 *
 * To run a query within a React component, call `useCommentsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQueryQuery({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useCommentsQueryQuery(baseOptions: Apollo.QueryHookOptions<CommentsQueryQuery, CommentsQueryQueryVariables>) {
        return Apollo.useQuery<CommentsQueryQuery, CommentsQueryQueryVariables>(CommentsQueryDocument, baseOptions);
      }
export function useCommentsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQueryQuery, CommentsQueryQueryVariables>) {
          return Apollo.useLazyQuery<CommentsQueryQuery, CommentsQueryQueryVariables>(CommentsQueryDocument, baseOptions);
        }
export type CommentsQueryQueryHookResult = ReturnType<typeof useCommentsQueryQuery>;
export type CommentsQueryLazyQueryHookResult = ReturnType<typeof useCommentsQueryLazyQuery>;
export type CommentsQueryQueryResult = Apollo.QueryResult<CommentsQueryQuery, CommentsQueryQueryVariables>;
export const DeleteCommentMutationDocument = gql`
    mutation deleteCommentMutation($id: ID!) {
  deleteComment(id: $id) {
    id
  }
}
    `;
export type DeleteCommentMutationMutationFn = Apollo.MutationFunction<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>;

/**
 * __useDeleteCommentMutationMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutationMutation, { data, loading, error }] = useDeleteCommentMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>(DeleteCommentMutationDocument, baseOptions);
      }
export type DeleteCommentMutationMutationHookResult = ReturnType<typeof useDeleteCommentMutationMutation>;
export type DeleteCommentMutationMutationResult = Apollo.MutationResult<DeleteCommentMutationMutation>;
export type DeleteCommentMutationMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>;
export const UpdateCommentMutationDocument = gql`
    mutation updateCommentMutation($id: ID!, $text: String!) {
  updateComment(id: $id, text: $text) {
    id
    text
  }
}
    `;
export type UpdateCommentMutationMutationFn = Apollo.MutationFunction<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>;

/**
 * __useUpdateCommentMutationMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutationMutation, { data, loading, error }] = useUpdateCommentMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>) {
        return Apollo.useMutation<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>(UpdateCommentMutationDocument, baseOptions);
      }
export type UpdateCommentMutationMutationHookResult = ReturnType<typeof useUpdateCommentMutationMutation>;
export type UpdateCommentMutationMutationResult = Apollo.MutationResult<UpdateCommentMutationMutation>;
export type UpdateCommentMutationMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>;
export const NoteDocument = gql`
    query note($bookPermalink: String!, $number: Int!) {
  note(bookPermalink: $bookPermalink, number: $number) {
    ...note
    element {
      ...elementWithInfo
    }
  }
}
    ${NoteFragmentDoc}
${ElementWithInfoFragmentDoc}`;

/**
 * __useNoteQuery__
 *
 * To run a query within a React component, call `useNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteQuery({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useNoteQuery(baseOptions: Apollo.QueryHookOptions<NoteQuery, NoteQueryVariables>) {
        return Apollo.useQuery<NoteQuery, NoteQueryVariables>(NoteDocument, baseOptions);
      }
export function useNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoteQuery, NoteQueryVariables>) {
          return Apollo.useLazyQuery<NoteQuery, NoteQueryVariables>(NoteDocument, baseOptions);
        }
export type NoteQueryHookResult = ReturnType<typeof useNoteQuery>;
export type NoteLazyQueryHookResult = ReturnType<typeof useNoteLazyQuery>;
export type NoteQueryResult = Apollo.QueryResult<NoteQuery, NoteQueryVariables>;
export const OpenNoteMutationDocument = gql`
    mutation openNoteMutation($id: ID!) {
  openNote(id: $id) {
    id
    state
  }
}
    `;
export type OpenNoteMutationMutationFn = Apollo.MutationFunction<OpenNoteMutationMutation, OpenNoteMutationMutationVariables>;

/**
 * __useOpenNoteMutationMutation__
 *
 * To run a mutation, you first call `useOpenNoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenNoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openNoteMutationMutation, { data, loading, error }] = useOpenNoteMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpenNoteMutationMutation(baseOptions?: Apollo.MutationHookOptions<OpenNoteMutationMutation, OpenNoteMutationMutationVariables>) {
        return Apollo.useMutation<OpenNoteMutationMutation, OpenNoteMutationMutationVariables>(OpenNoteMutationDocument, baseOptions);
      }
export type OpenNoteMutationMutationHookResult = ReturnType<typeof useOpenNoteMutationMutation>;
export type OpenNoteMutationMutationResult = Apollo.MutationResult<OpenNoteMutationMutation>;
export type OpenNoteMutationMutationOptions = Apollo.BaseMutationOptions<OpenNoteMutationMutation, OpenNoteMutationMutationVariables>;
export const UpdateNoteMutationDocument = gql`
    mutation updateNoteMutation($id: ID!, $text: String!) {
  updateNote(id: $id, text: $text) {
    id
    text
    state
  }
}
    `;
export type UpdateNoteMutationMutationFn = Apollo.MutationFunction<UpdateNoteMutationMutation, UpdateNoteMutationMutationVariables>;

/**
 * __useUpdateNoteMutationMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutationMutation, { data, loading, error }] = useUpdateNoteMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateNoteMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoteMutationMutation, UpdateNoteMutationMutationVariables>) {
        return Apollo.useMutation<UpdateNoteMutationMutation, UpdateNoteMutationMutationVariables>(UpdateNoteMutationDocument, baseOptions);
      }
export type UpdateNoteMutationMutationHookResult = ReturnType<typeof useUpdateNoteMutationMutation>;
export type UpdateNoteMutationMutationResult = Apollo.MutationResult<UpdateNoteMutationMutation>;
export type UpdateNoteMutationMutationOptions = Apollo.BaseMutationOptions<UpdateNoteMutationMutation, UpdateNoteMutationMutationVariables>;
export const NoteBookDocument = gql`
    query noteBook($bookPermalink: String!) {
  book(permalink: $bookPermalink) {
    ... on Book {
      id
      permalink
      title
    }
  }
}
    `;

/**
 * __useNoteBookQuery__
 *
 * To run a query within a React component, call `useNoteBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteBookQuery({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *   },
 * });
 */
export function useNoteBookQuery(baseOptions: Apollo.QueryHookOptions<NoteBookQuery, NoteBookQueryVariables>) {
        return Apollo.useQuery<NoteBookQuery, NoteBookQueryVariables>(NoteBookDocument, baseOptions);
      }
export function useNoteBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoteBookQuery, NoteBookQueryVariables>) {
          return Apollo.useLazyQuery<NoteBookQuery, NoteBookQueryVariables>(NoteBookDocument, baseOptions);
        }
export type NoteBookQueryHookResult = ReturnType<typeof useNoteBookQuery>;
export type NoteBookLazyQueryHookResult = ReturnType<typeof useNoteBookLazyQuery>;
export type NoteBookQueryResult = Apollo.QueryResult<NoteBookQuery, NoteBookQueryVariables>;
export const BookNotesDocument = gql`
    query bookNotes($bookPermalink: String!, $state: NoteState!) {
  elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
    ...elementWithInfo
    notes(state: $state) {
      ...note
    }
  }
}
    ${ElementWithInfoFragmentDoc}
${NoteFragmentDoc}`;

/**
 * __useBookNotesQuery__
 *
 * To run a query within a React component, call `useBookNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookNotesQuery({
 *   variables: {
 *      bookPermalink: // value for 'bookPermalink'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useBookNotesQuery(baseOptions: Apollo.QueryHookOptions<BookNotesQuery, BookNotesQueryVariables>) {
        return Apollo.useQuery<BookNotesQuery, BookNotesQueryVariables>(BookNotesDocument, baseOptions);
      }
export function useBookNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookNotesQuery, BookNotesQueryVariables>) {
          return Apollo.useLazyQuery<BookNotesQuery, BookNotesQueryVariables>(BookNotesDocument, baseOptions);
        }
export type BookNotesQueryHookResult = ReturnType<typeof useBookNotesQuery>;
export type BookNotesLazyQueryHookResult = ReturnType<typeof useBookNotesLazyQuery>;
export type BookNotesQueryResult = Apollo.QueryResult<BookNotesQuery, BookNotesQueryVariables>;
export const BooksDocument = gql`
    query Books {
  books {
    id
    title
    permalink
    blurb
  }
}
    `;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBooksQuery(baseOptions?: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, baseOptions);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, baseOptions);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    __typename
    id
    githubLogin
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginMutationDocument = gql`
    mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on SuccessfulLoginResult {
      email
      token
    }
    ... on FailedLoginResult {
      error
    }
  }
}
    `;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;

/**
 * __useLoginMutationMutation__
 *
 * To run a mutation, you first call `useLoginMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutationMutation, { data, loading, error }] = useLoginMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutationMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutationMutation, LoginMutationMutationVariables>) {
        return Apollo.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument, baseOptions);
      }
export type LoginMutationMutationHookResult = ReturnType<typeof useLoginMutationMutation>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;