import React, { useContext, useEffect, useState } from "react";
import service from "../service/service";
import { AuthContext } from "../Context/authContext";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

function ProductSheet() {
  const [product, setProduct] = useState("");
  const { cart, getCart } = useContext(AuthContext);
  const params = useParams();

  cart &&
    console.log("this is the cart.product in the product sheet", cart.products);

  product && console.log("this is the product in the product sheet", product);

  async function getProduct() {
    const theProduct = await service.get(`/product/${params.id}`);
    setProduct(theProduct.data);
  }

  async function handleAdd() {
    try {
      const updatedProducts = [...cart.products, product._id];
      const updateCart = await service.patch(`/cart/${cart._id}`, {
        products: updatedProducts,
      });
      await getCart();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        {product && (
          <div className="product-card">
            <div className="titles">{product.productCategory}</div>
            <div className="product-img-name">
              <img
                style={{ width: "50%" }}
                src={product.picture}
                alt="product-picture"
              />
              <h2>{product.name}</h2>
            </div>
            <div className="product-description">{product.description}</div>
            <div className="product-thunasse">
              {product.bbAmount}{" "}
              <img
                style={{ width: "15%" }}
                src="/Pictures/tunasseV1.png"
                alt=""
              />
            </div>
            {cart && cart.products.some((item) => item._id === product._id) ? (
              <div className="titles">This item is in your cart.</div>
            ) : (
              <div className="flex">
                <button className="product-button" onClick={handleAdd}>
                  Add to cart
                </button>
              </div>
            )}

            <div className="flex">
              <Link to="/cart">
                <button className="product-button">Go to cart</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSheet;
