import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import service from "../../service/service";
import { Link } from "react-router-dom";

function Electronics() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Computers and Laptops",
    "Smartphones and Accessories",
    "Audio and Video Equipment",
    "Cameras and Photography Gear",
    "Gaming Consoles and Accessories",
    "Home Appliances",
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
        <div onClick={() => setSubCategory("Computers and Laptops")}>
          Computers and Laptops
        </div>
        <div onClick={() => setSubCategory("Smartphones and Accessories")}>
          Smartphones and Accessories
        </div>
        <div onClick={() => setSubCategory("Audio and Video Equipment")}>
          Audio and Video Equipment
        </div>
        <div onClick={() => setSubCategory("Cameras and Photography Gear")}>
          Cameras and Photography Gear
        </div>
        <div onClick={() => setSubCategory("Gaming Consoles and Accessories")}>
          Gaming Consoles and Accessories
        </div>
        <div onClick={() => setSubCategory("Home Appliances")}>
          Home Appliances
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
              <div>{elem.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Electronics;
