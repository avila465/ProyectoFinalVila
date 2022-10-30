import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { getDocs, addDoc, collection, where, query, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase'

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [usuario,setUsuario]=useState({
        email:'',
        nombre:'',
        telefono:''
    })
    const handleInputChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name] : event.target.value
        })
    }
    const enviarDatos = (event) => {
        event.preventDefault()
        createOrder(usuario)
    }
    const { cart, total, clearCart } = useContext(CartContext)

    const createOrder = async (usuario) => {
        setLoading(true)
        try {
            const objOrder = {
                buyer: {
                    name: usuario?.nombre,
                    phone: usuario?.telefono,
                    email: usuario?.email
                },
                items: cart,
                total
            }
    
            const ids = cart.map(prod => prod.id)
            const productsRef = collection(db, 'products')
    
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in' , ids)))
            const { docs } = productsAddedFromFirestore
    
            const batch = writeBatch(db)
            const outOfStock = []
    
            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock
    
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity
    
                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })
    
            if(outOfStock.length === 0) {
                await batch.commit()
    
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                console.log(`Su pedido se genero exitosamente. Su nro de orden es: ${orderAdded.id}`)
                clearCart()
            } else {
                console.log('Por favor confeccione nuevamente su carrito')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if(loading) {
        return <h1 className='text-center'>Estamos procesando su compra...</h1>
    }

    return (
        <>
            <h1 className='text-center'>Checkout</h1>
            <Form>
                <Form.Group className="mb-3" controlId="useremail">
                    <Form.Control type="email" placeholder="Ingrese email" onChange={handleInputChange} name="email"/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="user">
                    <Form.Control type="text" placeholder="Ingrese su nombre y apellido" onChange={handleInputChange} name="nombre" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="usertel">
                    <Form.Control type="number" placeholder="Ingrese su numero de telefono" onChange={handleInputChange} name="telefono"/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <div className='text-center'>
                    <Button variant="success" onClick={enviarDatos}>
                        Finalizar compra
                    </Button>
                </div> 
            </Form>
          
        </>
    )
}

export default Checkout