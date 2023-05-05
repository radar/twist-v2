import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Source+Code+Pro:200,300,400,500,600,700|Inter:400,700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/styles/night-owl.min.css"
          ></link>

          <script
            async
            src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
          ></script>
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
        <script type="text/javascript">hljs.highlightAll();</script>
      </Html>
    );
  }
}

export default MyDocument;
