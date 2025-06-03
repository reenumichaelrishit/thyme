import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2vh;
    padding: 5vh 10vw;
`

export const Heading = styled.h1`
    font-weight: ${p => p.theme.weight.bold};
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
`

export const Subheading = styled.h2`
    font-weight: ${p => p.theme.weight.bold};
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
`

export const Subsubheading = styled.h3`
    margin-top: 2.5vh;
    font-weight: ${p => p.theme.weight.semibold};
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.standard.default};
`

export const FormContainer = styled.form`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto auto;
    column-gap: 5vw;
    row-gap: 1vh;
`

export const FormSection = styled.div<{ $long? : boolean, $longIndex? : number }>`
    grid-row: ${p => p.$long && p.$longIndex ?
        `${Math.floor(p.$longIndex / 2) + 1} / span 2` :
        "auto / auto"
    };

    display: flex;
    flex-direction: column;
    padding: 2.5vh 0;
`

export const Subsection = styled.div`
    margin-bottom: 2vh;
`

export const NutritionFacts = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 1vw;
`

// For IngredientList & DirectionList

const InputRowContainer = css`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 5fr 0.5fr;
    grid-template-rows: 1fr;
    align-items: center;
    column-gap: 5px;
`

export const IngredientContainer = styled.div`
    ${InputRowContainer};
    grid-template-columns: 1fr 1fr 5fr 0.5fr;
`

export const DirectionContainer = styled.div`
    ${InputRowContainer};
    grid-template-columns: 5fr 0.5fr;
`

export const RemoveButton = styled.button`
    height: 40%;
    aspect-ratio: 1 / 1;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    top: 10px;

    border: none;
    border-radius: 50%;
    margin: 0 1vh;

    cursor: pointer;
    background-color: ${p => p.theme.background.standard.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }

    & * {
        color: ${p => p.theme.color.subheading.default};
    }
`

const AddButtonStyles = css`
    padding: 1vh 0;
    border: 2px solid ${p => p.theme.color.heading.default};
    border-radius: 10px;
    margin: 2.5vh 0;

    font-size: 1em;
    font-weight: ${p => p.theme.weight.semibold};
    font-family: ${p => p.theme.fontFamily.heading};

    cursor: pointer;
    color: ${p => p.theme.color.heading.default};
    background-color: ${p => p.theme.background.accent.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.accent.hover};
    }
`

export const AddButton = styled.button`
    ${AddButtonStyles};
`

export const CreatePostButton = styled.button`
    ${AddButtonStyles};

    justify-self: end;
    grid-column: 2 / span 1;
    
    width: fit-content;
    padding: 2vh 2.5vw;
    border-width: 3px;
    border-radius: 20px;
    margin-top: 10vh;
    
    font-size: 1.25em;
`

// For ChipHandler

export const ChipsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ChipSection = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1vh;

    & > span {
        padding: 0.5em 0;
    }
`

export const AddTagsForm = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1vw;
`

export const AddTagButton = styled.button`
    aspect-ratio: 1 / 1;
    height: 6.25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    margin-top: 3.5%;
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
        color: ${p => p.theme.color.subheading.default};
    }
`