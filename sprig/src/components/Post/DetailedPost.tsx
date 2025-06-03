import { ArrowLeft, DotsThree, Heart, PaperPlaneTilt } from "@phosphor-icons/react";
import { NutritionContent, PostHeader, SubPostProps, Title } from ".";
import ButtonBar from "./ButtonBar";
import {
    PostContainer,
    PostImage,
    NutritionRow,
    PostSectionHeading,
    DirectionsList,
    IngredientsList,
    CommentContainer,
    CommentsSection,
    Commenter,
    Interactions,
    LikeComment,
    AddCommentForm,
    SendCommentButton,
    BackButton,
    CommentOptionsButton
} from "./styled.components";
import { FormEvent, useRef, useState } from "react";
import { Textarea } from "../Input";
import Alert from "../Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { sendPostRequest } from "../../fetches/sendPostRequest";

const Comment = (comment: {
    id: string,
    commenter: string,
    commentText: string,
    CommentLikes: Array<{
        commentid: string,
        userid: string
    }>,
    refresh?: () => void
}) => {
    const { authToken, username } = useAuth()

    const initiallyLiked = comment.CommentLikes.map(like => like.userid).includes(username)
    const [liked, setLiked] = useState(initiallyLiked)

    const toggleLike = async () => {
        const like = {
            commentid: comment.id,
            userid: username
        }

        if (liked) {
            // The post is currently liked.
            // Unlike it.
            setLiked(false)

            const res = await sendPostRequest("/api/posts/comments/unlike", like)

            if (res.error) {
                setLiked(true)
                console.error("could not unlike comment!")
            }
        } else {
            // The post is currently NOT liked.
            // Like it.
            setLiked(true)

            const res = await sendPostRequest("/api/posts/comments/like", like)

            if (res.error) {
                setLiked(false)
                console.error("could not like comment!")
            }
        }

        comment.refresh && comment.refresh()
    }

    return (
        <CommentContainer>
            <img src={/*props.profileImage ?? */"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/>
            <Commenter>@{comment.commenter}</Commenter>
            <Interactions>
                <LikeComment onClick={!authToken ? () => {} : toggleLike} $selected={liked}>
                    <Heart size={18} weight={liked ? "fill" : "regular"} />
                    <span>{comment.CommentLikes.length}</span>
                </LikeComment>
                {/* <PostOptionsButton onMouseEnter={showProfileOptionsMenu} onMouseLeave={hideProfileOptionsMenu}> */}
                <CommentOptionsButton>
                    <DotsThree size={16} weight="bold" />
    
                    {/* <Menu
                        view={viewProfileOptionsMenu}
                        items={[
                            [<span>{"Report Comment"}</span>, ""],
                        ]}
                    /> */}
                </CommentOptionsButton>
            </Interactions>
            <span>{comment.commentText}</span>
        </CommentContainer>
    )
}

const DetailedPost = (props: SubPostProps) => {
    const navigate = useNavigate()
    const getBack = () => navigate("/")

    const { authToken, username } = useAuth()

    const [showCommentAlert, setShowCommentAlert] = useState(false)
    const commentsSectionRef = useRef<null | HTMLFormElement>(null)

    const goToCommentsSection = () => {
        commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const submitComment = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const comment = {
            commenter: username,
            commentedPost: props.id,
            commentText: formData.get("commentText")
        }

        const res = await sendPostRequest("/api/posts/comments/add", comment)

        if (res.error) {
            console.error("could not submit comment!")
        } else {
            props.refresh && props.refresh()

            // Show the alert
            setShowCommentAlert(true)

            // Turn it off after 2s
            setTimeout(() => setShowCommentAlert(false), 2000)
        }
    }
    
    return (
        <PostContainer>
            <BackButton type="button" onClick={getBack}>
                <ArrowLeft size={24} weight={"bold"} />
            </BackButton>
            <PostHeader poster={props.poster} />
            <Title title={props.title} description={props.description} tags={props.Tags} />
            <NutritionRow>
                <NutritionContent
                    calories={props.calories}
                    protein={props.protein}
                    carbs={props.carbs}
                    fats={props.fats}
                />
            </NutritionRow>
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
            />
            <PostSectionHeading>ingredients</PostSectionHeading>
            <IngredientsList>
                {props.ingredients.map((item, index) => {
                    const { quantity, unit, ingredient } = item

                    return (
                        <li key={`Ingredient-${index}`}>
                            {`${quantity} ${unit} of `}<u>{ingredient}</u>
                        </li>
                    )
                })}
            </IngredientsList>
            <PostSectionHeading>directions</PostSectionHeading>
            <DirectionsList>
                {props.directions.map((direction, index) =>
                    <li key={`Direction-${index}`}>
                        <span className="number-bubble">{index + 1}</span>
                        <span>{direction}</span>
                    </li>
                )}
            </DirectionsList>
            <PostSectionHeading>comments section</PostSectionHeading>
            <CommentsSection>
                {props.Comments.map((comment, index) =>
                    <Comment
                        {...comment}
                        refresh={props.refresh}
                        key={`Comment-${index}`}
                    />
                )}

                {!authToken ?
                    // NOT authenticated here
                    <PostSectionHeading>log in to leave a comment!</PostSectionHeading> :
                    // AUTHENTICATED here
                    <AddCommentForm onSubmit={submitComment} id="commentForm" ref={commentsSectionRef}>
                        <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                        <Textarea label="leave a comment!" name="commentText" required />
                        <SendCommentButton type="submit">
                            <PaperPlaneTilt size={24} />
                        </SendCommentButton>
                    </AddCommentForm>}

                <Alert label="Comment created!" show={showCommentAlert} />
            </CommentsSection>
        </PostContainer>
    )
}

export default DetailedPost;