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
const Grids = styled.div<{ $ownProfile?: boolean }>
`
    min-height: ${props => props.$ownProfile ? "90vh" : "50vh"};
    display: grid;
    margin: 5vh 5vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: ${props => props.$ownProfile ? "1fr 1fr 1fr": "1fr 1fr"};
`;

const Description = styled.div `
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    justify-self: center;
`

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

const FriendsButton = styled.div `
    grid-column: 3;
    grid-row: 1;
    align-self: center;
    justify-self: center;

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
                        "id":string,
                        "poster":string
                    }
                }>,
                Likes:Array<{
                    Posts: {
                        "title": string
                        "id":string,
                        "poster":string
                    }
                }>,
                posts:Array<{
                    "title": string,
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
        const openSearchRes = () => setSearchRes(true)
        const closeSearchRes : MouseEventHandler = (e) => { if (e.target === e.currentTarget) setSearchRes(false) }

        const params = useParams() as { username: string };
        const authUsername = useAuth();
        const username = props.ownProfile ? authUsername.username : params.username;
        useEffect(()=>{
                // sendGetRequest(`api/profile/${username}`).then((res)=>{
                //     if(res.error) {
                //         console.error("Cannot fetch user data useEffect.",username, res)
                //     }
                //     else {
                //         setUserData(res)
                //     }
                // })
            const fetchData = async () => {
                const res = await sendGetRequest(`/api/profile/${username}`)

                if(res.error) {
                    console.error("Cannot fetch user data useEffect.",username, res)
                }
                else {
                    console.log("USEEFFECT WORKED LETS FUCKING GO")
                    setUserData(res)
                }
            }

            fetchData()
            }, []);



        return (
        <>
        <Modal show={searchRes} turnOff={closeSearchRes} />
        <ScrollContainer>
            <Grids $ownProfile={props.ownProfile? true: false} >
            <img src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                 style= {{
                        gridColumn: "1",
                        gridRow: "1 / 2",
                        width: "15vw"
            }} />
            
            <Description>
                <h1>
                    {username}
                </h1>
                <h3>
                    {userData.bio}
                </h3>
                {props.ownProfile ?
                    <button 
                        style={{border: "none", background: "none", justifySelf: "center", alignSelf: "center"}}
                        type="button">
                        <u>edit</u>
                    </button>: <div/>}
            </Description>
            <FriendsButton>
                    <button 
                        style={{border: "none", background: "none"}}
                        type="button"
                        onClick={openSearchRes}>
                        <p style={{fontSize: "3em"}}>
                            <u>Friends</u>
                        </p>
                    </button>
            </FriendsButton>
            <UserPosts>
                {props.ownProfile ? <h2 style={{alignSelf: "center", justifySelf: "center"}}>Your Posts</h2> :
                                <h2 style={{alignSelf: "center", justifySelf: "center"}}>{username}'s Posts</h2>}
                <HorizontalScrollContainer height={"40vh"}
                                        scrollOffset={200}>
                    {userData.posts.map(post =>
                        <Link to={`/post/${post.id}`}>
                        <TestDiv><PhotoWindow title = {post.title} posterUsername={post.poster} /></TestDiv>
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
                                <PhotoWindow title={entry.Posts.title} posterUsername={entry.Posts.poster} />
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
                                <PhotoWindow title={entry.Posts.title} posterUsername={entry.Posts.poster}/>
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