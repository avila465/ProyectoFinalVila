import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartContext } from "../../context/CartContext";

const ButtonCount = ({ onConfirm, stock, initial = 1 }) => {
    const [count, setCount] = useState(initial)

    const increment = () => {
        if(count < stock) {
            setCount(count + 1)
        }

    }

    const decrement = () => {
            setCount(count - 1)

    }

    return (
        <>
            <p>Cantidad seleccionada: {count}</p>
            <Button style={{margin:1.5}}variant="primary" onClick={decrement}>-</Button>
            <Button style={{margin:1.5}}variant="primary" onClick={increment}>+</Button>
            <Button style={{margin:1.5}}variant="primary" onClick={() => onConfirm(count)}>Agregar al carrito</Button>
        </>
    )
}
const ItemDetail = ({ id, name, img, description, price, stock }) => {
    const [quantityToAdd, setQuantityToAdd] = useState(0)
    const { addItem } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        setQuantityToAdd(quantity)

        const productToAdd = {
            id, name, price, quantity
        }

        addItem(productToAdd)
    }

    const Count = ButtonCount

    return (
        <>
            <h1 className='text-center'>Detalle de producto</h1>
            <Row className="row justify-content-center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={img} alt={name}/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>Detalle: {description}</Card.Text>
                        <Card.Text>Precio: $ {price}</Card.Text>
                        <Card.Text>Stock disponible: {stock}</Card.Text>
                        <footer className='ItemFooter'>
                            {
                                quantityToAdd === 0 ? (
                                    <Count onConfirm={handleOnAdd} stock={stock} />
                                ) : (
                                    <Link to='/cart'>Finalizar compra</Link>
                                )
                            }
                        </footer>
                    </Card.Body>   
                </Card>
            </Row>
        </>
    )
}
export default ItemDetail