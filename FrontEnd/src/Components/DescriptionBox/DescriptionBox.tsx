import "./DescriptionBox.css"

function DescriptionBox(){
  return (
    <div className="descriptionbox">
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p> An e-commerce website is an online platform that 
                facilitates buying and selling of goods and services 
                over the internet. It serves as a virtual marketplace 
                where businesses showcase their products or services, 
                and customers can browse, compare, select, and purchase
                items conveniently from the comfort of their own homes or any 
                location with internet access. 
            </p>
            <p> 
                Overall, an e-commerce website serves as a digital storefront for
                businesses to reach a broader audience, increase sales, and provide 
                convenient shopping experiences for customers worldwide.
            </p>
        </div>
    </div>
  )
};

export default DescriptionBox;
