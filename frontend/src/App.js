import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './components/screens/LandingPage/LandingPage';
import Search from './components/Search/Search';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        {/* <Search /> */}
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
