import { Dispatch, forwardRef, Ref, SetStateAction, useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import DetailedPost from "./DetailedPost";
import { DotsThree } from "@phosphor-icons/react";
import FollowButton from "../FollowButton";
import { UserHeading, UserInfo, PostOptionsButton, TitleAndDesc } from "./styled.components";
import Menu from "../Menu";
import Chips from "../Chips";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export interface PostProps {
    id: string,
    created_at: string,
    poster: string,
    title: string,
    description: string,
    directions: Array<string>,
    ingredients: Array<{
        quantity: number,
        unit: string
        ingredient: string
    }>,
    images: Array<string>,
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    Likes: Array<{
        postid: string,
        userid: string
    }>,
    Comments: Array<{
        id: string,
        commenter: string,
        commentText: string,
        CommentLikes: Array<{
            commentid: string,
            userid: string
        }>,
        Users: {
            username: string,
            profilePhoto: string
        }
    }>,
    SavedPosts: Array<{
        postid: string,
        userid: string
    }>,
    Tags: Array<{ name: string }>,
    Users: {
        username: string,
        profilePhoto: string
    },
    refresh?: () => void
}

// For <Post>
interface CompletePostProps extends PostProps {
    view?: "feed" | "detailed"
}

// For <FeedPost> & <DetailedPost>
export interface SubPostProps extends PostProps {
    liked: boolean,
    setLiked: Dispatch<SetStateAction<boolean>>,
    saved: boolean,
    setSaved: Dispatch<SetStateAction<boolean>>
}

const Post = (props: CompletePostProps) => {
    const { view, ...postProps } = props
    const { username } = useAuth()

    const initiallyLiked = props.Likes.map(like => like.userid).includes(username)
    const initiallySaved = props.SavedPosts.map(save => save.userid).includes(username)

    const [liked, setLiked] = useState(initiallyLiked)
    const [saved, setSaved] = useState(initiallySaved)

    // Refresh in case of like or save button pressed (to update count)
    useEffect(() => {
        props.refresh && props.refresh()
    }, [liked, saved])

    const allProps = {
        ...postProps,
        liked: liked,
        setLiked: setLiked,
        saved: saved,
        setSaved: setSaved
    }

    return view == "detailed" ?
        <DetailedPost {...allProps} />
        : <FeedPost {...allProps} />
}

export default Post

// Following is the common content between FeedPost & DetailedPost

export const PostHeader = forwardRef((props: { poster: string, profilePhoto: string }, ref: Ref<HTMLDivElement>) => {
    const [viewProfileOptionsMenu, setViewProfileOptionsMenu] = useState(false)
    const showProfileOptionsMenu = () => setViewProfileOptionsMenu(true)
    const hideProfileOptionsMenu = () => setTimeout(() => setViewProfileOptionsMenu(false), 250)

    const { username, authToken } = useAuth()
    const navigate = useNavigate()

    const goToProfile = () => navigate(`/profile/${props.poster}`)

    return (
        <UserHeading ref={ref}>
            <UserInfo>
                <img
                    src={props.profilePhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                    alt={`profile photo of ${props.poster}`}
                    onClick={goToProfile}
                />
                <span onClick={goToProfile}>@{props.poster}</span>
                {!authToken || props.poster === username ?
                    <></> :
                    <FollowButton recipient={props.poster} />
                }
            </UserInfo>
            <PostOptionsButton onMouseEnter={showProfileOptionsMenu} onMouseLeave={hideProfileOptionsMenu}>
                <DotsThree size={16} weight="bold" />

                <Menu
                    view={viewProfileOptionsMenu}
                    items={props.poster === username ?
                        [
                            [<span>{"Edit Post"}</span>, ""],
                            [<span>{"Report Post"}</span>, ""]
                        ] :
                        [[<span>{"Report Post"}</span>, ""]]}
                    top="11.5vh"
                    right="20vw"
                />
            </PostOptionsButton>
        </UserHeading>
    )
})

export const Title = (props: {
    title: string,
    description: string,
    tags: Array<{ name: string }>
}) => (
    <TitleAndDesc>
        <h2>{props.title}</h2>
        {props.description && <p>{props.description}</p>}
        {props.tags.length > 0 && <Chips mode={2} initialLabels={props.tags.map(tag => tag.name)} />}
    </TitleAndDesc>
)

export const NutritionContent = (props: {
    calories: number,
    protein: number,
    carbs: number,
    fats: number
}) => (
    <>
        <div>
            <h3>calories</h3>
            <span>{props.calories ?? "?"}</span>
        </div>
        <div>
            <h3>protein</h3>
            <span>{props.protein ?? "?"}</span>
        </div>
        <div>
            <h3>carbs</h3>
            <span>{props.carbs ?? "?"}</span>
        </div>
        <div>
            <h3>fats</h3>
            <span>{props.fats ?? "?"}</span>
        </div>
    </>
)