import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

function Header() {
  const menu = [
    { name: 'Home', href: '/' }
  ]
  return (
    <Nav>
      {menu.map(item => (
        <NavItem key={item.href} to={item.href} activeClassName="current">
          {item.name}
        </NavItem>
      ))}
    </Nav>
  )
}

const Nav = styled.nav`
  z-index: 10;
  position: fixed;
  right: 50px;
  top: 50px;
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: ${p => p.theme.font.weight.light};
`

const NavItem = styled(Link)`
  color: ${p => p.theme.color.old};
  &:hover {
    color: ${p => p.theme.color.white};
  }
  &.current {
    color: ${p => p.theme.color.white};
    font-size: 60px;
  }
`

export default Header
