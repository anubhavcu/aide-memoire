import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './components/screens/LandingPage/LandingPage';
import Search from './components/Search/Search';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notes from './components/screens/Notes/Notes';
import Dashboard from './components/screens/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          {/* <Search /> */}
          <Route path='/' component={LandingPage} exact />
          <Route path='/notes' component={Notes} />
          <Route path='/dashboard' component={Dashboard} />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
