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
        <div className="titles">
          <h2 className="titles">Sport</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Exercise Equipment")}
        >
          <button>Exercise Equipment</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Sports Gear and Apparel")}
        >
          <button>Sports Gear and Apparel</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Outdoor Gear and Camping Equipment")}
        >
          <button>Outdoor Gear and Camping Equipment</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Bicycles and Accessories")}
        >
          <button>Bicycles and Accessories</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Fitness Trackers and Wearables")}
        >
          <button>Fitness Trackers and Wearables</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Sports Memorabilia")}
        >
          <button>Sports Memorabilia</button>
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

export default SportAndFitness;
