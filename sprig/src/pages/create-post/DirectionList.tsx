import { Dispatch, SetStateAction } from "react";
import { Input } from "../../components/Input"
import { AddButton, DirectionContainer, RemoveButton } from "./styled.components"
import { X } from "@phosphor-icons/react"

interface IngredientProps {
    keyID: number;
    remove: () => void;
    allItems: any;
    setItems: Dispatch<SetStateAction<any>>;
    handleChange: any;
}

const Direction = ({ keyID, remove, allItems, setItems, handleChange } : IngredientProps) => {
    return (
        <DirectionContainer>
            <Input
                type={"text"}
                id={`Direction-${keyID}`}
                label={`${keyID + 1}`}
                maxLength={100}
                value={allItems[keyID]}
                onChange={e => handleChange(keyID, e.target.value, allItems, setItems)}
            />
            <RemoveButton type={"button"} onClick={remove}>
                <X size={16} />
            </RemoveButton>
        </DirectionContainer>
    )
}

const DirectionList = ({ items, setItems } : {
    items: Array<string>,
    setItems: Dispatch<SetStateAction<Array<string>>>
}) => {
    const removeItem = (index: number) => setItems(items.slice(0, index).concat(items.slice(index + 1)))
    const handleChange = (
        id: number,
        newValue: string,
        arr: any,
        setArr: Dispatch<SetStateAction<any>>
    ) => setArr(
        arr.map((item: any, index: number) => index == id ? newValue : item)
    )

    return (
        <>
            {items.map((_item, index) => (
                <Direction
                    key={`Direction-${index}`}
                    keyID={index}
                    remove={() => removeItem(index)}
                    allItems={items}
                    setItems={setItems}
                    handleChange={handleChange}
                />
            ))}
            <AddButton type="button" onClick={() => setItems([...items, ""])}>
                + Add direction
            </AddButton>
        </>
    )
}

export default DirectionList