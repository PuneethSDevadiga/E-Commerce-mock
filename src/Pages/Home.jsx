import { useEffect, useState } from "react";
import "./Home.css";
import PropTypes from "prop-types";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = await axios.get("https://fakestoreapi.com/products");
        setProducts(api.data);
        setSearchResults(api.data);
      } catch (error) {
        console.error("error in fetching", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((data) =>
      data.title.toLowerCase().includes(searchProducts.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [products, searchProducts]);

  const handleSingleSelect = (id) => {
    setSelected(id === selected ? null : id);
  };

  return (
    <>
      <Navbar
        searchProducts={searchProducts}
        setSearchProducts={setSearchProducts}
      />
      <div className="home">
        <div className="align-card">
          {searchResults.map((data) => (
            <div key={data.id} className="product-card">
              <h4>{data.title}</h4>
              <p>Sale Price:${data.price}</p>
              <Link to={`/product/${data.id}`}>
                <img src={data.image} alt={data.title} />
              </Link>
              <h4>
                <Link to={`/product/${data.id}`}>{data.title}</Link>
              </h4>
              <div
                className="decription"
                onClick={() => handleSingleSelect(data.id)}
              >
                Description +
                {selected === data.id ? <p>{data.description}</p> : null}
              </div>
              {/* {data.images.map((images,index)=>(
                        <img src={images} alt="product-image" key={index} />
                    ))} */}
              {/* {data.images.length>0 &&(<img src={data.images[0]} alt="images"/> )} */}
              <br />
              <button onClick={() => addToCart(data)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
export default Home;
