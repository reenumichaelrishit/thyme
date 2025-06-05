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

    const convertImageToDataURI = async (image: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
                // Converting to WEBP
                const img = new Image()

                img.onload = () => {
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")

                    canvas.width = img.width * 0.75
                    canvas.height = img.height * 0.75

                    ctx?.drawImage(img, 0, 0, img.width, img.height)

                    const WEBPURI = canvas.toDataURL("image/webp", 0.5)

                    resolve(WEBPURI)
                }

                img.onerror = () => reject

                img.src = reader.result as string
            }

            reader.onerror = () => reject

            reader.readAsDataURL(image)
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const imageUpload = formData.get("ImageUpload")
        const imageLink = formData.get("ImageLink")

        const images =
            imageLink ?
                [imageLink] :
            imageUpload ?
                [await convertImageToDataURI(imageUpload as File)] :
            // There is no image.
                []
    
        const post = {
            poster: username,
            title: formData.get("Title"),
            description: formData.get("Description") == "" ? null : formData.get("Description"),
            images: images,
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
            console.error("post was unable to be created!")
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
                        {/* COVER IMAGE */}
                        <Subsection>
                            <Subheading>Cover Image</Subheading>
                            {/* FILE UPLOAD OPTION */}
                            <Subsubheading>Upload an image!</Subsubheading>
                            <FileInput name={"ImageUpload"} accept={"image/*"} maxFileSize={1024 * 1024 * 0.5} />
                            {/* FILE LINK OPTION */}
                            <Subsubheading>Alternatively, post a link!</Subsubheading>
                            <Input type={"url"} name={"ImageLink"} label={"Link"} pattern={"(http|https):\/\/.*\.(jpg|jpeg|png|gif|webp|svg)"} />
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