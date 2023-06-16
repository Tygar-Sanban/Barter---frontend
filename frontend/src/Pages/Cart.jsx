import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../Components/Navbar";
import service from "../service/service";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { user, cart, getCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  async function handleDelete(id) {
    try {
      const deleteProduct = cart.products.filter((elem) => {
        return elem._id !== id;
      });
      await service.patch(`/cart/${cart._id}`, {
        products: deleteProduct,
      });
      await getCart();
    } catch (error) {
      console.log(error);
    }
  }

  async function getTotal() {
    try {
      cart.products.map((elem) => {
        setTotal((current) => current + elem.bbAmount);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleValid() {
    try {
      const updatedProducts = cart.products.map(async (elem) => {
        console.log("this is the elem", elem);
        await service.patch(`/product/${elem._id}`, {
          reserved: true,
          requester: user._id,
        });
        await service.post(`/current-product`, {
          product: elem._id,
        });
      });

      await Promise.all(updatedProducts);
      console.log("this is the cart._id", cart._id);

      await service.patch(`/cart/${cart._id}`, {
        products: [],
      });

      getCart();

      navigate("/current-products");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("this is the cart", cart);
    getTotal();
  }, [cart]);
  useEffect(() => {
    console.log("this is the total", total);
  }, [total]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5vh" }}>
        {cart && cart.products.length > 0 ? (
          <div>
            <div className="titles">Cart</div>

            <div>
              {cart.products.map((elem) => {
                return (
                  <div className="product-card" key={elem._id}>
                    <div className="product-img-name">
                      <img
                        style={{ width: "45%" }}
                        src={elem.picture}
                        alt="product-picture"
                      />
                      <h2>{elem.name}</h2>
                    </div>
                    <div className="product-description">
                      {elem.description}
                    </div>
                    <div className="product-thunasse">
                      {elem.bbAmount}{" "}
                      <img
                        style={{ width: "15%" }}
                        src="/Pictures/tunasseV1.png"
                        alt=""
                      />
                    </div>

                    <div className="flex">
                      <button
                        className="product-button"
                        onClick={() => handleDelete(elem._id)}
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="total-cart">
              <h3 className="titles">Total : {total}</h3>
              <img
                style={{ width: "15%" }}
                src="/Pictures/tunasseV1.png"
                alt=""
              />
            </div>
            <div>
              <div className="flex">
                <button className="product-button" onClick={handleValid}>
                  Reserve items
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles" style={{ paddingTop: "5vh" }}>
              <h2>You don't have anything in your cart yet.</h2>
            </div>
            <Link className="bullet-points" to="/product">
              <button>Click here to browse items</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
