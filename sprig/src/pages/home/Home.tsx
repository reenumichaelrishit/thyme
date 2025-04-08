import styled from "styled-components"
import FeedPost from "../../components/FeedPost.tsx"

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5vh 0;
    row-gap: 1.5vh;
`

const Home = () => (
    <PostContainer>
        <FeedPost posterUsername="micharl_monty" title="pasta e ceci" desc="old family recipe of chickpea and pasta from my meemaw old family recipe of chickpea and pasta from my meemaw old family recipe of chickpea and pasta from my meemaw" notFollowing={true} postImageLink=""/>
        <FeedPost posterUsername="micharl_monty" title="pasta e ceci" desc="old family recipe of chickpea and pasta from my meemaw" notFollowing={true} postImageLink="https://www.seriouseats.com/thmb/ienu8BPyuK5gaAF_6NeZOwqC_Qo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__03__20210301-pasta-e-ceci-andrew-janjigian-27-a27ac28ff4984a72b09860ed0a14df4a.jpg"/>
    </PostContainer>

)

export default Home