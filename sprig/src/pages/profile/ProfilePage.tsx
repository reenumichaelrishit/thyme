import styled from "styled-components"
import PhotoWindow from "../../components/PhotoWindow";
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

const ProfilePage = (props: {
    ownProfile: boolean;
    profilePic?: string;
    }) => (
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
                <button 
                    style={{border: "none", background: "none"}}>
                    <u>edit</u>
                </button>
            </Description>
            <PhotoWindow title = {"Some Recipe"} />
        </Grids>
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