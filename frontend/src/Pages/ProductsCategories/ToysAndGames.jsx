import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import service from "../../service/service";
import { Link } from "react-router-dom";

function ToysAndGames() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Board Games and Puzzles",
    "Action Figures and Collectibles",
    "Building Blocks and Construction Sets",
    "Dolls and Accessories",
    "Educational Toys",
    "Outdoor Play Equipment",
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
        <div onClick={() => setSubCategory("Board Games and Puzzles")}>
          Board Games and Puzzles
        </div>
        <div onClick={() => setSubCategory("Action Figures and Collectibles")}>
          Action Figures and Collectibles
        </div>
        <div
          onClick={() =>
            setSubCategory("Building Blocks and Construction Sets")
          }
        >
          Building Blocks and Construction Sets
        </div>
        <div onClick={() => setSubCategory("Dolls and Accessories")}>
          Dolls and Accessories
        </div>
        <div onClick={() => setSubCategory("Educational Toys")}>
          Educational Toys
        </div>
        <div onClick={() => setSubCategory("Outdoor Play Equipment")}>
          Outdoor Play Equipment
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

export default ToysAndGames;
