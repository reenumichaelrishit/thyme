import styled, { css } from "styled-components"

export const PostContainer = styled.article`
    // max-height: 100vh;
    width: 50vw;
    
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    
    padding: 4vh 3vw;
    border-radius: 25px;
    
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    font-family: ${p => p.theme.fontFamily.content};
    
    &.imagePost {
        // max-height: 100vh;
    }

    &.feedPost { cursor: pointer; }
`

export const UserHeading = styled.div`
    height: max-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    font-family: ${p => p.theme.fontFamily.heading};
`

export const BackButton = styled.button`
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 23.625vw;
    padding: 0.5%;
    border: none;
    border-radius: 50%;
    z-index: 100;
    cursor: pointer;
    color: ${p => p.theme.color.heading.default};
    background-color: ${p => p.theme.background.accent.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover { background-color: ${p => p.theme.background.accent.hover}; }
    &:active { background-color: ${p => p.theme.background.accent.active}; }
`

export const UserInfo = styled.div `
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

export const PostContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: 100%;
    column-gap: 10px;
    align-items: center;
`

const OptionsButton = css`
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }
`

export const PostOptionsButton = styled.span`
    ${OptionsButton};
    width: 2vw;
`

export const CommentOptionsButton = styled.span`
    ${OptionsButton};
    width: 2vw;
    padding: 2%;
`

export const TitleAndDesc = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2vh;

    h2 {
        font-size: 3em;
        font-family: ${p => p.theme.fontFamily.heading};
        color: ${p => p.theme.color.heading.default};
    }
`

export const NutritionSummary = styled.div`
    height: max-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: end;
    align-items: stretch;
    row-gap: 2.5vh;
    color: ${p => p.theme.color.heading.default};

    * {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        h3 {
            font-family: ${p => p.theme.fontFamily.heading};
        }
    }
`

export const NutritionRow = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1vh;

    * {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h3 {
            font-family: ${p => p.theme.fontFamily.heading};
            font-weight: ${p => p.theme.weight.medium};
            font-size: 1.375em;
        }

        span {
            font-size: 1em;
        }
    }
`

export const PostImage = styled.img`
    width: 100%;
    object-fit: cover;
    max-height: 60vh;
`

export const PostSectionHeading = styled.h2`
    font-family: ${p => p.theme.fontFamily.heading};
    font-weight: ${p => p.theme.weight.semibold};
    color: ${p => p.theme.color.subheading.default};
    margin: 1vh 0;
`

const ListStyles = css`
    li:not(:last-child) {
        margin-bottom: 0.5vh;
    }
`

export const IngredientsList = styled.ul`
    ${ListStyles};
    list-style-position: inside;
    font-size: 1.125em;
    
    // li::marker { color: ${p => p.theme.color.subheading.default}; }

    u {
        color: ${p => p.theme.color.heading.default};
        transition: color ${p => p.theme.transition.default};
        &:hover { color: ${p => p.theme.color.heading.hover}; }
    }
`

export const DirectionsList = styled.ol`
    ${ListStyles};
    list-style: none;

    li {
        height: max-content;
        display: flex;
        align-items: center;
        column-gap: 1.5%;

        .number-bubble {
            aspect-ratio: 1 / 1;
            width: 5vh;
            height: auto;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 1em;
            color: ${p => p.theme.color.reversed.default};
            background-color: ${p => p.theme.background.reversed.default};
            // background-color: ${p => p.theme.background.navbar.default};
        }
    }
`


export const BottomButtonBar = styled.div `
    display: flex;
    height: 8vh;
    // column-gap: 0.5vw;
    justify-content: space-between;
    // padding: 0 5vw;
`

export const BottomButton = styled.button<{
    $type?: string,
    $selected?: boolean,
    $disabled?: boolean
}>`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 7.5vw;
    position: relative;
    border: none;
    color: ${p =>
        p.$disabled ?
            p.theme.color.standard.default + "55" :
            p.$type == "like" && p.$selected ?
                p.theme.color.like.default
                : p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    column-gap: 1.25vw;
    font-size: 1.25em;
    font-family: ${p => p.theme.fontFamily.content};
    cursor: ${p => p.$disabled ? "auto" : "pointer"};
    transition: all ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => !p.$disabled && p.theme.background.standard.hover};
    }

    &:active {
        background-color: ${p => !p.$disabled && p.theme.background.standard.active};
    }

    &:not(:last-child)::after {
        content: "";
        width: 1.5px;
        height: 75%;
        position: absolute;
        right: -0.75px; // half of width to centre it
        background-color: ${p => p.theme.background.accent.default};
    }


`

export const CommentsSection = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2vh;
`

export const CommentContainer = styled.div`
    display: grid;
    grid-template-rows: 5vh 1fr;
    grid-template-columns: 5% auto 10%;
    grid-template-areas:
        "profilepicture commenter interactions"
        ". text text";
    align-items: center;
    column-gap: 0.5vw;
    row-gap: 0.25vh;

    & > img {
        grid-area: profilepicture;
        align-self: start;
        height: 5vh;
        border-radius: 50%;
    }

    & > span {
        grid-area: text;
    }
`

export const Commenter = styled.h3`
    grid-area: commenter;
    font-family: ${p => p.theme.fontFamily.heading};
    font-weight: ${p => p.theme.weight.medium};
    font-size: 1.125em;
    color: ${p => p.theme.color.heading.default};
`

export const Interactions = styled.div`
    grid-area: interactions;
    display: inline-flex;
    align-items: center;
    column-gap: 0.75vw;
`

export const LikeComment = styled.span<{ $selected: boolean }>`
    display: inline-flex;
    justify-content: space-evenly;
    align-items: center;
    column-gap: 0.75vw;
    color: ${p =>
        p.$selected ?
            p.theme.color.like.default :
            p.theme.color.standard.default};
    cursor: pointer;

    * { width: 1vw; }
`

export const AddCommentForm = styled.form`
    display: flex;
    align-items: center;
    column-gap: 0.75vw;

    img {
        height: 5vh;
        border-radius: 50%;
    }

    img, button {
        margin-top: 3.5%;
    }
`

export const SendCommentButton = styled.button`
    aspect-ratio: 1 / 1;
    height: 6.25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${p => p.theme.background.standard.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }

    &:active {
        background-color: ${p => p.theme.background.standard.active};
    }

    * {
        color: ${p => p.theme.color.heading.default};
    }
`