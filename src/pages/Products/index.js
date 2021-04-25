import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './index.css'
import Header from "../../layout/Header";
import PageContainer from "../../layout/PageContainer";
import Pagination from "../../components/Pagination";
import Card from "../../components/Card";
import {getProducts} from "../../services/products";
import {useUrlParams} from "../../utils/hooks";
import SearchBox from "../../components/SearchBox";
import Spinner from "../../components/Spinner";

// Search function
// params: searchText, allProduct
// return: filter of all products after search
const searchProducts = (searchText, allProducts) => {
    if (!searchText) return {
        matchedProducts: allProducts,
        matchedIndex: null
    }
    const searchWords = searchText.trim().split(" ") // "samsung white" => ["samsung", "white", ...]

    let matchedProducts = [...allProducts]
    let matchedIndex = []
    matchedProducts = matchedProducts.filter((product) => {
        const indexes = []
        for (let word of searchWords) {
            const regex = new RegExp(word, "i") // case-insensitive
            const match = regex.exec(product.name)
            if (!match) return false
            indexes.push([match.index, match.index + word.length - 1])
        }
        matchedIndex.push(indexes.sort(function (a, b) {
            return a[0] - b[0]
        }))
        return true
    })
    return {
        matchedProducts,
        matchedIndex
    }
}

const ProductsPage = props => {
    const [allProducts, setAllProducts] = useState([])
    const [pageProducts, setPageProducts] = useState([]) // Products per page
    const [filterProducts, setFilterProducts] = useState([]) // Products after search
    const [highlightIndexes, setHighlightIndexes] = useState(null) // product's highlight indexes

    const [pageSize, setPageSize] = useState(9)
    const [loading, setLoading] = useState(false)

    const [{page, search}, updateUrlParams] = useUrlParams()
    const currentPage = page ? parseInt(page) : 1

    useEffect(() => {
        const {matchedProducts, matchedIndex} = searchProducts(search, allProducts)
        setFilterProducts(matchedProducts)
        setHighlightIndexes(matchedIndex)
    }, [search, allProducts])

    useEffect(() => {
        setPageProducts(filterProducts.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize))
    }, [currentPage, filterProducts])

    useEffect(() => {
        setLoading(true)
        getProducts().then(responseProducts => {
            setAllProducts(responseProducts)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const handleSearch = (searchText) => {
        updateUrlParams({
            search: searchText,
            page: 1
        })
    }

    return (
        <div>
            <Header/>
            <PageContainer>
                <div className={'page-title bottom-space'}>
                    <h1 className={'text-center'}>Product list</h1>
                    <p className={'text-center'}>Technology is best when it brings people together</p>
                </div>
                <div className={'bottom-space side-space-20'}>
                    <SearchBox onSubmit={handleSearch}/>
                </div>
                {search && <div>
                    {filterProducts.length} results for "{search}" <span className={'cancel-search-btn'}
                                                                         onClick={() => {
                                                                             updateUrlParams({
                                                                                 search: "",
                                                                                 page: 1
                                                                             })
                                                                         }}>x</span>
                </div>}
                <div className={'row bottom-space'}>
                    {loading ? (
                        <Spinner />
                    ) : (
                        pageProducts.map((product, i) => (
                            <div key={product.id} className="col-4">
                                <Card
                                    img={product.imageUrl}
                                    price={product.price}
                                    title={product.name}
                                    highLightIndexes={highlightIndexes ? highlightIndexes[pageSize * (currentPage - 1) + i] : null}
                                />
                            </div>
                        ))
                    )}
                </div>
                { !loading ? (
                    <Pagination current={currentPage} pageSize={pageSize} total={filterProducts.length}/>
                ) : null }
            </PageContainer>
        </div>

    );
};

ProductsPage.propTypes = {};

export default ProductsPage;
