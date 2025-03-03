import styled from "styled-components";
import { Heart, Chat, Share, FileArrowDown} from "@phosphor-icons/react";

const Post = styled.article`
    display: flex;
    flex-direction: column;
    gap: 15px;
    // max-height: 100vh;
    width: 60vw;
    color: ${p => p.theme.color.black.default};
    background-color: ${p => p.theme.color.green.default};
    font-weight: ${p => p.theme.weight.regular};
    font-family: ${p => p.theme.font.content};
    margin-left: 20vw;
    margin-bottom: 20px;
    padding: 4vw;
    border-radius: 1vw;
    color: black;
    
    &.imagePost {
        max-height: 100vh;
    }
`

const UserHeading = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 40px;
    height: 5vh;
`

const UserNameAndPic = styled.div `
    display: flex;
    align-items: center;
    gap: 10px;
    color: black;
    font-size: 1em;
    img {
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        height: 100%;
        margin-right: 5px;
    }
`

const FollowAndDropdown = styled.div`
    display: flex;
    align-items: center;
    button {
        background-color: ${p => p.theme.color.black.default};
        color: ${p => p.theme.color.white.default};
        height: 100%;
        width: 5vw;
        border-radius: 15%;
    }
`

const PostContent = styled.div`
    display: flex;
    margin-bottom: 15px;
    gap: 10px;
`

const TitleAndDesc = styled.div`
    width: 60%;
    h2 {
        font-size: 3em;
        margin-bottom: 10px;
    }
`

const NutritionSummary = styled.div`
    // todo: make li and ul
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 4vw;
    margin-top: 15px;
`

const NutritionCol = styled.div`
    h3 {
        color: #410065;
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
    justify-content: space-evenly;
    margin-top: 15px;
`

const BottomButton = styled.button`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${p => p.theme.color.black.default};
    color: ${p => p.theme.color.white.default};
    height: 100%;
    width: 10vw;
    border-radius: 35%;
    gap: 10px;
    font-size: 1.5em;
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
    <div>
        <Post className = {props.postImageLink == "" ? "" : "imagePost"}>
            <UserHeading>
                <UserNameAndPic>
                    <img src={props.profileImage ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/>
                    @{props.posterUsername}
                </UserNameAndPic>
                <FollowAndDropdown>
                    <button>
                        {props.notFollowing? "follow" : "following"}
                    </button>
                    <button>...</button>
                </FollowAndDropdown>
            </UserHeading>
            <PostContent>
                <TitleAndDesc>
                    <h2>{props.title}</h2>
                    <p>{props.desc}</p>
                </TitleAndDesc>
                <NutritionSummary>
                    <NutritionCol><h3>Cal</h3> {props.calories ?? "?"}</NutritionCol>
                    <NutritionCol><h3>Prtn</h3> {props.protein ?? "?"}</NutritionCol>
                    <NutritionCol><h3>Carbs</h3> {props.carbs ?? "?"}</NutritionCol>
                    <NutritionCol><h3>Fat</h3> {props.fat ?? "?"}</NutritionCol>
                </NutritionSummary>
            </PostContent>
            <PostImage src={props.postImageLink} />
            <ButtonBar likes={20} comments={4} shares={2}/>
        </Post>
    </div>
)

export default FeedPost;