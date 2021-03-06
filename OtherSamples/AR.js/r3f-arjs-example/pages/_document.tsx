import Document, { Html, Head, Main, NextScript } from 'next/document'

class ExtDocument extends Document {

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExtDocument
