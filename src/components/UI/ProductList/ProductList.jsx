import React, {useEffect, useState} from 'react';
import ProductCart from '../ProductCart/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { useListSelectorProducts } from '../../../redux/selectors';
import { fetchProducts } from '../../../redux/Silice/ProductsSlice';
import ReactPaginate from 'react-paginate';
import './ProductsList.scss'
import Loading from '../../../util/loading/Loading';

const ProductList = () => {
    const productsList = useSelector(useListSelectorProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    
    const [currentItems,setCurrentItems] = useState(productsList);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(productsList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(productsList.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, productsList]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % productsList.length;
        setItemOffset(newOffset)
    }

    return (
      <>
        {currentItems.length === 0 && <Loading/>}
        <div className='container__list'>
            {
                currentItems.map((item,index) => (
                    <ProductCart item={item} key={index}/>
                ))
            }
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          pageClassName="page-num"
          containerClassName='pagination'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='active-paginate'
          disabledLinkClassName="disable"
        />
      </>
    );

};

export default ProductList;