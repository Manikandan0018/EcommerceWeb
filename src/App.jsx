// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import  {Home}  from './Home';
import  {Cart}  from './Cart';
import  {Address}  from './Address';
import {PaymentOption} from './PaymentOption';
import AdminProduct from './AdminProduct';
import AdminOrder from './AdminOrder';

function App() {
  return (
    <Router>
      <Routes basename="/Ecommerce">
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<PaymentOption/>} />
        <Route path="/adminProduct" element={<AdminProduct/>} />
                <Route path="/adminOrder" element={<AdminOrder/>} />
      </Routes>
    </Router>
  );
}

export default App;
