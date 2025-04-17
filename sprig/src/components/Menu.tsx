import { ReactNode, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const MenuStyled = styled.div`
    width: max-content;
    height: auto;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 10vh;
    right: 2.5vh;
    padding: 1vh 0;
    border-radius: 7.5px;
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    box-shadow: 0px 2.5px 2.5px ${p => p.theme.color.standard.default + "30"};
    z-index: 998;
`

const MenuItem = styled.div`
    padding: 1vh 2.5vw;
    padding-left: 1vw;
    cursor: pointer;
    font-size: 1.125em;
    font-family: ${p => p.theme.fontFamily.heading};
`

const MenuItemLink = styled(Link)`
    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.theme.background.standard.default};
    transition: all ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }

    &:active {
        color: ${p => p.theme.color.standard.active};
        background-color: ${p => p.theme.background.standard.active};
    }
`

interface MenuProps {
    view: boolean,
    items: Array<[ReactNode, string]>
}

const Menu = (props: MenuProps) => {
    const [hovering, setHovering] = useState(false)
    const startHovering = () => setHovering(true)
    const stopHovering = () => setHovering(false)

    return props.view || hovering ? (
        <MenuStyled
            onMouseEnter={startHovering}
            onMouseLeave={stopHovering}
        >
            {props.items.map((item, index) => {
                return item[1] !== "" ? (
                    <MenuItemLink to={item[1]}>
                        <MenuItem key={"MenuItem-" + index} onClick={stopHovering}>
                            {item[0]}
                        </MenuItem>
                    </MenuItemLink>
                ) : (
                    <MenuItem key={"MenuItem-" + index}>{item[0]}</MenuItem>
            )})}
        </MenuStyled>
    ) : <></>
}

export default Menu