import {
    Container,
    CreatePostButton,
    FormContainer,
    FormSection,
    Heading,
    NutritionFacts,
    Subheading,
    Subsection,
    Subsubheading
} from "./styled.components"
import { FileInput, Input, Textarea } from "../../components/Input"
import IngredientList from "./IngredientList"
import DirectionList from "./DirectionList"
import ChipHandler from "./ChipHandler"
import ScrollContainer from "../../components/ScrollContainer"
import { FormEvent, useState } from "react"
import Alert from "../../components/Alert"
import { useNavigate } from "react-router-dom"
import { sendPostRequest } from "../../fetches/sendPostRequest"
import { useAuth } from "../../AuthContext"

const CreatePost = () => {
    const [ingredients, setIngredients] = useState<Array<[string, string, string]>>([])
    const [directions, setDirections] = useState<Array<string>>([])
    const [tags, setTags] = useState<Array<string>>([])

    const [showPostCreatedAlert, setShowPostCreatedAlert] = useState(false)

    const navigate = useNavigate()
    const { username } = useAuth()

    const refactorIngredients = (lst: Array<[string, string, string]>) => lst.map(
        // for each item...
        item => ({
            // create an object like this!
            quantity: item[0],
            unit: item[1],
            ingredient: item[2]
        })
    )

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
    
        const post = {
            poster: username,
            title: formData.get("Title"),
            description: formData.get("Description") == "" ? null : formData.get("Description"),
            images: [], // formData.get("PrimaryImage"), formData.get("SecondaryImage")
            calories: formData.get("Calories") == "" ? null : formData.get("Calories"),
            protein: formData.get("Protein") == "" ? null : formData.get("Protein"),
            carbs: formData.get("Carbs") == "" ? null : formData.get("Carbs"),
            fats: formData.get("Fats") == "" ? null : formData.get("Fats"),
            ingredients: refactorIngredients(ingredients),
            directions: directions,
            tags: tags
        }

        const res = await sendPostRequest("/api/posts/add", post)

        if (res.error) {
            console.error("post not found!")
        } else {
            console.log("post created!")

            // Show the alert
            setShowPostCreatedAlert(true)

            // Turn it off after 2s
            setTimeout(() => setShowPostCreatedAlert(false), 2000)

            // Navigate to homepage!
            navigate("/")
        }
    }

    return (
        <ScrollContainer>
            <Container>
                <Heading>Create post!</Heading>
                <FormContainer onSubmit={handleSubmit}>
                    <FormSection>
                        {/* TITLE AND DESCRIPTION */}
                        <Input type={"text"} name={"Title"} label={"Title"} maxLength={50} required />
                        <Textarea name={"Description"} label={"Description"} maxLength={100} />
                    </FormSection>
                    <FormSection>
                        {/* PRIMARY AND SECONDARY IMAGES */}
                        <Subsection>
                            <Subheading>Primary Image</Subheading>
                            <FileInput name={"PrimaryImage"} accept={"image/*"} />
                        </Subsection>
                        <Subsection>
                            <Subsubheading>Secondary Images (optional)</Subsubheading>
                            <FileInput name={"SecondaryImage"} accept={"image/*"} />
                        </Subsection>
                    </FormSection>
                    <FormSection>
                        {/* INGREDIENTS */}
                        <Subheading>Ingredients</Subheading>
                        <IngredientList items={ingredients} setItems={setIngredients} />
                    </FormSection>
                    <FormSection $long={true} $longIndex={5}>
                        {/* DIRECTIONS */}
                        <Subheading>Directions</Subheading>
                        <DirectionList items={directions} setItems={setDirections} />
                    </FormSection>
                    <FormSection>
                        {/* NUTRITION FACTS */}
                        <Subheading>Nutrition Facts</Subheading>
                        <NutritionFacts>
                            <Input type={"number"} name={"Calories"} label={"Calories (kcal)"} maxLength={4} />
                            <Input type={"number"} name={"Protein"} label={"Proteins (g)"} maxLength={4} />
                            <Input type={"number"} name={"Carbs"} label={"Carbs (g)"} maxLength={4} />
                            <Input type={"number"} name={"Fats"} label={"Fats (g)"} maxLength={4} />
                        </NutritionFacts>
                    </FormSection>
                    <FormSection>
                        {/* TAGS */}
                        <Subheading>Tags</Subheading>
                        <ChipHandler tags={tags} setTags={setTags} />
                    </FormSection>
                    <CreatePostButton type="submit">
                        Create post!
                    </CreatePostButton>

                    <Alert label="Post created!" show={showPostCreatedAlert} />
                </FormContainer>
            </Container>
        </ScrollContainer>
    )
}

export default CreatePost