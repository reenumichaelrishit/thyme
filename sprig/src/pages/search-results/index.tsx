import Tabs from "../../components/Tabs"
import { useEffect, useState } from "react"
import ScrollContainer from "../../components/ScrollContainer"
import { useNavigate, useParams } from "react-router-dom"
import { sendGetRequest } from "../../fetches/sendGetRequest"
import { RecipeCardStyled, UserCardStyled, Container, Heading, ResultsContainer, AlertHeading, SortFilterContainer, ResultsContainerWrapper, SortFilterHeading, RadioButtonContainer, RadioButton } from "./styled.components"

interface RecipeResult {
    id: string,
    title: string,
    poster: string,
    images: Array<string>,
    created_at: string,
    Likes: [{ count: number }],
    SavedPosts: [{ count: number }]
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

const sortOptions = ["newest first", "oldest first", "most liked", "most saved"]

type SearchResult = Array<RecipeResult> | Array<UserResult>
const SearchResults = () => {
    const { query } = useParams()

    const [searchMode, setSearchMode] = useState(0)
    const [searchResults, setSearchResults] = useState<SearchResult>([])
    const [loading, setLoading] = useState(true)
    const [sortMode, setSortMode] = useState(sortOptions[0])

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

    const lookupSortMode = () => {
        switch (sortMode) {
            case sortOptions[0]:
                return (a: RecipeResult, b: RecipeResult) => Date.parse(b.created_at) - Date.parse(a.created_at)
            case sortOptions[1]:
                return (a: RecipeResult, b: RecipeResult) => Date.parse(a.created_at) - Date.parse(b.created_at)
            case sortOptions[2]:
                return (a: RecipeResult, b: RecipeResult) => b.Likes[0].count - a.Likes[0].count
            case sortOptions[3]:
                return (a: RecipeResult, b: RecipeResult) => b.SavedPosts[0].count - a.SavedPosts[0].count
            default:
                setSortMode(sortOptions[0])
                console.error("error with sort mode... returning to [newest first]")
        }
    }

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const data = await sendGetRequest(`/api/search/${lookupSearchMode()}/${query}`)

            if (data.error) {
                console.error("could not fetch search results!", data.error)
            } else {
                if (lookupSearchMode() == "recipe") {
                    data.sort(lookupSortMode())
                }

                setSearchResults(data)
                setLoading(false)
            }
        }

        fetchData()
    }, [query, searchMode, sortMode])

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
            <ResultsContainerWrapper>
                {lookupSearchMode() == "recipe" ?
                <SortFilterContainer>
                    <div>
                        <SortFilterHeading>sort!</SortFilterHeading>
                        {sortOptions.map(sortOption =>
                            <RadioButtonContainer onClick={() => setSortMode(sortOption)}>
                                <RadioButton
                                    type={"radio"}
                                    value={sortOption}
                                    checked={sortMode == sortOption}
                                    onChange={e => setSortMode(e.target.value)}
                                    name={sortOption}
                                    disabled={searchMode !== 0}
                                />
                                <label htmlFor={sortOption}>{sortOption}</label>
                            </RadioButtonContainer>
                        )}
                    </div>
                    {/* <div>
                        <SortFilterHeading>filter!</SortFilterHeading>
                    </div> */}
                </SortFilterContainer>
                : <></>}
                <ScrollContainer width="92vw" height="63vh">
                    <ResultsContainer $viewMode={searchMode}>
                        {
                            loading ?
                                <AlertHeading>loading...</AlertHeading> :
                            searchResults.length <= 0 ?
                                <AlertHeading>{`no ${lookupSearchMode()}s found!`}</AlertHeading> :
                            searchMode === 0 ?
                                searchResults.map(res => {
                                    const {images, ...rest} = res as RecipeResult

                                    return <RecipeCard
                                        images={
                                            images && images.length > 0 ?
                                                images :
                                                [defaultPostPhoto]
                                        }
                                        {...rest}
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
            </ResultsContainerWrapper>
        </Container>
    )
}

export default SearchResults