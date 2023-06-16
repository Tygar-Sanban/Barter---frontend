import React, { useEffect, useState } from "react";
import service from "../../service/service";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function Automotive() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Car Parts and Accessories",
    "Motorcycles and Scooters",
    "Tools and Equipment",
    "Car Care and Maintenance",
    "GPS and Navigation Systems",
    "Car Electronics",
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
          <h2 className="titles">Automotive</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Car Parts and Accessories")}
        >
          <button>Car Parts and Accessories</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Motorcycles and Scooters")}
        >
          <button>Motorcycles and Scooters</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Tools and Equipment")}
        >
          <button>Tools and Equipment</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Car Care and Maintenance")}
        >
          <button>Car Care and Maintenance</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("GPS and Navigation Systems")}
        >
          <button>GPS and Navigation Systems</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Car Electronics")}
        >
          <button>Car Electronics</button>
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

  return (
    <div>
      <Navbar />
      <div className="titles" style={{ paddingTop: "5vh" }}>
        <h2 className="titles">Creative Services</h2>
      </div>
      <div className="indications">
        <h4>Which skill are you interrested in ?</h4>
      </div>
      <div className="bullet-points">
        {skills.map((elem) => {
          if (elem.serviceCategory === "Creative") {
            const url = `/search-result/${elem._id}`;
            return (
              <Link key={elem._id} to={url}>
                <div className="skill-container creativeBorder">
                  {elem.name}
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Automotive;
