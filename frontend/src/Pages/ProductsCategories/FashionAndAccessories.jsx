import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import service from "../../service/service";
import { Link } from "react-router-dom";

function FashionAndAccessories() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Clothing",
    "Shoes and Footwear",
    "Jewelry and Watches",
    "Bags and Luggage",
    "Sunglasses and Eyewear",
    "Accessories",
  ];

  async function getProducts() {
    try {
      const allProducts = await service.get("/product");
      const noReserved = allProducts.data.filter((elem) => {
        return elem.reserved === false;
      });
      const filteredProducts = noReserved.filter((elem) => {
        console.log("those are the elem", elem);
        return subCategory.includes(elem.productCategory);
      });
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [subCategory]);

  useEffect(() => {
    console.log("those are the products", products);
  }, [products]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        <div className="titles">
          <h2 className="titles">Fashion</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Clothing")}
        >
          <button>Clothing</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Shoes and Footwear")}
        >
          <button>Shoes and Footwear</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Jewelry and Watches")}
        >
          <button>Jewelry and Watches</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Bags and Luggage")}
        >
          <button>Bags and Luggage</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Sunglasses and Eyewear")}
        >
          <button>Sunglasses and Eyewear</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Accessories")}
        >
          <button>Accessories</button>
        </div>
      </div>
      {products.length > 0 && (
        <div>
          <h2>All the avilable products</h2>
        </div>
      )}
      <div>
        {products.map((elem) => {
          const url = `/product/${elem._id}`;
          return (
            <Link key={elem._id} to={url}>
              <div className="bullet-points">
                <button>
                  {elem.name} contributed by {elem.provider.name}
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FashionAndAccessories;
