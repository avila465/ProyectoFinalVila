//import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {CartContextProvider} from './context/CartContext'
import Cart from './components/Cart/Cart.js';
import Checkout from './components/Checkout/Checkout';
function App() {
  return (
    <>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<ItemListContainer greeting={'Bienvenidos'}/>}/>
            <Route path='/category/:categoryID' element={<ItemListContainer/>}/>
            <Route path='/item/:productID' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1>404 Not Found</h1>}/>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </>
  );
}

export default App;
