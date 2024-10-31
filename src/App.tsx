import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Cart from './Pages/Dashboard/Cart';
import Checkout from './Pages/Dashboard/Checkout';
import Home from './Pages/Dashboard/Home';
import Insurance from './Pages/Dashboard/Insurance';
import Payment from './Pages/Dashboard/Payment';
import Products from './Pages/Dashboard/Products';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Community from './Pages/Dashboard/Community';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Security from './Pages/Dashboard/Security';
import Settings from './Pages/Dashboard/Settings';
import Icompanies from './Pages/Dashboard/Icompanies';

const App: React.FC = () => {
	return (
		<AnimatePresence mode="wait">
			<Router>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard/Home" element={<Home />} />
						<Route path="/dashboard/Products" element={<Products />} />
						<Route path="/dashboard/Insurance" element={<Icompanies />} />
						<Route path="/dashboard/Payments" element={<Payment />} />
						<Route path="/dashboard/Community" element={<Community />} />
						<Route path="/dashboard/Security" element={<Security />} />
						<Route path="/dashboard/Settings" element={<Settings />} />
						<Route path="/dashboard/Products/cart" element={<Cart />} />
						<Route path="/dashboard/Products/cart/Checkout" element={<Checkout />} />
					</Route>
				</Routes>
			</Router>
			<ToastContainer />
		</AnimatePresence>
	);
};

export default App;
