import { Product } from '../../Context/ShopContext';
import './ProductDisplay.css'
import star_icon from "../assets/star_icon.png"
import star_dull_icon from "../assets/star_dull_icon.png"
interface ProductDisplayProps {
  product?: Product; 
}

function ProductDisplay({ product }: ProductDisplayProps){
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product?.image} alt="image of displayed product" />
          <img src={product?.image} alt="image of displayed product" />
          <img src={product?.image} alt="image of displayed product" />
          <img src={product?.image} alt="image of displayed product" />
        </div>
        <div className='productdisplay-img'>
          <img className="productdisplay-main-img" src={product?.image} alt="image of displayed product" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product?.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product?.new_price}
            </div>
        </div>
        <div className="productdisplay-right-description">
            A light weight apparel 
        </div>
        <div className="productdispaly-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button>ADD TO CART</button>
          <p className="productdisplay-right-category">
            <span>Category :</span> Women, T-Shirt, Crop Top
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span> Modern, Latest
          </p>
        </div>
      </div>
    </div>
  )
};

export default ProductDisplay;
