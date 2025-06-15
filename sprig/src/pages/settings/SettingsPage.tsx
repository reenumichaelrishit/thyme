import styled from "styled-components"
// import {Link} from 'react-router-dom'
import {MouseEventHandler, useEffect, useState} from "react";
import Modal from "../../components/Modal.tsx";
import {Input} from "../../components/Input.tsx";
import {sendPostRequest} from "../../fetches/sendPostRequest.tsx";
import {useAuth} from "../../AuthContext.ts";
import {sendGetRequest} from "../../fetches/sendGetRequest.tsx";

// import {FormEvent, useState} from "react";
// import {
//     CreatePostButton, FormContainer,
//     FormSection,
//     NutritionFacts,
//     Subheading,
//     Subsection,
//     Subsubheading
// } from "../create-post/styled.components.tsx";
// import {FileInput, Input, Textarea} from "../../components/Input.tsx";
// import IngredientList from "../create-post/IngredientList.tsx";
// import DirectionList from "../create-post/DirectionList.tsx";
// import ChipHandler from "../create-post/ChipHandler.tsx";
// import Alert from "../../components/Alert.tsx";

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
    img {
        aspect-ratio: 1 / 1;
        height: 25vh;
    }
`

const Settings = () => {
    const closeSearchRes : MouseEventHandler = (e) => { if (e.target === e.currentTarget) setSearchRes(0) }
    // const openUsernameModal = () => { setSearchRes(1) }
    const openEmailModal = () => { setSearchRes(2) }
    const openBioModal = () => { setSearchRes(3) }
    const openProfilePictureModal = () => { setSearchRes(4) }
    const [searchRes, setSearchRes] = useState(0)
    const [userData, setUserData] = useState<
        {
            username: string,
            email: string,
            profilePhoto: string,
            bio: string
        }
    >({
        username: "",
        email: "",
        profilePhoto: "",
        bio: ""
    })
    const {username} = useAuth();
    useEffect(()=>{
        const fetchData = async () => {
            const res = await sendGetRequest(`/api/profile/${username}`)

            if(res.error) {
                console.error("Cannot fetch user data useEffect.",username, res)
            }
            else {
                setUserData(res)
            }
        }

        fetchData()
    }, []);
    // const submitUsername = async () => {
    //     const userNameData = {
    //         oldUsername: username,
    //         newUsername: userData.username
    //     }
    //     const res = await sendPostRequest("/api/settings/username", userNameData)
    //
    //     if (res.error) {
    //         console.error("could not submit username!")
    //     } else {
    //         console.log("changed username")
    //     }
    // }
    const submitEmail = async () => {
        const emailData = {
            username: username,
            newEmail: userData.email
        }

        const res = await sendPostRequest("/api/settings/email", emailData)

        if (res.error) {
            console.error("could not submit email!")
        } else {
            console.log("changed email")
        }
    }
    const submitBio = async () => {
        const bioData = {
            username: username,
            newBio: userData.bio
        }

        const res = await sendPostRequest("/api/settings/bio", bioData)

        if (res.error) {
            console.error("could not submit bio!")
        } else {
            console.log("changed bio")
        }
    }
    const submitPfp = async () => {
        const pictureData = {
            username: username,
            newPfp: userData.profilePhoto
        }

        const res = await sendPostRequest("/api/settings/pfp", pictureData)

        if (res.error) {
            console.error("could not submit profilePhoto!")
        } else {
            console.log("changed profilePhoto")
        }
    }

        return (
            <>
            {/*<Modal heading={"Change Username"} show={searchRes===1} turnOff={closeSearchRes} >*/}
            {/*    <Input type={"text"} label={"New Username"} value={userData.username} onChange={*/}
            {/*        (e) => {*/}
            {/*            setUserData({*/}
            {/*                username: e.target.value,*/}
            {/*                email: userData.email,*/}
            {/*                profilePhoto: userData.profilePhoto,*/}
            {/*                bio: userData.bio*/}
            {/*            })*/}
            {/*        }*/}
            {/*    } />*/}
            {/*    <button type={"button"} onClick={submitUsername}>submit</button>*/}
            {/*</Modal>*/}
            <Modal heading={"Change Email"} show={searchRes===2} turnOff={closeSearchRes} >
                <Input type={"text"} label={"New Email"} value={userData.email} onChange={
                    (e) => {
                        setUserData({
                            username: userData.username,
                            email: e.target.value,
                            profilePhoto: userData.profilePhoto,
                            bio: userData.bio
                        })
                    }
                } />
                <button type={"button"} onClick={submitEmail}>submit</button>
            </Modal>
            <Modal heading={"Change Bio"} show={searchRes===3} turnOff={closeSearchRes} >
                <Input type={"text"} label={"New Bio"} value={userData.bio} onChange={
                    (e) => {
                        setUserData({
                            username: userData.username,
                            email: userData.email,
                            profilePhoto: userData.profilePhoto,
                            bio: e.target.value
                        })
                    }
                } />
                <button type={"button"} onClick={submitBio}>submit</button>
            </Modal>
                <Modal heading={"Change Profile Picture"} show={searchRes===4} turnOff={closeSearchRes} >
                    <Input type={"text"} label={"Profile Picture Link"} onChange={
                        (e) => {
                            setUserData({
                                username: userData.username,
                                email: userData.email,
                                profilePhoto: e.target.value,
                                bio: userData.bio
                            })
                        }
                    } />
                    <button type={"button"} onClick={submitPfp}>submit</button>
                </Modal>
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
                        {username}
                    </h2>
                    {/*<Link to="home" className="link">*/}
                    {/*    change username*/}
                    {/*</Link>*/}
                    {/*<button*/}
                    {/*    style={{border: "none", background: "none"}}*/}
                    {/*    type="button"*/}
                    {/*    onClick={openUsernameModal}>*/}
                    {/*    <p style={{fontSize: "1em"}}>*/}
                    {/*        <u>change username</u>*/}
                    {/*    </p>*/}
                    {/*</button>*/}
                </Name>
                <Email>
                    <h3>
                        Email
                    </h3>
                    <h2>
                        {userData.email}
                    </h2>
                    <button
                        style={{border: "none", background: "none"}}
                        type="button"
                        onClick={openEmailModal}>
                        <p style={{fontSize: "1em"}}>
                            <u>change username</u>
                        </p>
                    </button>
                </Email>
                <Password>
                    <h2>
                        Bio
                    </h2>
                    {/* <Link to="home" className="link">
                forgot password
            </Link> */}
                    <button
                        style={{border: "none", background: "none"}}
                        type="button"
                        onClick={openBioModal}>
                        <p style={{fontSize: "1em"}}>
                            <u>change bio</u>
                        </p>
                    </button>
                </Password>
                <Profile>
                    <h2>Profile Picture</h2>
                    <img src={userData.profilePhoto} alt={"profile photo"}/>
                    <button
                        style={{border: "none", background: "none"}}
                        type="button"
                        onClick={openProfilePictureModal}>
                        <p style={{fontSize: "1em"}}>
                            <u>change picture</u>
                        </p>
                    </button>
                </Profile>
            </Grids>
            </>
        )
    }

export default Settings