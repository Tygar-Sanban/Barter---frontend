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
        <div className="titles">
          <h2 className="titles">Toys and Games</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Board Games and Puzzles")}
        >
          <button>Board Games and Puzzles</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Action Figures and Collectibles")}
        >
          <button>Action Figures and Collectibles</button>
        </div>
        <div
          className="bullet-points"
          onClick={() =>
            setSubCategory("Building Blocks and Construction Sets")
          }
        >
          <button>Building Blocks and Construction Sets</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Dolls and Accessories")}
        >
          <button>Dolls and Accessories</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Educational Toys")}
        >
          <button>Educational Toys</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Outdoor Play Equipment")}
        >
          <button>Outdoor Play Equipment</button>
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

export default ToysAndGames;
