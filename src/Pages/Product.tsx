import { useParams } from "react-router-dom";
import { useShop,Product} from "../Context/ShopContext";
import Breadcrumb from "../Components/Breadcrumbs/Breadcrumb";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

function Product(){
  const all_product = useShop();
  const {productId} = useParams();
  const product = all_product.find((e : Product|undefined)=>{
    return  e?.id === Number(productId);
  })

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts/>
    </div>
  )
};

export default Product;
