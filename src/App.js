import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostList from './post/pages/PostList';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import Post from './post/pages/Post';
import Profile from './user/pages/Profile';
import NewPost from './post/pages/NewPost';

function App() {

  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route path="/" exact>
          <PostList />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/user/:userId" exact>
          <Profile />
        </Route>
        <Route path="/create" exact>
          <NewPost />
        </Route>
        <Route path="/posts/:postId" exact>
          <Post />
        </Route>
        <Redirect to="/" />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
