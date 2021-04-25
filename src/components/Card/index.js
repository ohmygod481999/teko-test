import React from 'react';
import PropTypes from 'prop-types';
import './index.css'

const getHighLightTitle = (title, highLightIndexes) => {
    let result = ""
    let temp = 0
    highLightIndexes.forEach(index => {
        const [start, end] = index
        for (let i = temp; i < start; i++) {
            result += title[i]
        }
        result += '<strong class="match-text">'
        for (let i = start; i < end + 1; i++) {
            result += title[i]
        }
        result += '</strong>'
        temp = end + 1
    })
    for (let i = temp; i < title.length; i++) {
        result += title[i]
    }
    return result
}

const Card = props => {
    const title = props.highLightIndexes ? getHighLightTitle(props.title, props.highLightIndexes) : props.title
    return (
        <div className={'card'}>
            <div className="card-img" style={{
                backgroundImage: `url(${props.img})`,
            }}>
            </div>
            <div className="card-detail">
                <div className="card-title" dangerouslySetInnerHTML={{__html: title}}></div>
                {/*<div className="card-title">{props.title}</div>*/}
                <div className="card-price">{props.price ? props.price + "$" : "N/A"}</div>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    img: PropTypes.string,
    highLightIndexes: PropTypes.array,
};

export default Card;
