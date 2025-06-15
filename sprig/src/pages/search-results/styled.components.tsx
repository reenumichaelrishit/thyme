import styled, { css } from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5vh 4vw;
    row-gap: 2.5vh;
`

export const Heading = styled.h1`
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
`

export const ResultsContainerWrapper = styled.div`
    display: flex;

    & > *:not(:first-child) { flex-grow: 1; }
`

export const SortFilterContainer = styled.div`
    width: 25vh;
    display: flex;
    flex-direction: column;
    row-gap: 1vh;

    & > * {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4vh 10%;
        border-radius: 25px;
        color: ${p => p.theme.color.accent.default};
        background-color: ${p => p.theme.background.accent.default};
    }
`

export const SortFilterHeading = styled.h2`
    margin: 1vh 0;
    font-weight: ${p => p.theme.weight.bold};
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
    text-align: right;
`

export const RadioButtonContainer = styled.span`
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.25vh 0;

    label {
        font-weight: ${p => p.theme.weight.medium};
        font-family: ${p => p.theme.fontFamily.heading};
        color: ${p => p.theme.color.subheading.default};
    }

    &, * { cursor: pointer; }
`

export const RadioButton = styled.input`
    appearance: none;
    width: 1.5em;
    height: 1.5em;

    margin-left: 5px;
    border: 2px solid ${p => p.theme.color.subheading.default};
    border-radius: 50%;

    outline: none;
    background-color: transparent;

    &:not(:disabled):checked {
        background-image: radial-gradient(
            circle,
            ${p => p.theme.color.subheading.default} 0%,
            ${p => p.theme.color.subheading.default} 50%,
            transparent 60%,
            transparent 100%
        );
    }
`

export const ResultsContainer = styled.div<{ $viewMode: number }>`
    height: 100%;
    display: grid;
    grid-template-columns: ${p => `repeat(${p.$viewMode === 0 ? "4, 1fr" : "6, 10vw"})`};
    // grid-template-rows: repeat(auto-fill, 25vh);
    justify-content: space-between;
    column-gap: 2vw;
    row-gap: 2.5vh;
    padding: 2.5vh 2.5vw;
`

export const AlertHeading = styled.h1`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-style: italic;
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.subheading.default};
`

export const CardStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 0.5vh;
    text-align: center;
    cursor: pointer;

    h2, h3 {
        font-family: ${p => p.theme.fontFamily.heading};
        text-wrap: pretty;
    }

    h2 {
        font-size: 1.5em;
        font-weight: ${p => p.theme.weight.bold};
        color: ${p => p.theme.color.heading.default};
        transition: color ${p => p.theme.transition.default};

        &:hover { color: ${p => p.theme.color.heading.hover}; }
    }

    h3 {
        font-size: 1.125em;
        font-weight: ${p => p.theme.weight.medium};
        color: ${p => p.theme.color.subheading.default};
        transition: color ${p => p.theme.transition.default};

        &:hover { color: ${p => p.theme.color.subheading.hover}; }
    }
`

export const RecipeCardStyled = styled.div`
    ${CardStyles};
    width: 100%;

    img {
        aspect-ratio: 3 / 2;
        max-width: 100%;
    }
`

export const UserCardStyled = styled.div`
    ${CardStyles};
    width: 10vw;
    border-radius: 5px;
    background-color: ${p => p.theme.background.standard.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }

    &:active {
        background-color: ${p => p.theme.background.standard.active};
    }

    img {
        aspect-ratio: 1 / 1;
        width: 7.5vw;
        border-radius: 50%;
    }
`