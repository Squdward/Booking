import { useUnit } from "effector-react";
import { checkAuth } from "../../../store/user/model";
import { useEffect } from "react";
import { getGenres } from "../../../view/sidebar/model";

const useAppInit = () => {
    const [touch, getSidebarMenuLinks] = useUnit([checkAuth, getGenres]);

    useEffect(() => {
      touch()
      getSidebarMenuLinks()
    }, [])
}

export {useAppInit}