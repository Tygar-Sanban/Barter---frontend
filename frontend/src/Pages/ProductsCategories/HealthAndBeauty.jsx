import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import service from "../../service/service";
import { Link } from "react-router-dom";

function HealthAndBeauty() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Skincare and Cosmetics",
    "Haircare and Styling Products",
    "Personal Care and Hygiene",
    "Vitamins and Supplements",
    "Fragrances and Perfumes",
    "Wellness and Relaxation Products",
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
        <div onClick={() => setSubCategory("Skincare and Cosmetics")}>
          Skincare and Cosmetics
        </div>
        <div onClick={() => setSubCategory("Haircare and Styling Products")}>
          Haircare and Styling Products
        </div>
        <div onClick={() => setSubCategory("Personal Care and Hygiene")}>
          Personal Care and Hygiene
        </div>
        <div onClick={() => setSubCategory("Vitamins and Supplements")}>
          Vitamins and Supplements
        </div>
        <div onClick={() => setSubCategory("Fragrances and Perfumes")}>
          Fragrances and Perfumes
        </div>
        <div onClick={() => setSubCategory("Wellness and Relaxation Products")}>
          Wellness and Relaxation Products
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

export default HealthAndBeauty;
