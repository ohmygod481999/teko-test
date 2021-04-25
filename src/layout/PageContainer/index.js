import React from 'react';
import PropTypes from 'prop-types';
import './index.css'

const PageContainer = props => {
    return (
        <div className={'page-container'}>
            {props.children}
        </div>
    );
};

PageContainer.propTypes = {

};

export default PageContainer;
