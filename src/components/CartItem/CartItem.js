import { Trash } from "react-bootstrap-icons";
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Button from 'react-bootstrap/Button';

const CartItem = ({ id, name, quantity, price }) => {
    const { removeItem } = useContext(CartContext)
    const handleRemove = (id) => {
        removeItem(id)
    }
    
    return (
        <tr>
            <td>{quantity}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{<Button variant="danger" onClick={() => handleRemove(id)}>{<Trash size={20}/>}</Button>}</td>
        </tr>
    )
}

export default CartItem