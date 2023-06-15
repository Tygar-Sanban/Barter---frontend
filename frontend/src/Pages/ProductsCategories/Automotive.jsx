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
        <div onClick={() => setSubCategory("Car Parts and Accessories")}>
          Car Parts and Accessories
        </div>
        <div onClick={() => setSubCategory("Motorcycles and Scooters")}>
          Motorcycles and Scooters
        </div>
        <div onClick={() => setSubCategory("Tools and Equipment")}>
          Tools and Equipment
        </div>
        <div onClick={() => setSubCategory("Car Care and Maintenance")}>
          Car Care and Maintenance
        </div>
        <div onClick={() => setSubCategory("GPS and Navigation Systems")}>
          GPS and Navigation Systems
        </div>
        <div onClick={() => setSubCategory("Car Electronics")}>
          Car Electronics
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

export default Automotive;
