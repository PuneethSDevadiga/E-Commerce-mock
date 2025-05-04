import Navbar from "../Components/Navbar";
import PropTypes from "prop-types";
import "./Cart.css";
import Footer from "../Components/Footer";

const Cart = ({cartItems,removeFromCart,updateQuantity}) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);  
  return (
    <>
    <Navbar/>
    <div className="cart">
    <div className="container-cart">
      {cartItems.length===0?(<div className="empty-cart">
        <p>No items in cart</p>
        <p>Please add items to your cart</p>
        </div>)
      :
      
        (
        <>
        <h1>Cart Items</h1>
        <br/>
        <div className="align-cart">
        {cartItems.map((data)=>(
          <div key={data.id} className="cart-item">
          <p>{data.title}</p>
          <p>Price: ${data.price}</p>
          
          <img src={data.image} alt={data.title} />
          {/* {data.images.length>0 && (<img src={data.images[0]} alt="images" />)} */}
          <br/>
          <div className="addsubsection">
          <button className="addsub" onClick={() => updateQuantity(data.id, 'decrease')}>-</button>
          <p>Quantity: {data.quantity}</p>
          <button className="addsub" onClick={() => updateQuantity(data.id, 'increase')}>+</button>
          </div>
          
          <button className="remove" onClick={()=>removeFromCart(data.id)}>Remove</button>
          </div>


        ))}
        </div>
        <br/>
        <br/>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <br/>
        <br/>
        </>
        )
        

      }

    </div>
    </div>
    <Footer/>
    </>
  )
}
Cart.propTypes={
  cartItems:PropTypes.array.isRequired,
  removeFromCart:PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
}
export default Cart