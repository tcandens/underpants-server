import React from 'react'
import App, {Container} from 'next/app'
import 'tachyons/css/tachyons.css'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx)
    }

    return {pageProps}
  }


  render() {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}