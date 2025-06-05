import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import styled, { css } from "styled-components"

const InputStyles = css`
    width: 100%;
    padding: 2vh 1vw;
    border: 2px solid ${p => p.theme.color.subheading.default};
    border-radius: 10px;
    letter-spacing: 0.25px;
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    font-family: ${p => p.theme.fontFamily.content};

    &:focus-visible {
        outline: 1px solid ${p => p.theme.color.subheading.default};
    }

    &:auto-fill, &:-webkit-autofill {
        &, &:focus, &:hover {
            // auto-fill formatting can go here (i can't fix bg color tho ;-;)
        }
    }
`

const Container = styled.div`
    width: 100%;
    display: inline-flex;
    flex-direction: column;
`

const InputStyled = styled.input`
    ${InputStyles};
    font-weight: ${p => p.theme.weight.medium};
`

const TextareaStyled = styled.textarea`
    ${InputStyles};
    resize: none;
    overflow: hidden;
`

const LabelStyled = styled.label`
    width: fit-content;
    position: relative;
    top: 9.375px;
    left: 10px;
    padding: 1px 2.5px;
    border-radius: 5px;
    color: ${p => p.theme.color.subheading.default};
    background-color: ${p => p.theme.background.standard.default};
    font-weight: ${p => p.theme.weight.medium};

    &:has(+ ${InputStyled}:focus-visible) {
        font-weight: ${p => p.theme.weight.semibold};
    }

    span {
        color: ${p => p.theme.color.warning.default};
    }
`

const FileInputStyled = styled.input`
    margin: 1.5vh 0;
    
    letter-spacing: 0.25px;

    font-weight: ${p => p.theme.weight.medium};
    font-family: ${p => p.theme.fontFamily.content};
    
    &::file-selector-button {
        padding: 0.75vh 0.75vw;
        border: none;
        border-radius: 10px;
        margin-right: 0.75vw;

        color: ${p => p.theme.color.subheading.default};
        background-color: ${p => p.theme.background.accent.default};

        font-weight: ${p => p.theme.weight.semibold};
        font-family: ${p => p.theme.fontFamily.content};

        cursor: pointer;

        &:hover {
            background-color: ${p => p.theme.background.accent.hover};
        }
    }
`

interface LabelProp { label? : string }
interface InputProps extends LabelProp, InputHTMLAttributes<HTMLInputElement> {}
interface TextareaProps extends LabelProp, TextareaHTMLAttributes<HTMLTextAreaElement> {}
interface FileInputProps extends InputProps {
    maxFileSize?: number
}

export const Input = (props: InputProps) => {
    const { label, ...p } = props

    return (
        <Container>
            <LabelStyled htmlFor={p.id}>
                {label || p.id}
                {p.required && <span>*</span>}
            </LabelStyled>
            <InputStyled {...p} />
        </Container>
    )
}

export const Textarea = (props: TextareaProps) => {
    const { label, ...p } = props
    
    return (
        <Container>
            <LabelStyled htmlFor={p.id}>
                {label || p.id}
                {p.required && <span>*</span>}
            </LabelStyled>
            <TextareaStyled {...p} />
        </Container>
    )
}

export const FileInput = (props: FileInputProps) => {
    const { label, type, maxFileSize, onChange, ...p } = props

    const validateFileSize = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.files?.length &&
            e.target.files?.length > 0 &&
            maxFileSize
        ) {
            const fileSize = e.target.files?.item(0)?.size

            // If fileSize exceeds limit, CLEAR IT!
            if (fileSize && fileSize > maxFileSize) {
                e.target.value = ""

                alert(`please choose a file smaller than ${Math.round(maxFileSize / (1024 * 1024))} MB!`)
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        validateFileSize(e)
    }

    return (
        <Container>
            <FileInputStyled type={"file"} onChange={handleChange} {...p} />
        </Container>
    )
}