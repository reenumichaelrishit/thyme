import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { UserCircle, Plus} from "@phosphor-icons/react";

const Wrapper = styled.div `
  height: 10vh;
  position: sticky;
  top: 0;
`;

const NavBar = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.theme.background.navbar.default};
  padding: 1vh 4vw;
`;

const RightNav = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 4vw;

  * {
    // height: 100%;
    font-size: 2em;
  }
`;

const HomeButton = styled(Link) `
  font-family: ${p => p.theme.fontFamily.logo};
  color: ${p => p.theme.color.accent.default};
  border-radius: 20%;
  font-size: 2.5em;
  letter-spacing: -4px;

  &:active {color: ${p => p.theme.color.accent.hover};};
`;

const AddPostButton = styled(Link) `
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1vh;

  padding: 1.5vh 1vw;

  font-family: ${p => p.theme.fontFamily.content};
  border-radius: 15px;

  color: ${p => p.theme.color.accent.default};
  border: 2.5px solid ${p => p.theme.color.accent.default};

  span {
    font-size: 0.625em;
    font-weight: 500;
  }

  &:active {
    border-color: ${p => p.theme.color.accent.hover};
    color: ${p => p.theme.color.accent.hover};
  };
`;

const ProfileButton = styled(Link) `
  display: flex;
  font-family: ${p => p.theme.fontFamily.content};

  color: ${p => p.theme.color.accent.default};
  &:active {color: ${p => p.theme.color.accent.hover};};

  border-radius: 100%;
`;

const Nav = () => (
//   <nav>
    <Wrapper>
      <NavBar>
        <HomeButton to="/">thyme</HomeButton>
        <RightNav>
          <AddPostButton to="/about">
            <Plus size={20} />
            <span>Create Post</span>
          </AddPostButton>
          <ProfileButton to="#"><UserCircle size={64} /></ProfileButton>
        </RightNav>
      </NavBar>
    </Wrapper>
//   </nav>
)

export default Nav

{/* <NavBar>
      <HomeLogo><Link to="/">HomePage</Link></HomeLogo>
      <AddPost><Link to="/about">+</Link></AddPost>
      <Profile><Link to="#">Profile</Link></Profile>
      </NavBar> */}