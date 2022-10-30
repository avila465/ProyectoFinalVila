import { useContext } from "react"
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const Cart = () => {
    const { cart, clearCart, totalQuantity, total} = useContext(CartContext)  

    if(totalQuantity === 0) {
        return (
            <h1 className='text-center'>No hay items en el carrito</h1>
        )
    }

    return (     
        <div>
            <h1 className='text-center'>Carrito</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Nombre</th>
                        <th>Precio Unitario</th>
                        <th>Quitar</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(p => <CartItem key={p.id} {...p}/>) }
                </tbody>
            </Table>  
            <h3 className='text-center'>Total: ${total}</h3>
            <div className='text-center'>
                <Button style={{margin:10}}variant="danger" onClick={() => clearCart()}>Limpiar carrito</Button>
                <Link to='/checkout'>{<Button variant="success">Checkout</Button>}</Link>
            </div>
        </div>
    )
}

export default Cart