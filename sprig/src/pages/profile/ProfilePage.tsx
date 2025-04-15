import styled from "styled-components"
import PhotoWindow from "../../components/PhotoWindow";
import { ReactNode, useRef } from "react"
import Scrollbars from "react-custom-scrollbars-2"
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react"
import ScrollContainer from "../../components/ScrollContainer";
const Grids = styled.div `
    min-height: 90vh;
    display: grid;
    margin: 5vh 5vw;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    // & .link {
    //     color:${p => p.theme.color.accent.default};
    //     &:visited {
    //         color:${p => p.theme.color.accent.default};
    //     }
    // }
`

const Description = styled.div `
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    justify-self: center;
`

const HorizontalScrollContainer = (props: { height: string, scrollOffset: number, children: ReactNode }) => {
    const scrollRef = useRef(null)

    const getScrollWidth = () => (scrollRef.current?.getScrollLeft())
    const scrollToLeft = () => scrollRef.current?.scrollLeft(getScrollWidth() - props.scrollOffset)
    const scrollToRight = () => scrollRef.current?.scrollLeft(getScrollWidth() + props.scrollOffset)

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

const FriendsButton = styled.div `
    grid-column: 3;
    grid-row 1;
`

const ProfilePage = (props: {
    ownProfile: boolean;
    profilePic?: string;
    }) => (
        <ScrollContainer>
        <Grids>
            <img src={props.profilePic ?? "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                 style= {{
                        gridColumn: "1",
                        gridRow: "1 / 2",
                        width: "15vw"
            }} />
            
            <Description>
                <h1>
                    Username
                </h1>
                <h3>
                    This is a description that is much longer than I have seen previously let's see how it
                </h3>
                {props.ownProfile ?
                    <button 
                        style={{border: "none", background: "none"}}>
                        <u>edit</u>
                    </button>: <div/>}
            </Description>

            <UserPosts>
                {props.ownProfile ? <h2 style={{alignSelf: "center", justifySelf: "center"}}>Your Posts</h2> :
                                <h2 style={{alignSelf: "center", justifySelf: "center"}}>User's Posts</h2>}
                <HorizontalScrollContainer height={"40vh"}
                                        scrollOffset={200}>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                </HorizontalScrollContainer>
            </UserPosts>
            {props.ownProfile ?
            <SavedPosts>
                <h2 style={{alignSelf: "center", justifySelf: "center"}}>Saved Posts</h2>
                <HorizontalScrollContainer height={"40vh"}
                                        scrollOffset={200}>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                    <TestDiv><PhotoWindow title = {"Some Recipe"} /></TestDiv>
                </HorizontalScrollContainer>
            </SavedPosts> : <div /> }
        </Grids>
        </ScrollContainer>
    )
    

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