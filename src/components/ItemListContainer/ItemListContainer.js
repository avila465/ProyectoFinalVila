import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../../services/firebase'
const ItemListContainer = ({greeting}) => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const {categoryID} =useParams();
    useEffect(()=>{
        setLoading(true)
        const collectionRef=categoryID
            ? query(collection(db,'products'),where('category','==',categoryID))
            : collection(db,'products')
        getDocs(collectionRef).then(response=>{
            const productsAdapted =response.docs.map(doc=>{
                const data=doc.data()
                return{
                    id:doc.id,...data
                }
            })
            setProducts(productsAdapted)
        }).finally(()=>{
            setLoading(false)
        })
    },[categoryID])
    if(loading){
        return <h1 className='text-center'>Cargando...</h1>
    }
    return(
        <>
            <h1 className='text-center'>{greeting}</h1>
            <ItemList products={products}/>
        </>
        
    );
}
export default ItemListContainer;