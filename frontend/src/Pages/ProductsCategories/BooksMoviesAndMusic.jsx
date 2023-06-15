import React, { useEffect, useState } from "react";
import service from "../../service/service";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function BooksMoviesAndMusic() {
  const [products, setProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const productsCategories = [
    "Fiction and Non-fiction Books",
    "Textbooks and Educational Materials",
    "Movies",
    "Music",
    "E-books and Audiobooks",
    "Musical Instruments",
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
        <div onClick={() => setSubCategory("Fiction and Non-fiction Books")}>
          Fiction and Non-fiction Books
        </div>
        <div
          onClick={() => setSubCategory("Textbooks and Educational Materials")}
        >
          Textbooks and Educational Materials
        </div>
        <div onClick={() => setSubCategory("Movies")}>Movies</div>
        <div onClick={() => setSubCategory("Music")}>Music</div>
        <div onClick={() => setSubCategory("E-books and Audiobooks")}>
          E-books and Audiobooks
        </div>
        <div onClick={() => setSubCategory("Musical Instruments")}>
          Musical Instruments
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

export default BooksMoviesAndMusic;
