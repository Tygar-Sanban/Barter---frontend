import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ProfilePage from "./Pages/ProfilePage";
import Search from "./Pages/Search";
import Personal from "./Pages/SkillsCategories/Personal";
import Professional from "./Pages/SkillsCategories/Professional";
import Home from "./Pages/SkillsCategories/Home";
import Transportation from "./Pages/SkillsCategories/Transportation";
import HealthAndWellness from "./Pages/SkillsCategories/HealthAndWellness";
import Creative from "./Pages/SkillsCategories/Creative";
import Educational from "./Pages/SkillsCategories/Educational";
import Discussions from "./Pages/Discussions";
import SearchResults from "./Pages/SearchResults";
import ModifySkills from "./Pages/modifySkills";
import Request from "./Pages/Request";
import AllRequests from "./Pages/AllRequests";
import AllRequestsSent from "./Pages/AllRequestsSent";
import ProviderProfile from "./Pages/ProviderProfile";

import Negociate from "./Pages/Negociate";
import Messages from "./Pages/Messages";

import CurrentMissions from "./Pages/CurrentMissions";
import CurrentMission from "./Pages/CurrentMission";
import RequestPage from "./Pages/RequestPage";
import Product from "./Pages/Product";
import Automotive from "./Pages/ProductsCategories/Automotive";
import BooksMoviesAndMusic from "./Pages/ProductsCategories/BooksMoviesAndMusic";
import Electronics from "./Pages/ProductsCategories/Electronics";
import FashionAndAccessories from "./Pages/ProductsCategories/FashionAndAccessories";
import HealthAndBeauty from "./Pages/ProductsCategories/HealthAndBeauty";
import HomeAndFurniture from "./Pages/ProductsCategories/HomeAndFurniture";
import SportAndFitness from "./Pages/ProductsCategories/SportAndFitness";
import ToysAndGames from "./Pages/ProductsCategories/ToysAndGames";
import ProductSheet from "./Pages/ProductSheet";
import Cart from "./Pages/Cart";
import CurrentProducts from "./Pages/CurrentProducts";
import CurrentProduct from "./Pages/CurrentProduct";

import { io } from "socket.io-client";

function App() {
  // useEffect(() => {
  //   const socket = io("http://localhost:5005");

  //   socket.on("notification", (data) => {
  //     console.log("Received notification:", data);
  //     // Display a push notification
  //     if (Notification.permission === "granted") {
  //       new Notification("You've been requested", {
  //         body: data.message,
  //       });
  //     }
  //   });

  //   return () => {
  //     // Clean up the socket connection when the component unmounts
  //     socket.disconnect();
  //   };
  // }, []); // Empty dependency array to run the effect only once
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/professional" element={<Professional />} />
        <Route path="/health-and-wellness" element={<HealthAndWellness />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/creative" element={<Creative />} />
        <Route path="/educational" element={<Educational />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/search-result/:query" element={<SearchResults />} />
        <Route path="/modifySkills" element={<ModifySkills />}></Route>
        <Route path="/request/:query/:skill" element={<Request />}></Route>
        <Route path="/my-requests" element={<AllRequests />}></Route>
        <Route path="/sent-requests" element={<AllRequestsSent />}></Route>
        <Route path="/sent-requests/:query" element={<Negociate />}></Route>
        <Route path="/messages/:query" element={<Messages />}></Route>
        <Route path="/current-missions" element={<CurrentMissions />}></Route>
        <Route path="/current-products" element={<CurrentProducts />}></Route>
        <Route
          path="/current-products/:id"
          element={<CurrentProduct />}
        ></Route>
        <Route path="/current-mission/:id" element={<CurrentMission />}></Route>
        <Route path="/product" element={<Product />} />
        <Route path="/automotive" element={<Automotive />} />
        <Route path="/books" element={<BooksMoviesAndMusic />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/fashion" element={<FashionAndAccessories />} />
        <Route path="/health" element={<HealthAndBeauty />} />
        <Route path="/home-and-furniture" element={<HomeAndFurniture />} />
        <Route path="/sport" element={<SportAndFitness />} />
        <Route path="/toys" element={<ToysAndGames />} />
        <Route path="/product/:id" element={<ProductSheet />} />
        <Route
          path="/provider-profile/:provider"
          element={<ProviderProfile />}
        ></Route>
        <Route path="/request-page" element={<RequestPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </>
  );
}

export default App;
