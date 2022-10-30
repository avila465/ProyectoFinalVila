import { useState,useEffect } from "react";
import {getDoc,doc} from 'firebase/firestore';
import { useParams } from "react-router-dom";
import {db} from '../../services/firebase'
import ItemDetail from "../ItemDetail/ItemDetail";
const ItemDetailContainer = ({addItem}) =>{
    const [product,setProduct] = useState([]);
    const [loading,setLoading] = useState(true);
    const {productID}=useParams();
    useEffect(()=>{
        const docRef= doc(db,'products',productID)
        getDoc(docRef).then(doc=>{
            const data=doc.data()
            const productAdapted={id:doc.id,...data}
            setProduct(productAdapted)
            
        }).finally(()=>{
            setLoading(false)
        })
    },[productID])
    if(loading){
        return <h1 className='text-center'>Cargando...</h1>
    }
    return(
        <ItemDetail {...product} addItem={addItem}/>      
    )
}
export default ItemDetailContainer;