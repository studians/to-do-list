import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import TodoPage from './components/Todo/TodoPage/TodoPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
    <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/Login" component={Auth(LoginPage, false)} />
          <Route exact path="/Register" component={Auth(RegisterPage, false)} />
          <Route exact path="/Todo" component={Auth(TodoPage, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;