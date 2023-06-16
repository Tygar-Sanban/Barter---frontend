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
        <div className="titles">
          <h2 className="titles">Electronics</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Computers and Laptops")}
        >
          <button>Computers and Laptops</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Smartphones and Accessories")}
        >
          <button>Smartphones and Accessories</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Audio and Video Equipment")}
        >
          <button>Audio and Video Equipment</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Cameras and Photography Gear")}
        >
          <button>Cameras and Photography Gear</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Gaming Consoles and Accessories")}
        >
          <button>Gaming Consoles and Accessories</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Home Appliances")}
        >
          <button>Home Appliances</button>
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

export default Electronics;
