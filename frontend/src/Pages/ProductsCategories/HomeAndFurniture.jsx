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
        <div className="titles">
          <h2 className="titles">Home</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Furniture")}
        >
          <button>Furniture</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Home Decor and Accessories")}
        >
          <button>Home Decor and Accessories</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Kitchen and Dining Essentials")}
        >
          <button>Kitchen and Dining Essentials</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Bedding and Bath")}
        >
          <button>Bedding and Bath</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Lighting and Fixtures")}
        >
          <button>Lighting and Fixtures</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Appliances")}
        >
          <button>Appliances</button>
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

export default HomeAndFurniture;
