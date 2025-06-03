import { NutritionContent, PostHeader, SubPostProps, Title } from ".";
import ButtonBar from "./ButtonBar";
import { PostContainer, PostContent, NutritionSummary, PostImage } from "./styled.components";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useRef } from "react";

const FeedPost = (props: SubPostProps) => {
    const ButtonBarRef = useRef<HTMLDivElement>(null)
    const PostHeaderRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()
    const goToCommentsSection = () => navigate(`/post/${props.id}#commentsForm`)

    // considerations to be made for PostHeader
    const goToPost: MouseEventHandler = e => {
        if (
            // ButtonBar is NOT & does NOT contain TARGET
            !ButtonBarRef.current?.contains(e.target as Node) &&
            // AND PostHeader does NOT contain TARGET
            (
                // Explanation:
                // (PostHeader is NOT & does NOT contain TARGET) OR (PostHeader IS TARGET)
                // => (PostHeader does NOT contain TARGET)
                !PostHeaderRef.current?.contains(e.target as Node) ||
                e.target === PostHeaderRef.current
            )
        ) { navigate(`/post/${props.id}`) }
    }

    return (
        <PostContainer className={`${props.images ? "imagePost" : ""} feedPost`} onClick={goToPost}>
            <PostHeader poster={props.poster} profilePhoto={props.Users.profilePhoto} ref={PostHeaderRef} />
            <PostContent>
                <Title title={props.title} description={props.description} tags={props.Tags} />
                <NutritionSummary>
                    <NutritionContent
                        calories={props.calories}
                        protein={props.protein}
                        carbs={props.carbs}
                        fats={props.fats}
                    />
                </NutritionSummary>
            </PostContent>
            {props.images.length > 0 &&
                <PostImage src={props.images[0]} />}
            <ButtonBar
                id={props.id}
                liked={props.liked}
                setLiked={props.setLiked}
                saved={props.saved}
                setSaved={props.setSaved}
                likes={props.Likes.length}
                comments={props.Comments.length}
                saves={props.SavedPosts.length}
                goToComments={goToCommentsSection}
                ref={ButtonBarRef}
            />
        </PostContainer>
    )
}

export default FeedPost;