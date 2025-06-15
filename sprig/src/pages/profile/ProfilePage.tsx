import styled from "styled-components"
import PhotoWindow from "../../components/PhotoWindow";
import { MouseEventHandler, ReactNode, useEffect, useRef, useState} from "react"
import Scrollbars from "react-custom-scrollbars-2"
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react"
import ScrollContainer from "../../components/ScrollContainer";
import Modal from "../../components/Modal";
// import {useAuth} from "../../AuthContext.ts";
import {sendGetRequest} from "../../fetches/sendGetRequest.tsx";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../AuthContext.ts";
const FriendsGrid = styled.div `
    display: grid;
    grid-template-columns:1fr 1fr;
    width:100%;
`
const Grids = styled.div<{ $ownProfile?: boolean }>
`
    min-height: ${props => props.$ownProfile ? "90vh" : "50vh"};
    display: grid;
    margin: 5vh 5vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: ${props => props.$ownProfile ? "1fr 1fr 1fr": "1fr 1fr"};
`;

const HorizontalScrollContainer = (props: { height: string, scrollOffset: number, children: ReactNode }) => {
    const scrollRef = useRef<Scrollbars>(null)

    const getScrollWidth = () => (scrollRef.current?.getScrollLeft())
    const scrollToLeft = () => scrollRef.current?.scrollLeft(getScrollWidth()! - props.scrollOffset)
    const scrollToRight = () => scrollRef.current?.scrollLeft(getScrollWidth()! + props.scrollOffset)

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <CaretCircleLeft size={48} onClick={scrollToLeft} />
            <Scrollbars
                style={{ width: "100%", height: props.height }}
                ref={scrollRef}
                renderThumbVertical={() => <div style={{ display: "none" }} />}
                renderThumbHorizontal={() => <div style={{ display: "none" }} />}
            >
                <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center" }}>
                    {props.children}
                </div>
            </Scrollbars>
            <CaretCircleRight size={48} onClick={scrollToRight} />
        </div>
    )
}

const TestDiv = styled.div `
    display: inline-block;
    min-width: 19vw;
    max-width: 19vw;
`

const SavedPosts = styled.div `
    grid-column: 1/4;
    grid-row: 3;
    // grid-column-gap: 10px
`
const UserPosts = styled.div `
    grid-column: 1/4;
    grid-row: 2;
    grid-column-gap: 10px
`
const LikedPosts = styled.div `
    grid-column: 1/4;
    grid-row: 4;
    grid-column-gap: 10px
`

const Header = styled.div`
    grid-column: 1 / span 3;
    display: flex;
    align-items: center;
    column-gap: 5vw;
    padding: 0 2.5vw;
    border-radius: 15px;
    margin-bottom: 5vh;
    background-color: ${p => p.theme.background.accent.default};

    img {
        aspect-ratio: 1 / 1;
        width: 10vw;
        height: auto;
        border-radius: 50%;
    }
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h1 {
        font-size: 2em;
        font-family: ${p => p.theme.fontFamily.heading};
        color: ${p => p.theme.color.heading.default};
    }

    span {
        font-size: 1.125em;
        color: ${p => p.theme.color.subheading.default};
    }
`

const HeaderButton = styled.button`
    border: none;
    border-radius: 25px;
    font-size: 1.125em;
    padding: 0.5em 1em;
    text-decoration: none;
    font-family: ${p => p.theme.fontFamily.heading};
    background-color: ${p => p.theme.background.backdrop.default};
    color: ${p => p.theme.color.subheading.default};
    cursor: pointer;
    transition: background-color ${p => p.theme.transition.default};

    &:hover {background-color: ${p => p.theme.background.backdrop.hover};}
    &:active {background-color: ${p => p.theme.background.backdrop.active};}
`

const ProfilePage = (props: {
    ownProfile: boolean;
    }) =>  {
        const [searchRes, setSearchRes] = useState(false)
        const [userData, setUserData] = useState<
            {
                profilePhoto:string,
                bio:string,
                SavedPosts:Array<{
                    Posts:{
                        "title": string
                        "images":string[],
                        "id":string,
                        "poster":string
                    }
                }>,
                Likes:Array<{
                    Posts: {
                        "title": string,
                        "images":string[],
                        "id":string,
                        "poster":string
                    }
                }>,
                posts:Array<{
                    "title": string,
                    "images":string[],
                    "id":string,
                    "poster":string
                }>
            }
        >({
            profilePhoto:"",
            bio:"",
            SavedPosts:[],
            Likes:[],
            posts:[]
        })
        const [followerData, setFollowerData] = useState<
            Array<{
                follower:string;
            }>
        >(
            []
        );
        const [followeeData, setFolloweeData] = useState<
            Array<{
                followee:string;
            }>
        >(
            []
        )
        const openSearchRes = () => setSearchRes(true)
        const closeSearchRes : MouseEventHandler = (e) => { if (e.target === e.currentTarget) setSearchRes(false) }

        const params = useParams() as { username: string };
        const authUsername = useAuth();
        const username = props.ownProfile ? authUsername.username : params.username;
        useEffect(() => {
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
    useEffect(()=>{
        const fetchData = async () => {
            const res = await sendGetRequest(`/api/profile/followers/${username}`)

            if(res.error) {
                console.error("Cannot fetch follower data useEffect.",username, res)
            }
            else {
                setFollowerData(res)
            }
        }

        fetchData()
    }, []);
    useEffect(()=>{
        const fetchData = async () => {
            const res = await sendGetRequest(`/api/profile/followees/${username}`)

            if(res.error) {
                console.error("Cannot fetch followee data useEffect.",username, res)
            }
            else {
                setFolloweeData(res)
            }
        }

            fetchData()
            }, []);



        return (
        <>
        <Modal heading={"Friends"} show={searchRes} turnOff={closeSearchRes} >
            <FriendsGrid>
            <div style={{gridColumn:1}}>
            <h3>Followers:</h3>
            {followerData.map(follower =>
                <Link to={`/profile/${follower.follower}`}>
                    {follower.follower}
                </Link>
            )}
            </div>
            <div style={{gridColumn:2}}>
            <h3>Followees:</h3>
            {followeeData.map(followee =>
                <Link to={`/profile/${followee.followee}`}>
                    {followee.followee}
                </Link>
            )}
            </div>
            </FriendsGrid>
        </Modal>
        <ScrollContainer>
            <Grids $ownProfile={props.ownProfile? true: false} >
                <Header>
                    <img src={userData.profilePhoto} alt = {"profile Photo"} />
                    <UserInfo>
                        <h1>{username}</h1>
                        <span>{userData.bio}</span>
                    </UserInfo>
                    <HeaderButton
                        type="button"
                        onClick={openSearchRes}>
                        followers & following
                    </HeaderButton>
                </Header>
            <UserPosts>
                {props.ownProfile ? <h2 style={{alignSelf: "center", justifySelf: "center"}}>Your Posts</h2> :
                                <h2 style={{alignSelf: "center", justifySelf: "center"}}>{username}'s Posts</h2>}
                <HorizontalScrollContainer height={"40vh"}
                                        scrollOffset={200}>
                    {userData.posts.map(post =>
                        <Link to={`/post/${post.id}`}>
                        <TestDiv><PhotoWindow image={post.images[0]} title = {post.title} posterUsername={post.poster} /></TestDiv>
                        </Link>
                    )}
                </HorizontalScrollContainer>
            </UserPosts>
            {props.ownProfile ?
            <SavedPosts>
                <h2 style={{alignSelf: "center", justifySelf: "center"}}>Saved Posts</h2>
                <HorizontalScrollContainer height={"40vh"}
                                        scrollOffset={200}>
                    {userData.SavedPosts.map((entry) =>
                            <TestDiv>
                                <Link to={`/post/${entry.Posts.id}`}>
                                <PhotoWindow image={entry.Posts.images[0]} title={entry.Posts.title} posterUsername={entry.Posts.poster} />
                                </Link>
                            </TestDiv>
                    )}
                </HorizontalScrollContainer>
            </SavedPosts> : <div />}
            {props.ownProfile ?
                <LikedPosts>
                    <h2 style={{alignSelf: "center", justifySelf: "center"}}>Liked Posts</h2>
                    <HorizontalScrollContainer height={"40vh"}
                                               scrollOffset={200}>
                        {userData.Likes.map((entry) =>

                            <TestDiv>
                                <Link to={`/post/${entry.Posts.id}`}>
                                <PhotoWindow image={entry.Posts.images[0]} title={entry.Posts.title} posterUsername={entry.Posts.poster}/>
                                </Link>
                            </TestDiv>
                        )}
                    </HorizontalScrollContainer>
                </LikedPosts> : <div />}
            </Grids>
        </ScrollContainer>
        </>
    ) }
    

export default ProfilePage


// How to do an if statement
// <DisplayRow>
//                 {props.ownProfile ?
//                     <PhotoWindow title="Known Recipe" posterUsername="Michael" />
//                 :
//                     <PhotoWindow title="Unknown Recipe" posterUsername="Not Michael"/>}
//             </DisplayRow>

{/* <h1 style={{justifySelf: "left", alignSelf: "center", gridRow: 2, gridColumn: 2}}>
                    Username
                </h1>
                <h3 style={{justifySelf: "left", alignSelf: "start"}}>
                    This is a description that is much longer than I have seen previously let's see how it
                </h3>
                <button 
                    style={{justifySelf: "center", alignSelf: "start",
                    gridRow: 4, gridColumn: 1, padding: 0,
                    border: "none", background: "none"}}>
                    <u>edit</u>
                </button> */}

    // const [searchRes, setSearchRes] = useState(false)
    // const openSearchRes = () => setSearchRes(true)
    // const closeSearchRes : MouseEventHandler = (e) => { if (e.target === e.currentTarget) setSearchRes(false) }

            {/* <Modal show={searchRes} turnOff={closeSearchRes} /> */}