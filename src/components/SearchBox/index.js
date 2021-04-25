import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './index.css'

const SearchBox = props => {
    const [searchText, setSearchText] = useState("")
    return (
        <input id={'search-input'} value={searchText} onChange={e => setSearchText(e.target.value)} defaultValue={props.defaultValue}
               className={'search-box'} placeholder={'Type something to search'} onKeyDown={e => {
            if (e.code === "Enter") {
                props.onSubmit && props.onSubmit(searchText)
            }
        }}/>
    );
};

SearchBox.propTypes = {
    defaultValue: PropTypes.string,
    onSubmit: PropTypes.func,
};

export default SearchBox;
