import Document, { Html, Head, Main, NextScript } from 'next/document'

class ExtDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
        <link rel="stylesheet" href="/leaflet.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExtDocument
