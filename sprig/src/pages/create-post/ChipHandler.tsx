import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import Chips from "../../components/Chips"
import { AddTagButton, AddTagsForm, ChipsContainer, ChipSection, Subsubheading } from "./styled.components"
import { Input } from "../../components/Input"
import { ListPlus } from "@phosphor-icons/react"

const ChipHandler = ({ tags, setTags } : {
    tags: Array<string>,
    setTags: Dispatch<SetStateAction<Array<string>>>
}) => {
    const pushToTags = (newValue: string) => setTags([...tags, newValue])
    const popFromTags = (oldValue: number) => setTags(tags.filter((_tag, index) => index !== oldValue))

    const [newTag, setNewTag] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)
    const handleSubmit = () => {
        pushToTags(newTag)
        setNewTag("")
    }

    return (
        <ChipsContainer>
            {/* SEARCH FOR TAGS. */}
            <ChipSection>
                <Subsubheading>Add more tags!</Subsubheading>
                <AddTagsForm>
                    <Input type={"text"} label={"tag name"} name={"tag"} value={newTag} onChange={handleChange} />
                    <AddTagButton type="button" onClick={handleSubmit}>
                        <ListPlus size={24} />
                    </AddTagButton>
                </AddTagsForm>
            </ChipSection>
            {/* SELECTED TAGS. */}
            <ChipSection>
                <Subsubheading>Selected tags</Subsubheading>
                {tags.length < 1 ?
                    <span>(Choose a tag!)</span> :
                    <Chips
                        mode={0}
                        initialLabels={tags}
                        remove={popFromTags}
                    />}
            </ChipSection>
            {/* SUGGESTED TAGS. */}
            <ChipSection>
                <Subsubheading>Suggested tags</Subsubheading>
                <Chips
                    mode={1}
                    initialLabels={["Vegetarian", "Gluten-Free", "Vegan", "No Nuts"]}
                    append={pushToTags}
                />
            </ChipSection>
        </ChipsContainer>
    )
}

export default ChipHandler