import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../components/Input"
import { AddButton, IngredientContainer, RemoveButton } from "./styled.components"
import { X } from "@phosphor-icons/react"

// type IngredientType = {
//     id: number;
//     values: [string, string, string];
// }

interface IngredientProps {
    keyID: number;
    remove: () => void;
    currItem: any;
    allItems: any;
    setItems: Dispatch<SetStateAction<any>>;
    handleChange: any;
}

const labelLookup = (index: number) => (index == 0 ? "Qty" : index == 1 ? "Unit" : "Ingredient")

const Ingredient = ({ keyID, remove, currItem, allItems, setItems, handleChange } : IngredientProps) => {
    return (
        <IngredientContainer>
            {currItem.values.map((item: string, index: number) => (
                <Input
                    type={"text"}
                    id={`Ingredient-${keyID}-${labelLookup(index)}`}
                    label={labelLookup(index)}
                    maxLength={50}
                    value={item}
                    onChange={e => handleChange(keyID, index, e.target.value, allItems, setItems)}
                    key={`Ingredient-${keyID}-${labelLookup(index)}`}
                />
            ))}
            <RemoveButton type={"button"} onClick={remove}>
                <X size={16} />
            </RemoveButton>
        </IngredientContainer>
    )
}

const IngredientList = () => {
    const createNewItem = (id: number) => ({
        id: id,
        values: ["", "", ""]    // Representing "qty", "unit", "ingredient"
    })

    const [items, setItems] = useState([createNewItem(0)])

    const removeItem = (index: number) => setItems(items.filter(item => item.id != index))

    const handleChange = (
        id: number,
        keyIndex: number,
        newValue: string,
        arr: any,
        setArr: Dispatch<SetStateAction<any>>
    ) => setArr(
        arr.map(
            // If ID of item is the ID we want to change...
            (item: any) => item.id == id ?
                {
                    ...item,
                    values: item.values.map((value: string, index: number) => (
                        // If ID of value is the one we want to change...
                        index == keyIndex ?
                            // Change it!
                            newValue :
                            // Else, keep old value!
                            value
                    ))
                } :
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
                    allItems={items}
                    setItems={setItems}
                    handleChange={handleChange}
                />
            ))}
            <AddButton type="button" onClick={() => setItems([...items, createNewItem(items.length)])}>
                + Add ingredient
            </AddButton>
        </>
    )
}

export default IngredientList