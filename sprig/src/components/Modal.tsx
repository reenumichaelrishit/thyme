import styled from "styled-components"
import { X } from "@phosphor-icons/react"
import { MouseEventHandler, useState } from "react"
import Tabs from "./Tabs"

const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000BB;
    z-index: 999;
`

const ModalWindow = styled.div`
    width: 75vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: flex-start;
    row-gap: 2.5vh;
    padding: 5vh 3vw;
    border-radius: 10px;
    background-color: ${p => p.theme.background.backdrop.default};
`

const CloseButton = styled(X)`
    position: absolute;
    top: 8.5vh;
    right: 13vw;

    padding: 5px;
    border: none;
    border-radius: 50%;
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.backdrop.default};
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.background.backdrop.hover};
    }
`

const Heading = styled.h1`
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
`

interface ModalProps {
    show: boolean,              // Controls whether or not to show the Modal
    turnOff: MouseEventHandler  // Function for closing the Modal
}

const Modal = (p: ModalProps) => {
    const [sm, setSm] = useState<number>(1)
    return p.show ? (
        <ModalContainer onClick={p.turnOff}>
            <ModalWindow>
                <CloseButton size={32} onClick={p.turnOff} />
                <Heading>showing search results for "query"</Heading>
                <Tabs items={["Recipes", "Accounts"]} selected={sm} setSelected={setSm} alignSelf="center"/>
            </ModalWindow>
        </ModalContainer>
    ) : <></>
}

export default Modal