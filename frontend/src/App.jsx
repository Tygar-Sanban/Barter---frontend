import "./App.css";
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

function App() {
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
        <Route path="/current-mission/:id" element={<CurrentMission />}></Route>

        <Route
          path="/provider-profile/:provider"
          element={<ProviderProfile />}
        ></Route>
        <Route path="/request-page" element={<RequestPage />} />
      </Routes>
    </>
  );
}

export default App;
