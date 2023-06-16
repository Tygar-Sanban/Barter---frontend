import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import service from "../service/service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import Switch from "@mui/material/Switch";

function CurrentProduct() {
  const params = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getSingleCurrentProduct() {
    try {
      const response = await service.get(`/current-product/${params.id}`);
      setCurrentProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct() {
    try {
      await service.patch(`product/${currentProduct.product._id}`, {
        reserved: false,
      });
      await service.delete(`/current-product/${params.id}`);
      navigate("/current-products");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSwitch() {
    try {
      const response = await service.patch(`/current-product/${params.id}`, {
        validation: true,
      });
      getSingleCurrentProduct();
      const bbProvider = await service.patch(
        `/wallet/${currentProduct.product.provider._id}`,
        { barterBucks: currentProduct.product.bbAmount }
      );
      const bbRequester = await service.patch(
        `/wallet/${currentProduct.product.requester._id}`,
        { barterBucks: currentProduct.product.bbAmount * -1 }
      );
      setTimeout(() => {
        navigate("/current-products");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleCurrentProduct();
    console.log("this is the current mission", currentProduct);
  }, []);

  return (
    <div>
      <Navbar />
      {currentProduct && (
        <div className="top-current-product" style={{ paddingTop: "5vh" }}>
          <h2 className="titles">{currentProduct.product.name}</h2>
          <img
            src={currentProduct.product.picture}
            style={{ width: "25%" }}
            alt=""
          />
          <div className="current-mission-content">
            {user?._id === currentProduct.product.provider._id ? (
              <div>
                You still need to bring it to{" "}
                {currentProduct.product.requester.name}.
              </div>
            ) : (
              <div>
                You requested {currentProduct.product.name} to{" "}
                {currentProduct.product.provider.name}{" "}
              </div>
            )}
            <div>
              This product is worth {currentProduct.product.bbAmount}{" "}
              BarterBucks !
            </div>
          </div>
          <div>
            {user?._id === currentProduct.product.provider._id ? (
              <div className="current-mission-buttons">
                <Link to={`/messages/${currentProduct.product._id}`}>
                  <button>Go to discussion</button>
                </Link>
                <button onClick={deleteProduct}>Delete this product</button>
              </div>
            ) : (
              <>
                <div className="current-mission-content">
                  <label htmlFor="validation">
                    Validate the delivery of this product ! (You won't be able
                    to cancel the validation)
                  </label>
                  <div>
                    <Switch
                      checked={currentProduct.validation}
                      onChange={handleSwitch}
                      inputProps={{ "aria-label": "Switch demo" }}
                    />
                    Status: {currentProduct.validation ? "Finished" : "Ongoing"}
                  </div>
                </div>
                <div className="current-mission-buttons">
                  <Link to={`/messages/${currentProduct.product._id}`}>
                    <button>Go to discussion</button>
                  </Link>
                  <button onClick={deleteProduct}>Delete this product</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentProduct;
