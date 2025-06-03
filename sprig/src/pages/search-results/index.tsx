import styled, { css } from "styled-components"
import Tabs from "../../components/Tabs"
import { useEffect, useState } from "react"
import ScrollContainer from "../../components/ScrollContainer"
import { useNavigate, useParams } from "react-router-dom"
import { sendGetRequest } from "../../fetches/sendGetRequest"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5vh 4vw;
    row-gap: 2.5vh;
`

const Heading = styled.h1`
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.heading.default};
`

const ResultsContainer = styled.div<{ $viewMode: number }>`
    height: 100%;
    display: grid;
    grid-template-columns: ${p => `repeat(${p.$viewMode === 0 ? "4, 1fr" : "6, 10vw"})`};
    grid-template-rows: repeat(auto-fill, 25vh);
    justify-content: space-between;
    column-gap: 2vw;
    row-gap: 2.5vh;
    padding: 2.5vh 5vw;
`

const AlertHeading = styled.h1`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-style: italic;
    font-family: ${p => p.theme.fontFamily.heading};
    color: ${p => p.theme.color.subheading.default};
`

const CardStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 0.5vh;
    text-align: center;
    cursor: pointer;

    h2, h3 {
        font-family: ${p => p.theme.fontFamily.heading};
        text-wrap: pretty;
    }

    h2 {
        font-size: 1.5em;
        font-weight: ${p => p.theme.weight.bold};
        color: ${p => p.theme.color.heading.default};
        transition: color ${p => p.theme.transition.default};

        &:hover { color: ${p => p.theme.color.heading.hover}; }
    }

    h3 {
        font-size: 1.125em;
        font-weight: ${p => p.theme.weight.medium};
        color: ${p => p.theme.color.subheading.default};
        transition: color ${p => p.theme.transition.default};

        &:hover { color: ${p => p.theme.color.subheading.hover}; }
    }
`

const RecipeCardStyled = styled.div`
    ${CardStyles};
    width: 100%;

    img {
        aspect-ratio: 3 / 2;
        max-width: 100%;
    }
`

const UserCardStyled = styled.div`
    ${CardStyles};
    width: 10vw;
    border-radius: 5px;
    background-color: ${p => p.theme.background.standard.default};
    transition: background-color ${p => p.theme.transition.default};

    &:hover {
        background-color: ${p => p.theme.background.standard.hover};
    }

    &:active {
        background-color: ${p => p.theme.background.standard.active};
    }

    img {
        aspect-ratio: 1 / 1;
        width: 7.5vw;
        border-radius: 50%;
    }
`

interface RecipeResult {
    id: string,
    title: string,
    poster: string
    images: Array<string>
}

interface UserResult {
    username: string,
    profilePhoto: string
}

const RecipeCard = (props: RecipeResult) => {
    const navigate = useNavigate()
    const goToRecipe = () => navigate(`/post/${props.id}`)
    const goToPoster = () => navigate(`/profile/${props.poster}`)

    return (
        <RecipeCardStyled>
            <img
                src={props.images[0]}
                alt={`photo of ${props.title}`}
                onClick={goToRecipe}
            />
            <h2 onClick={goToRecipe}>{props.title}</h2>
            <h3 onClick={goToPoster}>@{props.poster}</h3>
        </RecipeCardStyled>
    )
}

const UserCard = (props: UserResult) => {
    const navigate = useNavigate()
    const goToPoster = () => navigate(`/profile/${props.username}`)

    return (
        <UserCardStyled onClick={goToPoster}>
            <img
                src={props.profilePhoto}
                alt={`profile photo of ${props.username}`}
            />
            <h2>{props.username}</h2>
        </UserCardStyled>
    )
}

type SearchResult = Array<RecipeResult> | Array<UserResult>

const SearchResults = () => {
    const { query } = useParams()

    const [searchMode, setSearchMode] = useState(0)
    const [searchResults, setSearchResults] = useState<SearchResult>([])
    const [loading, setLoading] = useState(true)

    const lookupSearchMode = () => {
        switch (searchMode) {
            case 0:
                return "recipe"
            case 1:
                return "user"
            default:
                setSearchMode(0)
                console.error("error with search mode... returning to [Recipes]")
        }
    }

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const data = await sendGetRequest(`/api/search/${lookupSearchMode()}/${query}`)

            if (data.error) {
                console.error("could not fetch post data!", data.error)
            } else {
                console.log(searchResults)
                setSearchResults(data)
                setLoading(false)
            }
        }

        fetchData()
    }, [query, searchMode])

    const defaultPostPhoto = "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
    const defaultProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    return (
        <Container>
            <Heading>showing search results for "{query}"</Heading>
            <Tabs
                items={["Recipes", "Users"]}
                selected={searchMode}
                setSelected={setSearchMode}
                alignSelf="center"
            />
            <ScrollContainer width="92vw" height="63vh">
                <ResultsContainer $viewMode={searchMode}>
                    {
                        loading ?
                            <AlertHeading>loading...</AlertHeading> :
                        searchResults.length <= 0 ?
                            <AlertHeading>{`no ${lookupSearchMode()}s found!`}</AlertHeading> :
                        searchMode === 0 ?
                            searchResults.map(res => {
                                const formattedRes = res as RecipeResult

                                return <RecipeCard
                                    id={formattedRes.id}
                                    title={formattedRes.title}
                                    poster={formattedRes.poster}
                                    images={
                                        formattedRes.images && formattedRes.images.length > 0 ?
                                            formattedRes.images :
                                            [defaultPostPhoto]
                                    }
                                />
                            }) :
                        searchMode === 1 ?
                            searchResults.map(res => {
                                const formattedRes = res as UserResult

                                return <UserCard
                                    username={formattedRes.username}
                                    profilePhoto={formattedRes.profilePhoto || defaultProfilePhoto}
                                />
                            }) :
                        // Wrong search mode!
                            <></>
                    }
                </ResultsContainer>
            </ScrollContainer>
        </Container>
    )
}

export default SearchResults