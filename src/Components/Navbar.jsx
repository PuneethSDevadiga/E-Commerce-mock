import PropTypes from "prop-types";
import img1 from '../assets/react.svg';
import {Link} from 'react-router-dom';
import './Navbar.css';


const Navbar = ({searchProducts,setSearchProducts}) => {
  return (
    <div>
        <div className="container-navbar">
            <img src={img1} alt='logo'/>
            <h1>Pdx Market</h1>
            <div className="search">
                <input type="text" placeholder="Search for products"  value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)} />
            </div>
            <ul>
                <li><Link to='/home'>HOME</Link></li>
                <li><Link to='/category'>CATEGORY</Link></li>
                <li><Link to='/cart'>CART</Link></li>
                <li><Link to='/'>LOG OUT</Link></li>
            </ul>

        </div>

    </div>
  )
}

Navbar.propTypes = {
    searchProducts: PropTypes.string.isRequired,
    setSearchProducts:PropTypes.func.isRequired
}
export default Navbar;  //exporting the component