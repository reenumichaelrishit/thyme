import styled from "styled-components"
import Tabs from "../../components/Tabs"
import { useState } from "react"
import PhotoWindow from "../../components/PhotoWindow"
import ScrollContainer from "../../components/ScrollContainer"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5vh 2.5vw;
    row-gap: 2.5vh;
`

const Heading = styled.h1`
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
`

const ResultsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`

const SearchResults = () => {
    const [searchMode, setSearchMode] = useState(0)

    // CHANGE THIS LATER!!!
    const [showRes, setShowRes] = useState(false)
    const makeResults = () => {
        let results = <></>

        for (let i = 1; i <= 25; i++) {
            results = (
                <>
                    {results}
                    <PhotoWindow title={(searchMode == 0 ? "Recipe" : "Account") + " no. " + i} />
                </>
            )
        }

        return results
    }
    const switchView = () => {
        if (showRes) {
            return (
                <ScrollContainer width="95vw" height="60vh">
                    <ResultsContainer>
                        {makeResults()}
                    </ResultsContainer>
                </ScrollContainer>
            )
        } else {
            return <button type="button" onClick={() => setShowRes(true)}>press for results (not final, just for now)</button>
        }
    }

    return (
        <Container>
            <Heading>showing search results for "query"</Heading>
            <Tabs
                items={["Recipes", "Accounts"]}
                selected={searchMode}
                setSelected={setSearchMode}
                alignSelf="center"
            />
            {switchView()}
        </Container>
    )
}

export default SearchResults