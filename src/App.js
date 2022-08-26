import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import PrivateRoute from "./components/PrivateRoute/PrivateRoue";
import AddTrack from "./pages/addTrack/AddTrack";
import CreatePlaylist from "./pages/createPlaylist/CreatePlaylist";
import EditProfile from "./pages/editProfile/EditProfile";
import Favorites from "./pages/favorites/Favorites";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Playlist from "./pages/playlist/Playlist";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";
import SingleTrack from "./pages/SingleTrack/SingleTrack";
import Tracks from "./pages/tracks/Tracks";
function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/:playlist_id/tracks" exact component={Tracks} />
          <PrivateRoute path="/:id/track" exact component={AddTrack} />
          <PrivateRoute path="/:id/playlist" exact component={CreatePlaylist} />
          <PrivateRoute path="/:id/profile" exact component={Profile} />
          <PrivateRoute path="/:id/editProfile" exact component={EditProfile} />
          <PrivateRoute path="/favorites/:userId" exact component={Favorites} />
          <Route path="/playlist/:playlistId" exact component={Playlist} />
          <Route path="/track" exact component={SingleTrack} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
