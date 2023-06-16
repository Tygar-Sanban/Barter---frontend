import React, { useContext, useEffect, useState } from "react";
import service from "../service/service";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/authContext";
import { Link } from "react-router-dom";

function CurrentProducts() {
  const { user } = useContext(AuthContext);
  const [userCurrentProducts, setUserCurrentProducts] = useState([]);
  const [userCurrentProductsOngoing, setUserCurrentProductsOngoing] = useState(
    []
  );
  const [userCurrentProductsFinished, setUserCurrentProductsFinished] =
    useState([]);
  const [
    userCurrentProductsOngoingProvided,
    setUserCurrentProductsOngoingProvided,
  ] = useState([]);
  const [
    userCurrentProductsFinishedProvided,
    setUserCurrentProductsFinishedProvided,
  ] = useState([]);
  const [
    userCurrentProductsOngoingRequested,
    setUserCurrentProductsOngoingRequested,
  ] = useState([]);
  const [
    userCurrentProductsFinishedRequested,
    setUserCurrentProductsFinishedRequested,
  ] = useState([]);
  const [twoButtons, setTwoButtons] = useState(true);
  const [providing, setProviding] = useState(false);
  const [requesting, setRequesting] = useState(false);

  async function getCurrentProducts() {
    try {
      const response = await service.get("/current-product");
      console.log("this is the response", response);
      if (response.data) {
        setUserCurrentProducts(
          response.data.filter((elem) => {
            return (
              elem.product.provider._id === user._id ||
              elem.product.requester._id === user._id
            );
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getCurrentProducts();
      console.log("this is the usercurentproducts", userCurrentProducts);
    }
  }, [user]);

  useEffect(() => {
    const finishedProducts = userCurrentProducts.filter((elem) => {
      return elem.validation === true;
    });
    setUserCurrentProductsFinished(finishedProducts);
    const ongoingProducts = userCurrentProducts.filter((elem) => {
      return elem.validation === false;
    });
    setUserCurrentProductsOngoing(ongoingProducts);
  }, [userCurrentProducts]);

  useEffect(() => {
    const requesterFinished = userCurrentProductsFinished.filter((elem) => {
      return elem.product.requester._id === user._id;
    });
    setUserCurrentProductsFinishedRequested(requesterFinished);
    const providerFinished = userCurrentProductsFinished.filter((elem) => {
      return elem.product.provider._id === user._id;
    });
    setUserCurrentProductsFinishedProvided(providerFinished);
    const requesterOngoing = userCurrentProductsOngoing.filter((elem) => {
      return elem.product.requester._id === user._id;
    });
    setUserCurrentProductsOngoingRequested(requesterOngoing);
    const providerOngoing = userCurrentProductsOngoing.filter((elem) => {
      return elem.product.provider._id === user._id;
    });
    setUserCurrentProductsOngoingProvided(providerOngoing);
  }, [userCurrentProductsFinished, userCurrentProductsOngoing]);

  async function handleClickProvider() {
    setProviding(true);
    setRequesting(false);
    setTwoButtons(false);
  }
  async function handleClickRequester() {
    setRequesting(true);
    setProviding(false);
    setTwoButtons(false);
  }

  return (
    <>
      <Navbar
        setTwoButtons={setTwoButtons}
        setProviding={setProviding}
        setRequesting={setRequesting}
      />
      {twoButtons && (
        <div className="request-paths" style={{ paddingTop: "5vh" }}>
          <button onClick={handleClickProvider}>Products you provide</button>
          <button onClick={handleClickRequester}>Products you request</button>
        </div>
      )}
      {providing && (
        <>
          <div style={{ paddingTop: "5vh" }}>
            {userCurrentProductsOngoingProvided.length > 0 ? (
              <h3 className="titles">Pending sales</h3>
            ) : (
              <div>
                <h3>You have no pending sales.</h3>
              </div>
            )}
            {userCurrentProductsOngoingProvided.length > 0 &&
              userCurrentProductsOngoingProvided.map((elem) => {
                console.log("this is the elem", elem);
                const url = `/current-products/${elem._id}`;
                return (
                  <Link className="results" key={elem._id} to={url}>
                    <div>
                      {elem.product.name} for {elem.product.requester.name}{" "}
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
      {requesting && (
        <>
          <div style={{ paddingTop: "5vh" }}>
            {userCurrentProductsOngoingRequested.length > 0 ? (
              <h3 className="titles">Incoming products</h3>
            ) : (
              <div>
                <h3>You have no incoming products.</h3>
              </div>
            )}

            {userCurrentProductsOngoingRequested.length > 0 &&
              userCurrentProductsOngoingRequested.map((elem) => {
                const url = `/current-products/${elem._id}`;
                return (
                  <Link className="results" key={elem._id} to={url}>
                    <div>
                      {elem.product.name} from {elem.product.provider.name}{" "}
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}

export default CurrentProducts;
