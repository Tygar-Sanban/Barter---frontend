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
        <div className="titles">
          <h2 className="titles">Health</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Skincare and Cosmetics")}
        >
          <button>Skincare and Cosmetics</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Haircare and Styling Products")}
        >
          <button>Haircare and Styling Products</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Personal Care and Hygiene")}
        >
          <button>Personal Care and Hygiene</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Vitamins and Supplements")}
        >
          <button>Vitamins and Supplements</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Fragrances and Perfumes")}
        >
          <button>Fragrances and Perfumes</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Wellness and Relaxation Products")}
        >
          <button>Wellness and Relaxation Products</button>
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

export default HealthAndBeauty;
