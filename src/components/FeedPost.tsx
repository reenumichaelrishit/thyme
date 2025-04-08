import styled from "styled-components";
import { Heart, Chat, Share, FileArrowDown} from "@phosphor-icons/react";
import FollowButton from "./FollowButton";

const Post = styled.article`
    // max-height: 100vh;
    width: 60vw;
    
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    
    padding: 5vh 4vw;
    border-radius: 25px;
    
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    font-family: ${p => p.theme.fontFamily.content};
    
    &.imagePost {
        // max-height: 100vh;
    }
`

const UserHeading = styled.div`
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    font-family: ${p => p.theme.fontFamily.heading};
`

const UserInfo = styled.div `
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: black;
    font-size: 1em;

    img {
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        height: 5vh;
    }
`

const PostContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: 100%;
    column-gap: 10px;
    align-items: center;
`

const TitleAndDesc = styled.div`
    // width: 60%;
    h2 {
        font-size: 3em;
        margin-bottom: 10px;
        color: ${p => p.theme.color.heading.default};
    }
`

const NutritionSummary = styled.div`
    height: max-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: end;
    align-items: stretch;
    row-gap: 2.5vh;
    color: ${p => p.theme.color.heading.default};
`

const NutritionCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    h3 {
        font-family: ${p => p.theme.fontFamily.heading};
    }
`

const PostImage = styled.img`
    width: 100%;
    object-fit: cover;
    max-height: 60vh;
`


const BottomButtonBar = styled.div `
    display: flex;
    height: 6vh;
    column-gap: 1vw;
    // justify-content: space-between;
`

const BottomButton = styled.button`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 7.5vw;
    border: 1.5px solid ${p => p.theme.color.standard.default};
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    border-radius: 50px;
    column-gap: 10px;
    font-size: 1.25em;
    cursor: pointer;
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }
`

const ButtonBar = (props: {
    likes: number;
    comments: number;
    shares: number;
}) => (
    <BottomButtonBar>
        <BottomButton><Heart size={25}/>{props.likes}</BottomButton>
        <BottomButton><Chat size={25}/>{props.comments}</BottomButton>
        <BottomButton><Share size={25}/>{props.shares}</BottomButton>
        <BottomButton><FileArrowDown size={25}/>save</BottomButton>
    </BottomButtonBar>
)

const FeedPost = (props: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
    desc: string;
    title: string;
    notFollowing: boolean;
    posterUsername: string;
    profileImage?: string;
    postImageLink: string; }) => (
    <Post className = {props.postImageLink == "" ? "" : "imagePost"}>
        <UserHeading>
            <UserInfo>
                <img src={props.profileImage ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/>
                <span>@{props.posterUsername}</span>
                <FollowButton following={props.notFollowing} />
            </UserInfo>
            <span>...</span>
        </UserHeading>
        <PostContent>
            <TitleAndDesc>
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </TitleAndDesc>
            <NutritionSummary>
                <NutritionCol>
                    <h3>Calories</h3>
                    <span>{props.calories ?? "?"}</span>
                </NutritionCol>
                <NutritionCol>
                    <h3>Protein</h3>
                    <span>{props.protein ?? "?"}</span>
                </NutritionCol>
                <NutritionCol>
                    <h3>Carbs</h3>
                    <span>{props.carbs ?? "?"}</span>
                </NutritionCol>
                <NutritionCol>
                    <h3>Fats</h3>
                    <span>{props.fat ?? "?"}</span>
                </NutritionCol>
            </NutritionSummary>
        </PostContent>
        <PostImage src={props.postImageLink} />
        <ButtonBar likes={20} comments={4} shares={2}/>
    </Post>
)

export default FeedPost;