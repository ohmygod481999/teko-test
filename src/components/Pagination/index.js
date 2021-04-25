import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './index.css'
import {useUrlParams} from "../../utils/hooks";

const Pagination = props => {
    const {current, pageSize, total} = props
    const totalPage = Math.floor(total / pageSize)
    const [_, updateUrlParams] = useUrlParams()

    const handlePageChange = (page) => {
        updateUrlParams({
            page: page
        })
    }

    return (
        <ul className={"pagination"}>
            <li className={'pagination-item'} onClick={() => {
                if (current !== 1) {
                    handlePageChange(1)
                }
            }}>First
            </li>
            <li className={'pagination-item'} onClick={() => {
                if (current !== 1) {
                    handlePageChange(current - 1)
                }
            }}>Back
            </li>
            {new Array(5).fill(0).map((_, i) => {
                const page = current - 2 + i
                if (page < 1 || page > totalPage) return null
                return (
                    <li key={page} className={`pagination-item ${page === current ? 'pagination-active' : ''}`}
                        onClick={() => {
                            handlePageChange(page)
                        }}
                    >
                        {page}
                    </li>
                );
            })}
            <li className={'pagination-item'} onClick={() => {
                if (current !== totalPage) {
                    handlePageChange(current + 1)
                }
            }}>Next</li>
            <li className={'pagination-item'} onClick={() => {
                if (current !== totalPage) {
                    handlePageChange(totalPage)
                }
            }}>Last
            </li>
        </ul>
    );
};

Pagination.propTypes = {
    total: PropTypes.number,
    current: PropTypes.number,
    pageSize: PropTypes.number
};

export default Pagination;
