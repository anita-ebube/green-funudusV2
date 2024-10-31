import React from 'react';
import Home from './Home';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Products from './Products';
import Insurance from './Insurance';
import Payment from './Payment';
import Community from './Community';
import Cart from './Cart';
import Checkout from './Checkout';

const Dashboard: React.FC = () => {
	const activePage = useSelector((state: RootState) => state.navigation.activePage);

	return (
		<div className="pt-4 lg:ml-[242px] border-2" style={{ color: '#E8E6E6' }}>
			{activePage === 'Home' && <Home />}
			{activePage === 'Products' && <Products />}
			{activePage === 'Insurance' && <Insurance />}
			{activePage === 'Payments' && <Payment />}
			{activePage === 'Community' && <Community />}
			{activePage === 'Carts' && <Cart />}
			{activePage === 'Checkout' && <Checkout />}
		</div>
	);
};

export default Dashboard;
