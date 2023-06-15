import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import service from "../../service/service";
import { Link } from "react-router-dom";

function HomeAndFurniture() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Furniture",
    "Home Decor and Accessories",
    "Kitchen and Dining Essentials",
    "Bedding and Bath",
    "Lighting and Fixtures",
    "Appliances",
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
        <div onClick={() => setSubCategory("Furniture")}>Furniture</div>
        <div onClick={() => setSubCategory("Home Decor and Accessories")}>
          Home Decor and Accessories
        </div>
        <div onClick={() => setSubCategory("Kitchen and Dining Essentials")}>
          Kitchen and Dining Essentials
        </div>
        <div onClick={() => setSubCategory("Bedding and Bath")}>
          Bedding and Bath
        </div>
        <div onClick={() => setSubCategory("Lighting and Fixtures")}>
          Lighting and Fixtures
        </div>
        <div onClick={() => setSubCategory("Appliances")}>Appliances</div>
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

export default HomeAndFurniture;
