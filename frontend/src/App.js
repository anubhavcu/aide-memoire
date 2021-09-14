import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './components/screens/LandingPage/LandingPage';
// import Search from './components/Search/Search';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notes from './components/screens/Notes/Notes';
import Dashboard from './components/screens/Dashboard/Dashboard';
import LoginScreen from './components/screens/LoginScreen/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen';
import CreateNote from './components/screens/CreateNote/CreateNote';
import SingleNote from './components/screens/Notes/SingleNote';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          {/* <Search /> */}
          <Route path='/' component={LandingPage} exact />
          <Route path='/notes' component={Notes} exact />
          <Route path='/notes/:id' component={SingleNote} />
          <Route path='/createnote' component={CreateNote} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/dashboard' component={Dashboard} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
