import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { UserCircle, NotePencil, Sun, Moon } from "@phosphor-icons/react";
import SearchBar from './SearchBar';
import { useState } from 'react';
import Menu from './Menu';
import Toggle from './Toggle';

const Wrapper = styled.div `
  height: 10vh;
  position: sticky;
  top: 0;
  z-index: 3;
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
`;

const HomeButton = styled(Link) `
  font-family: ${p => p.theme.fontFamily.logo};
  color: ${p => p.theme.color.accent.default};
  border-radius: 20%;
  font-size: 2.5em;
  letter-spacing: -4px;
  transition: color ${p => p.theme.transition.default};

  &:hover {color: ${p => p.theme.color.accent.hover};};
`;

const AddPostButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5vw;

  padding: 1.5vh 1vw;
  border: none;
  border-radius: 15px;

  font-family: ${p => p.theme.fontFamily.heading};
  font-size: 1.125em;
  font-weight: ${p => p.theme.weight.medium};

  cursor: pointer;
  color: ${p => p.theme.color.heading.default};
  background-color: ${p => p.theme.background.accent.default};
  transition: all ${p => p.theme.transition.default};
  
  &:hover {
    background-color: ${p => p.theme.background.accent.hover};
  }
`;

const ProfileButton = styled(Link) `
  display: flex;
  font-family: ${p => p.theme.fontFamily.content};

  color: ${p => p.theme.color.accent.default};
  &:active {color: ${p => p.theme.color.accent.hover};};

  border-radius: 100%;
`;

const Nav = () => {
    const [viewProfileMenu, setViewProfileMenu] = useState(false)
    const openProfileMenu = () => setViewProfileMenu(true)
    const closeProfileMenu = () => setViewProfileMenu(false)

    return (
        <Wrapper>
        <NavBar>
            <HomeButton to="/">thyme</HomeButton>
            <RightNav>
                <SearchBar />
                <Link to={"/create"}>
                    <AddPostButton type="button">
                        <NotePencil size={16} weight={"bold"} />
                        <span>Create Post</span>
                    </AddPostButton>
                </Link>
                <ProfileButton to="#" onMouseEnter={openProfileMenu} onMouseLeave={closeProfileMenu}>
                    <UserCircle size={64} />
                </ProfileButton>

                <Menu view={viewProfileMenu} items={[
                    [<Toggle
                        leftSlot={<Sun size={24} />}
                        rightSlot={<Moon size={24} />}
                    />, ""],
                    ["Profile", "/profile"],
                    ["Settings", "/settings"]
                ]}/>
            </RightNav>
        </NavBar>
        </Wrapper>
    )
}

export default Nav