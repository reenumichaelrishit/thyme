import { useState } from "react"
import Chips from "../../components/Chips"
import { ChipsContainer, ChipSection, Subsubheading } from "./styled.components"

const ChipHandler = () => {
    const [tags, setTags] = useState<Array<string>>([])
    const pushToTags = (newValue: string) => setTags([...tags, newValue])
    const popFromTags = (oldValue: number) => setTags(tags.filter((_tag, index) => index !== oldValue))

    return (
        <ChipsContainer>
            {/* SEARCH FOR TAGS. */}
            <ChipSection>
                <Subsubheading>Search for more tags!</Subsubheading>
                <span>Search!</span>
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