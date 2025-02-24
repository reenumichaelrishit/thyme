import styled from "styled-components"

// For AccountPage.tsx

export const Overlay = styled.div<{ $newAccount : boolean }>`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: ${p => p.$newAccount ? "1fr 0.7fr" : "0.7fr 1fr"};
    grid-template-rows: 1fr;
    background-color: ${p => p.theme.color.black.default};
`

export const ImageOverlay = styled.div`
    flex-grow: 1;
    // The "AA" is added as the alpha channel to make it translucent.
    background:
        linear-gradient(${p => p.theme.color.black.default + "AA"}, ${p => p.theme.color.black.default + "AA"}),
        url("https://assets.isu.pub/document-structure/230919192047-316dd2928abd56060cf112bba21e69c0/v1/082c5eb03692088fbd28b04601cfa5fb.jpeg");
    background-size: contain, cover;
    background-repeat: no-repeat, no-repeat;
    background-position: center, center;
`


// For LogIn.tsx & CreateAccount.tsx

export const FormContainer = styled.div<{ $newAccount : boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: ${p => p.$newAccount ? "flex-end" : "flex-start"};
    padding: 5% 10%;
    margin: 10% 15%;
    border: 1px solid ${p => p.theme.color.white.default};
    opacity: 0.8;
`

export const FormStyled = styled.form<{ $newAccount : boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: ${p => p.$newAccount ? "flex-end" : "flex-start"};
    row-gap: 1vh;
`

export const Heading = styled.h1`
    font-size: 3em;
    font-weight: ${p => p.theme.weight.bold};
    font-family: ${p => p.theme.font.heading};
    color: ${p => p.theme.color.white.default};
`

export const FormSection = styled.div<{ $newAccount : boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${p => p.$newAccount ? "flex-end" : "flex-start"};
`

export const SubmitButton = styled.button`
    padding: 2.5% 7.5%;
    border: none;
    border-radius: 10px;
    font-size: 1.125em;
    font-weight: ${p => p.theme.weight.semibold};
    font-family: ${p => p.theme.font.heading};
    color: ${p => p.theme.color.black.default};
    background-color: ${p => p.theme.color.green.default};
    user-select: none;
    cursor: pointer;
    transition: background-color ${p => p.theme.transition.default};

    & + span {
        margin-top: 5%;
    }

    &:hover {
        background-color: ${p => p.theme.color.green.hover};
    }
`

export const SwitchText = styled.span`
    margin-top: 2.5%;
    font-size: 0.875em;
    font-weight: ${p => p.theme.weight.extralight};
    cursor: pointer;
    user-select: none;
    transition: color ${p => p.theme.transition.default};

    &:hover {
        color: ${p => p.theme.color.green.hover};
    }
`