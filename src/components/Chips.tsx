import styled from "styled-components"
import { Plus, X } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

const chipTypes = ["readonly", "add", "remove"] as const
type ChipType = typeof chipTypes[number]

interface ChipProps {
    label: string,
    onClickFn: () => void
}

interface ChipsProps {
    initialLabels: Array<string>,
    mode: number, // If 0, it is view mode. If 1, it is add mode.
    append?: (value: string) => void // Required for add mode
    remove?: (index: number) => void
}

const ChipsContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    row-gap: 1em;
    column-gap: 1em;
    flex-wrap: wrap;
`

const ChipStyled = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.25em;
    padding: 0.5em 0.75em;
    border-radius: 10px;
    font-size: 1em;
    // font-weight: ${p => p.theme.weight.medium};
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.standard.default};
    background-color: #93D2AA;
`

const IconWrapper = styled.button`
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    padding: 2.5px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #93D2AA;

    &:hover {
        background-color: #7EC999;
    }
`

const PlusStyled = styled(Plus)`
    color: ${p => p.theme.color.standard.default};
`

const XStyled = styled(X)`
    color: ${p => p.theme.color.standard.default};
`

/* MAKE PLUS CHIP TOO BHADWE -- diff color schema? */
const Chip = ({ label, onClickFn } : ChipProps) => {
    let closeTag = () => {}
    let addTag = () => {}

    return (
        <ChipStyled>
            <IconWrapper type="button" onClick={onClickFn}>
                <XStyled size={12} />
            </IconWrapper>
            <span>{label}</span>
        </ChipStyled>
    )
}

const Chips = ({ initialLabels, mode, append, remove } : ChipsProps) => {
    const [labels, setLabels] = useState(initialLabels)

    mode == 0 && useEffect(() => setLabels(initialLabels.filter((e, i, a) => a.indexOf(e) === i)), [initialLabels])

    const removeFromLabels = (removed: number) => {
        remove && remove(removed)
        setLabels(labels.filter((label, index) => index !== removed))
    }

    return (
        <ChipsContainer>
            {labels.map((label, index) => (
                <Chip
                    label={label}
                    key={`Chip-${index}`}
                    onClickFn={
                        mode == 0 ?
                            () => removeFromLabels(index) :
                            () => {
                                append && append(labels[index])
                                removeFromLabels(index)
                            }
                    }
                />
            ))}
        </ChipsContainer>
    )
}

export default Chips