import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { NotePencil, Sun, Moon, SignIn } from "@phosphor-icons/react";
import SearchBar from './SearchBar';
import { useState } from 'react';
import Menu from './Menu';
import Toggle from './Toggle';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const Wrapper = styled.div `
  height: 10vh;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const NavBar = styled.div `
  height: 100%;
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
  column-gap: 2vw;

  * {
    max-height: 7.5vh;
  }
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

const ProfileButton = styled.div`
    max-height: 9vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px;
    border: 2.5px solid ${p => p.theme.color.accent.default};
    margin: 0 auto;
    cursor: pointer;
    background-color: ${p => p.theme.background.navbar.default};
    transition: all ${p => p.theme.transition.default};

    &, img {
        border-radius: 50%;
    }

    img {
        aspect-ratio: 1 / 1;
        height: 100%;
    }

    &:hover {
        border-color: ${p => p.theme.color.accent.hover};
        background-color: ${p => p.theme.background.navbar.hover};
    }
`;

const Nav = () => {
    const navigate = useNavigate()
    const { isDarkMode, toggleTheme } = useTheme()
    const { authToken, profilePhoto } = useAuth()

    const [viewProfileMenu, setViewProfileMenu] = useState(false)
    const openProfileMenu = () => setViewProfileMenu(true)
    const closeProfileMenu = () => setTimeout(() => setViewProfileMenu(false), 250)

    return (
        <Wrapper>
        <NavBar>
            <HomeButton to="/">thyme</HomeButton>
            <RightNav>
                <SearchBar />
                {authToken ?
                    <AddPostButton type="button" onClick={() => navigate("/create")}>
                        <NotePencil size={16} weight={"bold"} />
                        <span>Create Post</span>
                    </AddPostButton> :
                    <></>}
                {authToken ?
                    <ProfileButton onMouseEnter={openProfileMenu} onMouseLeave={closeProfileMenu}>
                        <img src={profilePhoto} alt="profile photo" />
                    </ProfileButton> :
                    <AddPostButton type="button" onClick={() => navigate("/login")}>
                        <SignIn size={16} weight={"bold"} />
                        <span>Log In</span>
                    </AddPostButton>
                }
                <Menu view={viewProfileMenu} top="11vh" right="4vw" items={[
                    [<Toggle
                        toggled={isDarkMode}
                        toggle={toggleTheme}
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