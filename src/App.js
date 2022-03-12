import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
//components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

//pages
import Home from "./pages/Home";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import CryptoDetail from "./pages/CryptoDetail";
import Exchanges from "./pages/Exchanges";
import News from "./pages/News";
import Error from "./pages/Error";


function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies></Cryptocurrencies>
              </Route>
              <Route exact path="/cryptocurrencies/:coinId">
                <CryptoDetail></CryptoDetail>
              </Route>
              <Route exact path="/exchanges">
                <Exchanges></Exchanges>
              </Route>
              <Route exact path="/news">
                <News></News>
              </Route>
              <Route path="*">
                <Error></Error>
              </Route>
            </Switch>
          </div>
         <Footer /> 
        </Layout>
        
      </div>
      
    </div>
  );
}

export default App;
