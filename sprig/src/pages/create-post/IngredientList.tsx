import { Dispatch, SetStateAction } from "react";
import { Input } from "../../components/Input"
import { AddButton, IngredientContainer, RemoveButton } from "./styled.components"
import { X } from "@phosphor-icons/react"

interface IngredientProps {
    keyID: number;
    remove: () => void;
    currItem: any;
    handleChange: any;
}

const labelLookup = (index: number) => (index == 0 ? "Qty" : index == 1 ? "Unit" : "Ingredient")

const Ingredient = ({ keyID, remove, currItem, handleChange } : IngredientProps) => {
    return (
        <IngredientContainer>
            {currItem.map((item: string, index: number) => (
                <Input
                    type={"text"}
                    label={labelLookup(index)}
                    maxLength={50}
                    value={item}
                    onChange={e => handleChange(keyID, index, e.target.value)}
                    key={`Ingredient-${keyID}-${labelLookup(index)}`}
                />
            ))}
            <RemoveButton type={"button"} onClick={remove}>
                <X size={16} />
            </RemoveButton>
        </IngredientContainer>
    )
}

const IngredientList = ({ items, setItems } : {
    items: Array<[string, string, string]>,
    setItems: Dispatch<SetStateAction<Array<[string, string, string]>>>
}) => {
    const removeItem = (indexToRemove: number) => setItems(items.filter((_item, index) => index != indexToRemove))

    const handleChange = (
        id: number,
        keyIndex: number,
        newValue: string
    ) => setItems(
        items.map(
            // If ID of item is the ID we want to change...
            (item: any, index: any) => index == id ?
                item.map((value: string, subIndex: number) => (
                    // If ID of value is the one we want to change...
                    subIndex == keyIndex ?
                        // Change it!
                        newValue :
                        // Else, keep old value!
                        value
                )) :

                // Else, keep old item!
                item
        )
    )

    return (
        <>
            {items.map((item, index) => (
                <Ingredient
                    key={`Ingredient-${index}`}
                    keyID={index}
                    remove={() => removeItem(index)}
                    currItem={item}
                    handleChange={handleChange}
                />
            ))}
            <AddButton type="button" onClick={() => setItems([...items, ["", "", ""]])}>
                + Add ingredient
            </AddButton>
        </>
    )
}

export default IngredientList