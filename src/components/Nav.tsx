import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { UserCircle, Plus} from "@phosphor-icons/react";

const Wrapper = styled.div `
  position: sticky;
  top: 0;
`;

const NavBar = styled.ul `
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  background-color: ${p => p.theme.color.black.default};
  padding: 1vh 4vw;
`;

const LeftNav = styled.ul `
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  list-style-type: none;
`;

const RightNav = styled.ul `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  list-style-type: none;
  gap: 4vw;

  * {
    // height: 100%;
    font-size: 2em;
  }
`;

const HomeButton = styled(Link) `
  font-family: ${p => p.theme.font.logo};
  color: ${p => p.theme.color.black.default};
  &:active{color: ${p => p.theme.color.black.default}};
  background-color: ${p => p.theme.color.green.default};
  border-radius: 20%;
  font-size: 2em;
  padding: 0.5em;
`;

const AddPostButton = styled(Link) `
  display: flex;
  font-family: ${p => p.theme.font.content};
  color: ${p => p.theme.color.black.default};
  &:active{color: ${p => p.theme.color.black.default}};
  background-color: ${p => p.theme.color.green.default};
  border-radius: 100%;
`;

const ProfileButton = styled(Link) `
  display: flex;
  font-family: ${p => p.theme.font.content};
  color: ${p => p.theme.color.black.default};
  &:active{color: ${p => p.theme.color.black.default}};
  background-color: ${p => p.theme.color.green.default};
  border-radius: 100%;
`;

const Nav = () => (
  <nav>
    <Wrapper>
      <NavBar>
        <LeftNav>
          <HomeButton to="/">thyme</HomeButton>
        </LeftNav>
        <RightNav>
          <AddPostButton to="/about"><Plus size={64} /></AddPostButton>
          <ProfileButton to="#"><UserCircle size={64} /></ProfileButton>
        </RightNav>
      </NavBar>
      <hr></hr>
    </Wrapper>
  </nav>
)

export default Nav

{/* <NavBar>
      <HomeLogo><Link to="/">HomePage</Link></HomeLogo>
      <AddPost><Link to="/about">+</Link></AddPost>
      <Profile><Link to="#">Profile</Link></Profile>
      </NavBar> */}