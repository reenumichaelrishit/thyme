import styled, { keyframes } from "styled-components"

const EnterAnimation = keyframes`
    0% { bottom: -6vh; }
    40% { bottom: 7.5%; }
    70% { bottom: 7.5%; }
    100% { bottom: -6vh; }
`

const AlertBubble = styled.div`
    width: 12.5vw;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 50%;
    bottom: -6vh;
    transform: translateX(-50%);
    border-radius: 20px;
    color: ${p => p.theme.color.heading.default};
    background-color: ${p => p.theme.background.accent.default};
    font-size: 1rem;
    font-family: ${p => p.theme.fontFamily.heading};
    font-weight: ${p => p.theme.weight.medium};
    animation: ${EnterAnimation} 1.5s;
    z-index: 999;
`

interface AlertProps {
    show: boolean,
    label: string
}

const Alert = (props: AlertProps) => {
    return props.show ? (
        <AlertBubble>
            {props.label}
        </AlertBubble>
    ) : <></>
}

export default Alert