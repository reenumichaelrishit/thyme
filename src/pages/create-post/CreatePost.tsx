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

const CreatePost = () => (
    <ScrollContainer>
        <Container>
            <Heading>Create post!</Heading>
            <FormContainer>
                <FormSection>
                    {/* TITLE AND DESCRIPTION */}
                    <Input type={"text"} id={"Title"} label={"Title"} maxLength={50} required />
                    <Textarea id={"Description"} label={"Description"} maxLength={100} />
                </FormSection>
                <FormSection>
                    {/* PRIMARY AND SECONDARY IMAGES */}
                    <Subsection>
                        <Subheading>Primary Image</Subheading>
                        <FileInput id={"PrimaryImage"} accept={"image/*"} />
                    </Subsection>
                    <Subsection>
                        <Subsubheading>Secondary Images (optional)</Subsubheading>
                        <FileInput id={"SecondaryImage"} accept={"image/*"} />
                    </Subsection>
                </FormSection>
                <FormSection>
                    {/* INGREDIENTS */}
                    <Subheading>Ingredients</Subheading>
                    <IngredientList />
                </FormSection>
                <FormSection $long={true} $longIndex={5}>
                    {/* DIRECTIONS */}
                    <Subheading>Directions</Subheading>
                    <DirectionList />
                </FormSection>
                <FormSection>
                    {/* NUTRITION FACTS */}
                    <Subheading>Nutrition Facts</Subheading>
                    <NutritionFacts>
                        <Input type={"text"} id={"Calories"} label={"Calories (kcal)"} maxLength={4} />
                        <Input type={"text"} id={"Protein"} label={"Proteins (g)"} maxLength={4} />
                        <Input type={"text"} id={"Carbohydrates"} label={"Carbs (g)"} maxLength={4} />
                        <Input type={"text"} id={"Fats"} label={"Fats (g)"} maxLength={4} />
                    </NutritionFacts>
                </FormSection>
                <FormSection>
                    {/* TAGS */}
                    <Subheading>Tags</Subheading>
                    <ChipHandler />
                </FormSection>
                <CreatePostButton type="submit">
                    Create post!
                </CreatePostButton>
            </FormContainer>
        </Container>
    </ScrollContainer>
)

export default CreatePost