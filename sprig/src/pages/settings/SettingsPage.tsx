import styled from "styled-components"
import {Link} from 'react-router-dom'
import {UserCircle} from "@phosphor-icons/react";

const Grids = styled.div`
    min-height: 90vh;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: 0.5fr 1fr 1fr 1fr;
    // & .link {
    //     color:${p => p.theme.color.accent.default};
    //     &:visited {
    //         color:${p => p.theme.color.accent.default};
    //     }
    // }
`

const Header = styled.div`
    grid-column: 1 / 5;
    grid-row: 1;
    justify-self: center;
    align-self: center;
`

const Name = styled.div`
    grid-column: 2;
    grid-row: 2;
    justify-self: center;
    align-self: center;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;
    line-height: 4.5vh
`
const Email = styled.div`
    grid-column: 2;
    grid-row: 3;
    justify-self: center;
    align-self: center;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;
    line-height: 4.5vh
`

const Password = styled.div`
    grid-column: 2;
    grid-row: 4;
    justify-self: center;
    align-self: center;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;
    line-height: 4.5vh
`

const Profile = styled.div`
    grid-column: 3;
    grid-row: 2 / 5;
    justify-self: center;
    align-self: center;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;
`

interface SettingsProps {
    userName?: string
}

const Settings = ({userName}: SettingsProps) => (
    <Grids>
        <Header>
            <h1>
                Settings Page
            </h1>
        </Header>
        <Name>
            <h3>
                Username
            </h3>
            <h2>
                {userName}
            </h2>
            <Link to="home" className="link">
                change username
            </Link>
        </Name>
        <Email>
            <h3>
                Email
            </h3>
            <h2>
                sample@email.com
            </h2>
            <Link to="home" className="link">
                change email
            </Link>
        </Email>
        <Password>
            <h2>
                Password
            </h2>
            {/* <Link to="home" className="link">
                forgot password
            </Link> */}
            <Link to="home" className="link">
                reset password
            </Link>
        </Password>
        <Profile>
            <h2>Profile Picture</h2>
            <UserCircle size={256}/>
            <Link to="home" className="link">
                change picture
            </Link>
        </Profile>
    </Grids>
)

export default Settings