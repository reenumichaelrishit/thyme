import styled from "styled-components"
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react"
// import Modal from "./Modal"
// import { MouseEventHandler, useState } from "react"
import { Link } from "react-router-dom"

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 0.5vw;

    padding: 1.5vh 1vw;
    border-radius: 15px;

    color: ${p => p.theme.color.heading.default};
    background-color: ${p => p.theme.background.accent.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.accent.hover};
    }
`

const SearchInput = styled.input`
    border: none;
    border-bottom: 2px solid ${p => p.theme.color.subheading.default};

    font-size: 1.125em;
    font-weight: ${p => p.theme.weight.medium};
    font-family: ${p => p.theme.fontFamily.heading};
    letter-spacing: 0.25px;

    color: ${p => p.theme.color.heading.default};
    background: none;
    transition: border-color ${p => p.theme.transition.default};

    &:focus-within {
        outline: none;
        border-color: ${p => p.theme.color.heading.default};
    }
`

const SearchButton = styled(ArrowRight)`
    cursor: pointer;
    color: ${p => p.theme.color.heading.default};
`

const SearchBar = () => {
    // const [searchRes, setSearchRes] = useState(false)
    // const openSearchRes = () => setSearchRes(true)
    // const closeSearchRes : MouseEventHandler = (e) => { if (e.target === e.currentTarget) setSearchRes(false) }

    return (
        <>
            {/* <Modal show={searchRes} turnOff={closeSearchRes} /> */}
            <Bar>
                <MagnifyingGlass size={16} weight={"bold"} />
                <SearchInput
                    type="text"
                />
                <Link to="/search-results">
                    {/* TODO: TO-DO: MAKE A SUBMIT BUTTON HERE */}
                    <SearchButton size={16} weight={"bold"} />
                </Link>
            </Bar>
        </>
    )
}

export default SearchBar