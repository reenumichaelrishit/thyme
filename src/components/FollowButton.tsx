import { useState } from "react"
import styled from "styled-components"

interface FollowButtonProps {
    following?: boolean
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
            p.theme.background.post.default};
    cursor: pointer;
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${
            p => p.$following ?
                p.theme.background.reversed.hover :
                p.theme.background.post.hover};
        }
`

const FollowButton = (props: FollowButtonProps) => {
    const [following, setFollowing] = useState(props.following || false)
    const toggleFollowing = () => setFollowing(!following)

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