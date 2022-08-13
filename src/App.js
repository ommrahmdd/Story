import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import AddTrack from "./pages/addTrack/AddTrack";
import CreatePlaylist from "./pages/createPlaylist/CreatePlaylist";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";
import Tracks from "./pages/tracks/Tracks";
function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/:playlist_id/tracks" exact component={Tracks} />
          <Route path="/:id/track" exact component={AddTrack} />
          <Route path="/:id/playlist" exact component={CreatePlaylist} />
          <Route path="/:id/profile" exact component={Profile} />
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
