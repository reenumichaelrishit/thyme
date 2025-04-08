import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const InputStyled = styled.input`
    padding: 2vh 1vw;
    border: 1.5px solid ${p => p.theme.color.accent.default};
    border-radius: 10px;
    letter-spacing: 0.5px;
    color: ${p => p.theme.color.reversed.default};
    background-color: ${p => p.theme.background.reversed.default};

    &:focus-visible {
        outline-color: ${p => p.theme.color.accent.default};
    }

    &:auto-fill, &:-webkit-autofill {
        &, &:focus, &:hover {
            // auto-fill formatting can go here (i can't fix bg color tho ;-;)
        }
    }
`

const LabelStyled = styled.label`
    width: fit-content;
    position: relative;
    top: 9.375px;
    left: 10px;
    padding: 1px 2.5px;
    border-radius: 5px;
    color: ${p => p.theme.color.accent.default};
    background-color: ${p => p.theme.background.reversed.default};

    &:has(+ ${InputStyled}:focus-visible) {
        font-weight: ${p => p.theme.weight.medium};
    }
`

interface InputProps {
    type: string,
    label: string
}

const Input = ({ type, label } : InputProps) => (
    <Container>
        <LabelStyled htmlFor={label}>{label}</LabelStyled>
        <InputStyled
            type={type}
            id={label}
        />
    </Container>
)

export default Input