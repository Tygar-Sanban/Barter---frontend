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
        <div onClick={() => setSubCategory("Clothing")}>Clothing</div>
        <div onClick={() => setSubCategory("Shoes and Footwear")}>
          Shoes and Footwear
        </div>
        <div onClick={() => setSubCategory("Jewelry and Watches")}>
          Jewelry and Watches
        </div>
        <div onClick={() => setSubCategory("Bags and Luggage")}>
          Bags and Luggage
        </div>
        <div onClick={() => setSubCategory("Sunglasses and Eyewear")}>
          Sunglasses and Eyewear
        </div>
        <div onClick={() => setSubCategory("Accessories")}>Accessories</div>
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
              <div>{elem.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FashionAndAccessories;
