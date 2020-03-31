export default (permalink: string, sha: string) => {
  let link;
  if (sha) {
    link = `/books/${permalink}/commits/${sha}`;
  } else {
    link = `/books/${permalink}`;
  }
  return link;
};
