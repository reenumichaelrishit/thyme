import { ReactNode } from "react"
import styled from "styled-components"

const ToggleContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p => p.theme.color.standard.default};
`

const ToggleBar = styled.div`
    width: 45px;
    height: 26px;
    position: relative;
    padding: 1px;
    border-radius: 99px;
    margin: 0 0.5vw;
    cursor: pointer;
    background-color: ${p => p.theme.background.accent.default};
    transition: background-color ${p => p.theme.transition.default};
    
    &:hover {
        background-color: ${p => p.theme.background.accent.hover};
    }
`

const Thumb = styled.div<{ $toggled : boolean }>`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: ${p => p.$toggled ? "22px" : "3px"};
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: ${p => p.theme.background.standard.default};
    transition: left ${p => p.theme.transition.default};
`

interface ToggleProps {
    toggled: boolean,
    toggle: () => void,
    leftSlot?: ReactNode,
    rightSlot?: ReactNode
}

// STATE IS NOT SAVED UNLESS IT IS PASSED? CHECK!s
const Toggle = (props: ToggleProps) => (
    <ToggleContainer>
        {props.leftSlot && props.leftSlot}
        <ToggleBar onClick={props.toggle}>
            <Thumb $toggled={props.toggled} />
        </ToggleBar>
        {props.rightSlot && props.rightSlot}
    </ToggleContainer>
)

export default Toggle