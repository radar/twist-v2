export default (permalink: string, ref: string) => {
  let link;
  if (ref) {
    link = `/books/${permalink}/tree/${ref}`;
  } else {
    link = `/books/${permalink}`;
  }
  return link;
};
