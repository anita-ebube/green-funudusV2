import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../store/slices/navigationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const MainLayout: React.FC = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state: RootState) => state.navigation.isOpen);
	const location = useLocation();
	const show = ['/', '/login'].includes(location.pathname);

	return (
		<>
			{!show && <NavBar />}
			{!show && (
				<SideBar />
				// </aside>
			)}
			<div className="bg-[#F7F7F7] ">
				<Outlet />
				{/* Overlay when sidebar is open */}
				{isOpen && (
					<div
						className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
						onClick={() => dispatch(setIsOpen(false))}
					></div>
				)}
			</div>
		</>
	);
};

export default MainLayout;
