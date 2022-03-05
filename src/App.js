import Login from './components/login.js';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import authService from './services/authService.js';
import Home from './components/home.js';
import Sale from './components/sale.js';
import Order from './components/order.js';
import { useLocation } from "react-router";
import Header from './components/header.js';
import './index.css';
import ProductForm from './components/product_form.js';
function PrivateRoute() {
  const location = useLocation();
  let auth = authService.isLogin();
  return auth ?  <Outlet/> : <Navigate to="/" replace state={{ from: location }} />;
}

function App() {
  return (
    <div className="uk-container uk-container-expand">
      <Router>
          <Header/>
          <div className="uk-margin-top"></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/sale" element={<Sale/>}/>
              <Route path="/orders" element={<Order/>}/>
              <Route path="/addProduct" element={<ProductForm/>}/>
            </Route>
          </Routes>

      </Router>
    </div>
  );
}

export default App;
