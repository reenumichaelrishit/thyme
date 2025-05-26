import styled from "styled-components"
import Post from "../../components/Post"
import ScrollContainer from "../../components/ScrollContainer.tsx"
import { useEffect, useState } from "react"
import { sendGetRequest } from "../../fetches/sendGetRequest.tsx"

const PostsContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5vh 0;
    row-gap: 1.5vh;
    background-color: ${p => p.theme.background.backdrop.default};
`

const Home = () => {
    const [postsData, setPostsData] = useState<Array<any>>([])
    const [refreshValue, setRefreshValue] = useState(false)
    const refresh = () => setRefreshValue(!refreshValue)

    useEffect(() => {
        const fetchData = async () => {
            const data = await sendGetRequest("/api/posts/get")

            if (data.error) {
                console.error("could not fetch post data!", data.error)
            } else {
                setPostsData(data)
            }
        }

        fetchData()
    }, [refreshValue])

    return (
        <ScrollContainer>
            <PostsContainer>
                {/* <Post poster="micharl_monty" title="pasta e ceci" desc="old family recipe of chickpea and pasta from my meemaw old family recipe of chickpea and pasta from my meemaw old family recipe of chickpea and pasta from my meemaw" notFollowing={true} postImageLink=""/>
                <Post poster="micharl_monty" title="pasta e ceci" desc="old family recipe of chickpea and pasta from my meemaw" notFollowing={true} postImageLink="https://www.seriouseats.com/thmb/ienu8BPyuK5gaAF_6NeZOwqC_Qo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__03__20210301-pasta-e-ceci-andrew-janjigian-27-a27ac28ff4984a72b09860ed0a14df4a.jpg"/> */}
                {postsData.map(postData =>
                    <Post {...postData} refresh={refresh} />
                )}
            </PostsContainer>
        </ScrollContainer>

    )
}

export default Home