import { ActionIcon } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"

const FavoriteButton = () => {
    return (
        <ActionIcon variant="default" radius="md" size={36}>
            <IconHeart onClick={() => console.log('Шершень')} stroke={1.5} />
        </ActionIcon>
    )
}

export {FavoriteButton}