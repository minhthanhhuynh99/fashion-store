import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../components/common/Button'
function UsersItem({user,handleDeleteItem,index}) {
    const handleDelete =() =>{
        handleDeleteItem(user.id)
      }
    return (
        <>
           <tr key={user.id}>
                <td >{index +1}</td>
                <td >{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.age}</td>
                <td>{user.created_at}</td>
                <td>
                  {/* <Link className='item__link' to={`/users`} state={{ user: user }}>
                   <Button  
                    nameBtn={<i className="fa-solid fa-eye"></i>}
                    OnClick={onShow}
                    />
                  </Link> */}
                  <Link className='item__link' to={`/edit-user/${user.id}`}  state={{ user: user }}>
                   <Button  
                    nameBtn={<i className="fa-sharp fa-solid fa-pen-to-square"></i>}
                    // onClick ={() =>handleUpdateItem(user.id)}
                    />
                  </Link>
                    <Button  
                    nameBtn={<i className="fa-solid fa-trash-can"></i>}
                    OnClick={() =>handleDelete()}
                    />
                </td>
           </tr>
        </>
      )
}
export default UsersItem
