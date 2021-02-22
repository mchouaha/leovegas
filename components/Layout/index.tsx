import React, { Fragment, ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Search from '../Search'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title}: Props) => (
  <Fragment>
    <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <NavContainer>
        <LinkContainer>
          <Link href="/">
            <a> Home </a>
          </Link>
        </LinkContainer> 
        <SearchContainer>
          <Search/>
        </SearchContainer>
      </NavContainer>
    </header>
      {children}
      </Container>
  </Fragment>
)

const Container = styled.div`    
  background-color: #F7F7F7;
`

const NavContainer = styled.nav`    
  display: flex;
  flex-direction: row;
  background-color: #F57A2D;
  padding: 10px
`

const SearchContainer = styled.div`    
  flex-grow: 1;
  text-align: right;
`

const LinkContainer = styled.div`    
  flex-grow: 1;

  a {
    font-weight: bold;
    text-decoration: none;
    color: white;
  }

  a: hover {
    text-decoration: underline;
  }
`

export default Layout
