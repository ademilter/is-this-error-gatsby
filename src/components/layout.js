import React from 'react'
import Navigation from './navigation'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../utils/globalStyle'
import theme from '../utils/theme'

class Layout extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Navigation />
          <main>{this.props.children}</main>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
