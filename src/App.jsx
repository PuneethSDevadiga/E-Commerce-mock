import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { useState } from 'react';
import Cart from './Pages/Cart';
import Product from './Pages/Product';

function App() {
  const [cartItems,setCartItems]=useState([]);

  const addToCart=(item,quantity = 1)=>{
    
      // setCartItems((prevCart)=>[...prevCart,item]);
    setCartItems((prevCart) => {
      // Check if the item is already in the cart
      const itemIndex = prevCart.findIndex((product) => product.id === item.id);
      
      if (itemIndex === -1) {
        // If not in cart, add the item with quantity 1
        return [...prevCart, { ...item, quantity}];
      } else {
        // If already in cart, update the quantity
        // const updatedCart = [...prevCart];
        // updatedCart[itemIndex].quantity += 1;
        // return updatedCart;
        return prevCart.map((product, index) =>
          index === itemIndex
            // ? { ...product, quantity: product.quantity + 1 } 
            ?{ ...product, quantity: product.quantity + quantity }
            : product
        );
      }
    });
    alert(`${item.title} added to cart`);
  }

  const updateQuantity = (id, type) => {
    setCartItems((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === id);
      // const updatedCart = [...prevCart];

      // if (itemIndex !== -1) {
      //   if (type === 'increase') {
      //     updatedCart[itemIndex].quantity += 1;
      //   } else if (type === 'decrease' && updatedCart[itemIndex].quantity > 1) {
      //     updatedCart[itemIndex].quantity -= 1;
      //   }
      // }

      if (itemIndex !== -1) {
        return prevCart.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                quantity:
                  type === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1), // Prevent quantity from going below 1
              }
            : item
        );
      }

      return prevCart;
    });
  };


  const removeFromCart=(id)=>{
    setCartItems((prevCart)=>prevCart.filter((item)=>item.id!==id));
  }
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home addToCart={addToCart}/>}/>
        <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
