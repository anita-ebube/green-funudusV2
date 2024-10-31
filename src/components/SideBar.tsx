/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import CommunityNavIcon from './nav-svg/CommunityNavIcon';
import HomeNavIcon from './nav-svg/HomeNavIcon';
import InsuranceNavIcon from './nav-svg/InsuranceNavIcon';
import PaymentNavIcon from './nav-svg/PaymentNavIcon';
import ProductsNavIcon from './nav-svg/ProductsNavIcon';
import SettingNavIcon from './nav-svg/SettingNavIcon';
import SecurityNavIcon from './nav-svg/SecurityNavIcon';
import { useDispatch } from 'react-redux';
import { setActivePage, setIsOpen } from '../store/slices/navigationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar: React.FC = () => {
	const isOpen = useSelector((state: RootState) => state.navigation.isOpen);
	const user = useSelector((state: RootState) => state.user.user);
	const activePage = useSelector((state: RootState) => state.navigation.activePage);
	const dispatch = useDispatch();
	// const [activeLink, setActiveLink] = useState('Home');
	// const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		console.log(isOpen);
	}, [isOpen]);

	useEffect(() => {
		const storedUsername = localStorage.getItem('userDetails');
		if (storedUsername) {
			dispatch(setUser(JSON.parse(storedUsername)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();

	const setLinkActive = (link: string) => {
		// setActiveLink(link);
		dispatch(setActivePage(link));
		dispatch(setIsOpen(false));

		link === 'Home'
			? navigate('/dashboard/Home')
			: link === 'Products'
			? navigate('/dashboard/Products')
			: link === 'Insurance'
			? navigate('/dashboard/Insurance')
			: link === 'Community'
			? navigate('/dashboard/Community')
			: link === 'Payments'
			? navigate('/dashboard/Payments')
			: link === 'Settings'
			? navigate('/dashboard/Settings')
			: link === 'Security'
			? navigate('/dashboard/Security')
			: '';
	};
	return (
		<aside
			className={`lg:fixed lg:top-0 lg:left-0 w-[242px] h-screen border-2 z-20 border-[#CFD2D8] bg-white transform ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			} transition-transform duration-[1000ms] ease-in-out z-40 absolute top-0 lg:translate-x-0 `}
		>
			<div className="mb-3 sm:mb-10 mt-7 ps-2">
				<img src="/svg-icons/logo.svg" alt="logo" style={{ fill: 'red' }} />
			</div>
			<div className="ps-4 mt-7 flex gap-3 sm:hidden mb-5">
				<div className="">
					<img width={40} src="/images/Frame 12.png" alt="dp" />
				</div>
				<div className=" ">
					<p className="text-lg font-semibold" style={{ color: '#071B06' }}>
						{user.name}
					</p>
					<p className="text-sm" style={{ color: '#289123' }}>
						Free plan
					</p>
				</div>
			</div>
			<nav className="px-4 list-none">
				{navLinks.map((links, index) => (
					<li
						key={index}
						className={`p-3 rounded-lg flex gap-2 font-medium ${
							activePage === links && 'bg-primary text-white'
						} text-[#758193]`}
						onClick={() => setLinkActive(links)}
					>
						{' '}
						<span>
							{links === 'Home' ? (
								<HomeNavIcon activeLink={activePage} />
							) : links === 'Insurance' ? (
								<InsuranceNavIcon activeLink={activePage} />
							) : links === 'Products' ? (
								<ProductsNavIcon activeLink={activePage} />
							) : links === 'Payments' ? (
								<PaymentNavIcon activeLink={activePage} />
							) : (
								<CommunityNavIcon activeLink={activePage} />
							)}
						</span>
						{links}
					</li>
				))}
				<p className="sm:pt-10 pt-3" style={{ color: '#758193' }}>
					----------------------------
				</p>
			</nav>
			<nav className="px-4 list-none sm:mt-10 mt-3">
				{navLinksTwo.map((links, index) => (
					<li
						key={index}
						className=" p-3 rounded-lg flex gap-2 font-medium"
						style={{
							backgroundColor: activePage === links ? '#071B06' : '',
							color: activePage === links ? '#C6FAC4' : '#758193',
							cursor: 'pointer',
						}}
						onClick={() => setLinkActive(links)}
					>
						{' '}
						<span>
							{links === 'Settings' ? (
								<SettingNavIcon activeLink={activePage} />
							) : (
								<SecurityNavIcon activeLink={activePage} />
							)}
						</span>
						{links}
					</li>
				))}
			</nav>
			<div
				className="w-full ps-8 text-base  mt-3 text-[#758193] cursor-pointer"
				onClick={() => navigate('/login')}
			>
				<LogoutIcon style={{ fill: '#758193' }} /> Logout
			</div>
		</aside>
	);
};

export default SideBar;

// eslint-disable-next-line react-refresh/only-export-components
export const navLinks = ['Home', 'Insurance', 'Products', 'Payments', 'Community'];

// eslint-disable-next-line react-refresh/only-export-components
export const navLinksTwo = ['Settings', 'Security'];
