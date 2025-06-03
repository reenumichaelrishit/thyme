import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Post from "../../components/Post"
import ScrollContainer from "../../components/ScrollContainer"
import { sendGetRequest } from "../../fetches/sendGetRequest"

const PostContainer = styled.div`
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2.5vh 0;
    background-color: ${p => p.theme.background.backdrop.default};
`

const ViewPost = () => {
    const { postID } = useParams()
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState({
        id: "",
        created_at: "",
        poster: "",
        title: "",
        description: "",
        directions: [],
        ingredients: [],
        images: [],
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        Likes: [],
        Comments: [],
        SavedPosts: [],
        Tags: [],
        Users: {
            username: "",
            profilePhoto: ""
        }
    })

    const [refreshValue, setRefreshValue] = useState(false)
    const refresh = () => setRefreshValue(!refreshValue)

    useEffect(() => {
        const fetchData = async () => {
            const data = await sendGetRequest(`/api/posts/get/${postID}`)

            if (data.error) {
                console.error("could not fetch post data!", data.error)
            } else {
                setPostData(data)
                setLoading(false)
            }
        }

        fetchData()
    }, [refreshValue])

    return (
        <ScrollContainer>
            <PostContainer>
                {loading ?
                    <span>Loading...</span> :
                    <Post {...postData} view="detailed" refresh={refresh} />}
            </PostContainer>
        </ScrollContainer>
    )
}

export default ViewPost
