import styled from "styled-components"
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { FormEvent } from "react"

const Bar = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 0.5vw;

    padding: 1.5vh 1vw;
    border-radius: 15px;

    color: ${p => p.theme.color.heading.default};
    background-color: ${p => p.theme.background.accent.default};

    & > * { &:first-child, &:last-child { width: 1.5vw; }}
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

const SearchButton = styled.button`
    aspect-ratio: 1 / 1;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: ${p => p.theme.color.heading.default};
    background-color: ${p => p.theme.background.accent.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.accent.hover};
    }

    &:active {
        background-color: ${p => p.theme.background.accent.active};
    }
`

const SearchBar = () => {
    const navigate = useNavigate()

    const submitSearch = (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const query = formData.get("query")

        navigate(`/search-results/${query}`)
    }

    return (
        <>
            <Bar onSubmit={submitSearch}>
                <MagnifyingGlass size={16} weight={"bold"} />
                <SearchInput
                    type="text"
                    name="query"
                />
                <SearchButton type="submit">
                    <ArrowRight size={16} weight={"bold"} />
                </SearchButton>
            </Bar>
        </>
    )
}

export default SearchBar