import { useParams } from "react-router-dom";
import { useShop,Product} from "../Context/ShopContext";
import Breadcrumb from "../Components/Breadcrumbs/Breadcrumb";

function Product(){
  const all_product = useShop();
  const {productId} = useParams();
  const product = all_product.find((e : Product|undefined)=>{
    return  e?.id === Number(productId);
  })

  return (
    <div>
      <Breadcrumb product={product} />
    </div>
  )
};

export default Product;
