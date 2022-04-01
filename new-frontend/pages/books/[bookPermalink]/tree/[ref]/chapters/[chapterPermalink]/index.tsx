import QueryWrapper from "components/QueryWrapper";
import PermissionDenied from "components/PermissionDenied";
import { useRouter } from "next/router";
import Chapter from "components/chapter/Chapter";
import { ChapterQuery, useChapterQuery } from "graphql/types";

const WrappedChapter = () => {
  const router = useRouter();
  const { bookPermalink, chapterPermalink, ref } = router.query;

  const { data, loading, error } = useChapterQuery({
    variables: {
      bookPermalink: bookPermalink as string,
      chapterPermalink: chapterPermalink as string,
      gitRef: ref as string,
    },
  });

  const renderChapter = (data: ChapterQuery) => {
    const { book } = data;

    if (book.__typename === "PermissionDenied") {
      return <PermissionDenied />;
    }

    return (
      <Chapter
        {...book.commit}
        bookTitle={book.title}
        bookPermalink={bookPermalink as string}
        latestCommit={book.latestCommit}
      />
    );
  };

  return (
    <QueryWrapper loading={loading} error={error}>
      {data && renderChapter(data)}
    </QueryWrapper>
  );
};

export default WrappedChapter;

WrappedChapter.auth = true;
