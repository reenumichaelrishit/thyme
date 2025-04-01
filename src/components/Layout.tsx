import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

const GlobalStyleContainer = styled.div`
    min-height: 100vh;
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    font-weight: ${p => p.theme.weight.regular};
    font-family: ${p => p.theme.fontFamily.content};
`

const Layout = () => (
    <GlobalStyleContainer>
        <Nav />
        <Outlet />
    </GlobalStyleContainer>
)

export default Layout