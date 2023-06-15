import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user, cart, getCart } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      const deleteProduct = cart.products.filter((elem) => {
        return elem._id !== id;
      });
      const deletedProduct = await service.patch(`/cart/${cart._id}`, {
        products: deleteProduct,
      });
      await getCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleValid() {
    try {
      await Promise.all(
        cart.products.map(async (elem) => {
          console.log("this is the elem", elem);
          const updateProduct = await service.patch(`/product/${elem._id}`, {
            reserved: true,
            requester: user._id,
          });
          const createCurrentProduct = await service.post(`/current-product`, {
            product: elem._id,
          });
        })
      );
      navigate("/current-products");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("this is the cart", cart);
  }, [cart]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        {cart && cart.products.length > 0 && (
          <div>
            <div>
              {cart.products.map((elem) => {
                return (
                  <div key={elem._id}>
                    <div>
                      <img
                        style={{ width: "25%" }}
                        src={elem.picture}
                        alt="product-picture"
                      />
                      <h2>{elem.name}</h2>
                    </div>
                    <div>{elem.description}</div>
                    <div>
                      {elem.bbAmount}
                      <img
                        style={{ width: "15%" }}
                        src="/public/Pictures/tunasseV1.png"
                        alt=""
                      />
                    </div>
                    <button onClick={() => handleDelete(elem._id)}>
                      Remove from cart
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button onClick={handleValid}>Reserve items</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
