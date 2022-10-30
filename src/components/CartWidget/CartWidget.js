import { Cart3 } from "react-bootstrap-icons";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const CartWidget = () => {

    const { getTotalQuantity } = useContext(CartContext)

    const totalQuantity = getTotalQuantity()

    return(
        <Link to='/cart' className="CartWidget">
            <Cart3 size={30}/>
            {totalQuantity}
        </Link>
    );
}

export default CartWidget