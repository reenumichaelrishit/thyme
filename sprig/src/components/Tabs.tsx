import { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { Check } from "@phosphor-icons/react"

const TabStyled = styled.button<{ $selected : boolean }>`
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    column-gap: 5px;

    padding: 1vh 1vw;
    border: none;
    border-radius: 8px;

    cursor: pointer;
    font-size: 1em;
    font-family: ${p => p.theme.fontFamily.heading};
    font-weight: ${p => p.theme.weight.medium};

    color: ${p => p.theme.color.standard.default};
    background-color: ${p => p.$selected ?
        p.theme.background.accent.active :
        p.theme.background.accent.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.accent.hover};
    }
`

const TabsContainer = styled.div<{ $alignSelf : string }>`
    align-self: ${p => p.$alignSelf};
    width: fit-content;
    display: flex;
    column-gap: 10px;
`

interface TabProps {
    name: string,
    selected: boolean,
    onClick: () => void
}

interface TabsProps {
    items: Array<string>,
    selected: number,
    setSelected: Dispatch<SetStateAction<number>>,
    alignSelf?: string
}

const Tab = ({ name, selected, onClick }: TabProps) => (
    <TabStyled type={"button"} $selected={selected} onClick={onClick}>
        <Check
            size={18}
            weight={"bold"}
            style={{ display: selected ? "block" : "none" }}
        />
        <span>{name}</span>
    </TabStyled>
)

const Tabs = ({ items, selected, setSelected, alignSelf }: TabsProps) => (
    <TabsContainer $alignSelf={alignSelf || "auto"}>
        {items.map((name, index) => {
            return (
                <Tab
                    name={name}
                    key={`Tab-${index}`}
                    selected={selected == index}
                    onClick={() => setSelected(index)}
                />
            )
        })}
    </TabsContainer>
)

export default Tabs