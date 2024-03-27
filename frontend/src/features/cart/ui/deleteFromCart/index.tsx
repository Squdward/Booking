import { ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { useUnit } from "effector-react"
import { FC } from "react"
import { ICartResponse } from "../../../../types/cart"
import { removeFromCart } from "../../../../store/cart/model"

const DeleteFromCartButton:FC<{productId: ICartResponse['_id']}> = ({productId}) => {
    const onClick = useUnit(removeFromCart);

    const onClickHandler = () => {
        const answer = window.confirm("Вы уверены что хотите удалить этот товар из корзины?")
        
        answer && onClick(productId)
    }

    return (
        <ActionIcon onClick={onClickHandler} variant="default" radius="md" size={36}>
            <IconTrash stroke={1.5}/>
        </ActionIcon>
    )
}

export {DeleteFromCartButton}