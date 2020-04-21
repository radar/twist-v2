import React from "react";
import { Chapter, ChapterProps } from "../../Book/Chapter";
import Layout from "../../layout";
import "../../styles.css";

export default {
  title: "Chapter",
  component: Chapter,
};

export const ChapterShow = () => {
  const chapter: ChapterProps = {
    bookTitle: "Markdown Book Test",
    bookPermalink: "markdown-book-test",
    title: "Introduction",
    part: "frontmatter",
    position: 1,
    commit: {
      sha: "abc123",
    },
    footnotes: [],
    elements: [
      {
        id: "1",
        bookPermalink: "markdown-book-test",
        identifier: "1",
        content: "<h1>In the beginning</h1>",
        tag: "h1",
        noteCount: 0,
      },
      {
        id: "2",
        bookPermalink: "markdown-book-test",
        identifier: "2",
        content:
          '<div class="admonitionblock note">\n              <div class="title">Template inheritance</div>\n<div class="paragraph">\n<p>Notice how in the previous error message, three different templates are\nlisted: <code>admin/users/show</code>, <code>admin/application/show</code>, and <code>application/show</code>. Rails\nis attempting to look for these three templates in exactly that order, but\ncan’t find any of them.</p>\n</div>\n<div class="paragraph">\n<p>Why this happens was explained earlier, but it’s good to reinforce. The reason\nis that <code>Admin::UsersController</code> inherits from <code>Admin::ApplicationController</code> and\ntherefore inherits its templates in <code>app/views/admin/application</code> as well.\n<code>Admin::ApplicationController</code> inherits from <code>ApplicationController</code>, and so by\ninheritance both <code>Admin::ApplicationController</code> and <code>Admin::UsersController</code> also\nhave the templates from in the (imaginary) <code>app/views/application</code> directory.</p>\n</div>\n<div class="paragraph">\n<p>An example of where this might be useful is rendering different partials\ndepending on the namespace. If for example you had something like the following\nin <code>app/views/layout/application.html.erb</code>:</p>\n</div>\n<div class="listingblock">\n<div class="content">\n<pre class="highlight"><code class="language-ruby" data-lang="ruby">render "sidebar"</code></pre>\n</div>\n</div>\n<div class="paragraph">\n<p>This could render different partials. In the base root namespace, it could\nrender <code>app/views/sidebar.html.erb</code>, but in the admin namespace you could\noverride that partial, by creating a file named <code>app/views/admin/sidebar.html.erb</code>.\nThis lets you have different context-aware content, without changing your code.</p>\n</div>\n            </div>',
        tag: "p",
        noteCount: 0,
      },
      {
        id: "3",
        bookPermalink: "markdown-book-test",
        identifier: "3",
        content: "<h2>This is a new section</h2>",
        tag: "h2",
        noteCount: 0,
      },
      {
        id: "4",
        bookPermalink: "markdown-book-test",
        identifier: "4",
        content: "<p>And here's some text for that section.</p>",
        tag: "p",
        noteCount: 0,
      },
    ],
    sections: [
      {
        id: "1",
        link: "#in-the-beginning",
        title: "In the beginning",
        subsections: [
          {
            id: "2",
            link: "#this-is-a-new-section",
            title: "This is a new section",
          },
        ],
      },
    ],
    nextChapter: null,
    previousChapter: null,
    commitSHA: "abc123",
    branchName: "master",
  };
  return (
    <Layout>
      <Chapter {...chapter} />
    </Layout>
  );
};
