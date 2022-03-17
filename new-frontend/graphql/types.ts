import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  __typename?: 'Book';
  blurb: Scalars['String'];
  branch: Branch;
  branches: Array<Branch>;
  commit: Commit;
  currentUserAuthor: Scalars['Boolean'];
  defaultBranch: Branch;
  id: Scalars['ID'];
  latestCommit: Commit;
  notes: Array<Note>;
  permalink: Scalars['String'];
  readers: Array<Reader>;
  title: Scalars['String'];
};


/** A book */
export type BookBranchArgs = {
  name: Scalars['String'];
};


/** A book */
export type BookCommitArgs = {
  gitRef?: InputMaybe<Scalars['String']>;
};


/** A book */
export type BookLatestCommitArgs = {
  gitRef?: InputMaybe<Scalars['String']>;
};


/** A book */
export type BookNotesArgs = {
  elementId: Scalars['String'];
};

/** Parts of the book */
export enum BookParts {
  /** The back of the book, appendixes, etc. */
  Backmatter = 'BACKMATTER',
  /** The front of the book, introductions, prefaces, etc. */
  Frontmatter = 'FRONTMATTER',
  /** The main content of the book */
  Mainmatter = 'MAINMATTER'
}

/** The result from attempting a login */
export type BookPermissionCheckResult = Book | PermissionDenied;

/** A branch */
export type Branch = {
  __typename?: 'Branch';
  chapter: Chapter;
  chapters: Array<Chapter>;
  commits: Array<Commit>;
  default: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
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
  __typename?: 'Chapter';
  commit: Commit;
  elements: Array<Element>;
  footnotes: Array<Footnote>;
  id: Scalars['ID'];
  nextChapter?: Maybe<Chapter>;
  part: Scalars['String'];
  permalink: Scalars['String'];
  position: Scalars['Int'];
  previousChapter?: Maybe<Chapter>;
  sections: Array<Section>;
  title: Scalars['String'];
};

/** A comment */
export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

/** A commit */
export type Commit = {
  __typename?: 'Commit';
  branch: Branch;
  chapter: Chapter;
  chapters: Array<Chapter>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  sha: Scalars['String'];
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
  __typename?: 'Element';
  chapter: Chapter;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  noteCount: Scalars['Int'];
  notes: Array<Note>;
  tag: Scalars['String'];
};


/** An element */
export type ElementNotesArgs = {
  state: NoteState;
};

export type FailedLoginResult = {
  __typename?: 'FailedLoginResult';
  error: Scalars['String'];
};

export type Footnote = {
  __typename?: 'Footnote';
  content: Scalars['String'];
  identifier: Scalars['String'];
  number: Scalars['Int'];
};

/** An image */
export type Image = {
  __typename?: 'Image';
  caption?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  path: Scalars['String'];
};

/** Autogenerated return type of Invite */
export type InvitePayload = {
  __typename?: 'InvitePayload';
  bookId?: Maybe<Scalars['ID']>;
  error?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

/** The result from attempting a login */
export type LoginResult = FailedLoginResult | SuccessfulLoginResult;

export type Mutations = {
  __typename?: 'Mutations';
  addComment: Comment;
  closeNote: Note;
  deleteComment: Comment;
  inviteUser: InvitePayload;
  /** Attempt a login */
  login: LoginResult;
  openNote: Note;
  removeReader: RemovePayload;
  submitNote: Note;
  updateBranch: Branch;
  updateComment: Comment;
  updateNote: Note;
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


export type MutationsRemoveReaderArgs = {
  bookId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationsSubmitNoteArgs = {
  bookPermalink: Scalars['ID'];
  elementId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationsUpdateBranchArgs = {
  bookPermalink: Scalars['String'];
  branchName: Scalars['String'];
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
  __typename?: 'Note';
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  element: Element;
  id: Scalars['ID'];
  number: Scalars['Int'];
  state: Scalars['String'];
  text: Scalars['String'];
  user: User;
};

export enum NoteState {
  /** Closed notes */
  Closed = 'CLOSED',
  /** Open notes */
  Open = 'OPEN'
}

export type PermissionDenied = {
  __typename?: 'PermissionDenied';
  error: Scalars['String'];
};

/** The query root of this schema */
export type Query = {
  __typename?: 'Query';
  book: BookPermissionCheckResult;
  books: Array<Book>;
  comments: Array<Comment>;
  currentUser?: Maybe<User>;
  elementsWithNotes: Array<Element>;
  note: Note;
  users: Array<User>;
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
  __typename?: 'Reader';
  author: Scalars['Boolean'];
  email: Scalars['String'];
  githubLogin?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated return type of Remove */
export type RemovePayload = {
  __typename?: 'RemovePayload';
  bookId?: Maybe<Scalars['ID']>;
  error?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

/** A section */
export type Section = {
  __typename?: 'Section';
  id: Scalars['ID'];
  link: Scalars['String'];
  subsections: Array<Section>;
  title: Scalars['String'];
};

export type SuccessfulLoginResult = {
  __typename?: 'SuccessfulLoginResult';
  email: Scalars['String'];
  token: Scalars['String'];
};

/** A user */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  githubLogin?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type BookQueryVariables = Exact<{
  permalink: Scalars['String'];
  gitRef?: InputMaybe<Scalars['String']>;
}>;


export type BookQuery = { __typename?: 'Query', result: { __typename?: 'Book', title: string, permalink: string, currentUserAuthor: boolean, latestCommit: { __typename?: 'Commit', sha: string }, commit: { __typename?: 'Commit', sha: string, createdAt: string, branch: { __typename?: 'Branch', name: string }, frontmatter: Array<{ __typename?: 'Chapter', id: string, title: string, position: number, permalink: string }>, mainmatter: Array<{ __typename?: 'Chapter', id: string, title: string, position: number, permalink: string }>, backmatter: Array<{ __typename?: 'Chapter', id: string, title: string, position: number, permalink: string }> } } | { __typename?: 'PermissionDenied', error: string } };

export type ChapterFieldsFragment = { __typename?: 'Chapter', id: string, title: string, position: number, permalink: string };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: string, title: string, permalink: string, blurb: string }> };

export const ChapterFieldsFragmentDoc = gql`
    fragment chapterFields on Chapter {
  id
  title
  position
  permalink
}
    `;
export const BookDocument = gql`
    query book($permalink: String!, $gitRef: String) {
  result: book(permalink: $permalink) {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;