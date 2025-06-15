import { useEffect, useState } from "react"
import styled from "styled-components"
import { sendPostRequest } from "../fetches/sendPostRequest"
import { useAuth } from "../AuthContext"
import { sendGetRequest } from "../fetches/sendGetRequest"

interface FollowButtonProps {
    recipient: string
}

const ButtonStyled = styled.button<{ $following: boolean }>`
    width: max-content;
    height: max-content;
    padding: 5px 12.5px;
    border: 1.5px solid ${p => p.theme.color.standard.default};
    border-radius: 15px;
    font-size: 0.75em;
    font-weight: ${p => p.theme.weight.medium};
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${
        p => p.$following ?
            p.theme.color.reversed.default :
            p.theme.color.standard.default};
    background-color: ${
        p => p.$following ?
            p.theme.background.reversed.default :
            p.theme.background.standard.default};
    cursor: pointer;
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${
            p => p.$following ?
                p.theme.background.reversed.hover :
                p.theme.background.standard.hover};
        }
`

const FollowButton = (props: FollowButtonProps) => {
    const { username } = useAuth()
    const [following, setFollowing] = useState(false)

    // Get data on whether user follows this poster or not
    useEffect(() => {
        const fetchData = async () => {
            const res = await sendGetRequest(`/api/follow/${props.recipient}/${username}`)

            if (res.error) {
                console.error(res.error)
            } else {
                setFollowing(res.data as boolean)
            }

            console.log(following)
        }

        fetchData()
    }, [])

    const toggleFollowing = async () => {
        const payload = {
            requester: username,
            recipient: props.recipient
        }

        if (following) {
            // User is ALREADY following.
            // Need to UNFOLLOW.

            setFollowing(false)

            const res = await sendPostRequest("/api/unfollow", payload)

            if (res.error) {
                console.error(res.error)
            }

        } else {
            // User is NOT following.
            // Need to FOLLOW.

            setFollowing(true)

            const res = await sendPostRequest("/api/follow", payload)

            if (res.error) {
                console.error(res.error)
            }

        }
    }

    return (
        <ButtonStyled
            type="button"
            $following={following}
            onClick={toggleFollowing}
        >
            {
                following ?
                    "Following" :
                    "Follow"
            }
        </ButtonStyled>
    )
}

export default FollowButton