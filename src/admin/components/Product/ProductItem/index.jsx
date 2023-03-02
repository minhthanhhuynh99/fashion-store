import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../components/common/Button'
function ProductItem({product,index}) {
  return (
    <>
        <tr key={product.id}>
                <td>{index + 1}</td>
                <td><img className='img__productItem' src={product.image} alt="" /></td>
                <td >{product.name}</td>
                <td>{product.inStock}</td>
                <td>{product.size}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.created_at}</td>
                <td>
                  <Link className='item__link' to={`/edit-product/${product.id}`}  state={{ product: product }}>
                   <Button  
                    nameBtn={<i className="fa-sharp fa-solid fa-pen-to-square"></i>}
                    // onClick ={() =>handleUpdateItem(product.id)}
                    />
                  </Link>
                    <Button  
                    nameBtn={<i className="fa-solid fa-trash-can"></i>}
                    // OnClick={() =>handleDelete()}
                    />
                </td>
           </tr>
    </>
  )
}
export default ProductItem
