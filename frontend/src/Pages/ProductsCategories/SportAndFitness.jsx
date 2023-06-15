import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import service from "../../service/service";
import { Link } from "react-router-dom";

function SportAndFitness() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Exercise Equipment",
    "Sports Gear and Apparel",
    "Outdoor Gear and Camping Equipment",
    "Bicycles and Accessories",
    "Fitness Trackers and Wearables",
    "Sports Memorabilia",
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
        <div onClick={() => setSubCategory("Exercise Equipment")}>
          Exercise Equipment
        </div>
        <div onClick={() => setSubCategory("Sports Gear and Apparel")}>
          Sports Gear and Apparel
        </div>
        <div
          onClick={() => setSubCategory("Outdoor Gear and Camping Equipment")}
        >
          Outdoor Gear and Camping Equipment
        </div>
        <div onClick={() => setSubCategory("Bicycles and Accessories")}>
          Bicycles and Accessories
        </div>
        <div onClick={() => setSubCategory("Fitness Trackers and Wearables")}>
          Fitness Trackers and Wearables
        </div>
        <div onClick={() => setSubCategory("Sports Memorabilia")}>
          Sports Memorabilia
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

export default SportAndFitness;
