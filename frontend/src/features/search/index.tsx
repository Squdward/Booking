import { useUnit } from "effector-react";
import { FC } from "react";
import { $isLoading, $searchResult, searchChange } from "./model";
import { CustomCombobox } from "../../shared/ui/search";

const HeaderSearch: FC<{
    className: string;
}> = (props) => {
    const [data, onChange, isLoading] = useUnit([
        $searchResult,
        searchChange,
        $isLoading,
    ]);

    return (
        <CustomCombobox
            onInputChange={onChange}
            // options={[
            //     {
            //         label: "1",
            //         value: "2",
            //         fullname: "string",
            //     },
            //     {
            //         label: "3",
            //         value: "1",
            //         fullname: "stasadg",
            //     },
            // ]}
            options={['15', '12', '123']}
        />
    );
};

export { HeaderSearch };
