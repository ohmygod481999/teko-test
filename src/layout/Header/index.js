import React from 'react';
import PropTypes from 'prop-types';
import './index.css'

const Header = props => {
    return (
        <div className={'header'}>
            <div className={'logo'}>
                Matthew computers.
            </div>
            <ul className="nav">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    );
};

Header.propTypes = {

};

export default Header;
