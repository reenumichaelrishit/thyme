import { Heart, Chat, Bookmark, Share } from "@phosphor-icons/react"
import { Dispatch, forwardRef, Ref, SetStateAction, useState } from "react"
import { BottomButtonBar, BottomButton } from "./styled.components"
import Alert from "../Alert"
import { useAuth } from "../../AuthContext"
import { sendPostRequest } from "../../fetches/sendPostRequest"

const ButtonBar = forwardRef((props: {
    id: string,
    liked: boolean,
    setLiked: Dispatch<SetStateAction<boolean>>,
    saved: boolean,
    setSaved: Dispatch<SetStateAction<boolean>>,
    likes: number,
    comments: number,
    saves: number,
    goToComments: () => void
}, ref: Ref<HTMLDivElement>) => {
    const [showLinkCopiedAlert, setShowLinkCopiedAlert] = useState(false)

    const { authToken, username } = useAuth()

    const toggleLike = async () => {
        const like = {
            type: "like",
            postid: props.id,
            userid: username
        }

        if (props.liked) {
            // The post is currently liked.
            // Unlike it.
            props.setLiked(false)

            const res = await sendPostRequest("/api/posts/interact/remove", like)
            
            if (res.error) {
                props.setLiked(true)
                console.error("could not unlike post!")
            }

        } else {
            // The post is currently NOT liked.
            // Like it.
            props.setLiked(true)

            const res = await sendPostRequest("/api/posts/interact/add", like)
            
            if (res.error) {
                props.setLiked(false)
                console.error("could not like post!")
            }
        }
    }

    const toggleSave = async () => {
        const save = {
            type: "save",
            postid: props.id,
            userid: username
        }

        if (props.saved) {
            // The post is currently saved.
            // Unsave it.
            props.setSaved(false)

            const res = await sendPostRequest("/api/posts/interact/remove", save)
            
            if (res.error) {
                props.setSaved(true)
                console.error("could not unsave post!")
            }

        } else {
            // The post is currently NOT saved.
            // Save it.
            props.setSaved(true)

            const res = await sendPostRequest("/api/posts/interact/add", save)
            
            if (res.error) {
                props.setSaved(false)
                console.error("could not save post!")
            }
        }
    }

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/post/${props.id}`)

        // Show the alert
        setShowLinkCopiedAlert(true)

        // Turn it off after 2s
        setTimeout(() => setShowLinkCopiedAlert(false), 2000)
    }

    // Takes a function. Returns given function if authenticated, otherwise () => {}.
    const authenticatedFunction = (originalFunction: () => void) => !authToken ? () => {} : originalFunction

    return (
        <BottomButtonBar ref={ref}>
            {/* LIKE BUTTON: toggle button for like */}
            <BottomButton
                type="button"
                $type="like"
                $selected={props.liked}
                $disabled={!authToken}
                onClick={authenticatedFunction(toggleLike)}
            >
                <Heart size={24} weight={props.liked ? "fill" : "regular"} />
                {props.likes}
            </BottomButton>

            {/* COMMENT BUTTON: link to comments in detailed view */}
            <BottomButton
                type="button"
                $disabled={!authToken}
                onClick={authenticatedFunction(props.goToComments)}
            >
                <Chat size={24}/>
                {props.comments}
            </BottomButton>

            {/* SAVE BUTTON: toggle button for save */}
            <BottomButton
                type="button"
                $selected={props.saved}
                $disabled={!authToken}
                onClick={authenticatedFunction(toggleSave)}
            >
                <Bookmark size={24} weight={props.saved ? "fill" : "regular"} />
                {props.saves}
            </BottomButton>

            {/* SHARE BUTTON: copy link to clipboard */}
            <BottomButton
                type="button"
                onClick={copyLinkToClipboard}
            >
                <Share size={24}/>

                {/* Alert that pops up when button is clicked. */}
                <Alert label="Link copied!" show={showLinkCopiedAlert} />
            </BottomButton>

        </BottomButtonBar>
    )
})

export default ButtonBar