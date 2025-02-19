import Nav from './Nav'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <div>
    <Nav />
    <Outlet />
  </div>
)

export default Layout