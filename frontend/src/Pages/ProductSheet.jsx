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
          <div>
            <div>{product.productCategory}</div>
            <div>
              <img src={product.picture} alt="product-picture" />
              <h2>{product.name}</h2>
            </div>
            <div>{product.description}</div>
            <div>
              {product.bbAmount}{" "}
              <img
                style={{ width: "15%" }}
                src="/Pictures/tunasseV1.png"
                alt=""
              />
            </div>
            {cart && cart.products.some((item) => item._id === product._id) ? (
              <div>This item is in your cart.</div>
            ) : (
              <button onClick={handleAdd}>Add to cart</button>
            )}

            <Link to="/cart">
              <button>Go to cart</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSheet;
