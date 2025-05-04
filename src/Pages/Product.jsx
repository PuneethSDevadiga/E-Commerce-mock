import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import './Product.css';

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: parseInt(quantity, 10) };
    addToCart(productWithQuantity, parseInt(quantity, 10));
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <img src={product.image} alt={product.title} className="product-image" style={{ width: '400px', height: '400px' }} />
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Product;
