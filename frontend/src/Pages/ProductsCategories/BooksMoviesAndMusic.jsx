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
        <div className="titles">
          <h2 className="titles">Multimedia</h2>
        </div>
        <div className="indications">
          <h4>Which item category are you interrested in ?</h4>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Fiction and Non-fiction Books")}
        >
          <button>Fiction and Non-fiction Books</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Textbooks and Educational Materials")}
        >
          <button>Textbooks and Educational Materials</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("E-books and Audiobooks")}
        >
          <button>E-books and Audiobooks</button>
        </div>
        <div
          className="bullet-points"
          onClick={() => setSubCategory("Musical Instruments")}
        >
          <button>Musical Instruments</button>
        </div>
        <div className="bullet-points" onClick={() => setSubCategory("Movies")}>
          <button>Movies</button>
        </div>
        <div className="bullet-points" onClick={() => setSubCategory("Music")}>
          <button>Music</button>
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

export default BooksMoviesAndMusic;
