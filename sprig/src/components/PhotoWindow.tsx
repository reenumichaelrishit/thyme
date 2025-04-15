import styled from "styled-components";

const PostDiv = styled.div `
    display: grid;
    grid-template-columns: 30vw;
    grid-template-rows: 30vh 3vh 3vh;

`
const PostPic = styled.img `
    object-fit: cover;
    max-height: 30vh;
    max-width: 30vw;
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: center;
`

const Title = styled.div `
    grid-column: 1;
    grid-row: 2;
    justify-self: center;
    align-self: center;
`

const User = styled.div `
    grid-column: 1;
    grid-row: 3;
    justify-self: center;
    align-self: center;
`

const PhotoWindow = (props: {
    image?: string;
    imageAlt?: string
    posterUsername?: string;
    title: string;
    }) => (
   <PostDiv>
        {/* TODO: replace this with our own default image */}
        <PostPic src={props.image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvX7ghSY75PvK5S-RvhkFxNz88MWEALSBDvA&s"} />
        <Title>
            <h3>{props.title}</h3>
        </Title>
        <User>
            <h4>{props.posterUsername ?? "Unknown"}</h4>
        </User>
   </PostDiv>
)

export default PhotoWindow;