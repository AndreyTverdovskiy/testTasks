import React, {ChangeEvent} from "react";

type searchPropsType = {
    searchValue: string,
    setSearchValue: (value: string) => void
}

const Search = React.memo((props: searchPropsType) => {

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        props.setSearchValue(e.target.value)
    }
    return (
        <div>
            <input value={props.searchValue}
                   onChange={onChangeValue}
                   placeholder='Title to search'
            />
        </div>
    )
})
export default Search