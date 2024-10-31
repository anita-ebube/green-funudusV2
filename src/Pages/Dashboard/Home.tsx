import React, { useEffect } from 'react';
import TransactionTable from '../../components/TransactionTable';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setUser } from '../../store/slices/userSlice';

const Home: React.FC = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const pageTransition = {
		initial: { opacity: 0, x: 20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -20 },
		transition: { duration: 0.7 },
	};

	// Retrieve data on component mount
	useEffect(() => {
		const storedUsername = localStorage.getItem('userDetails');
		if (storedUsername) {
			dispatch(setUser(JSON.parse(storedUsername)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			transition={pageTransition.transition}
			variants={{
				initial: pageTransition.initial,
				animate: pageTransition.animate,
				exit: pageTransition.exit,
			}}
			className="pt-4 lg:ml-[242px] border-2"
		>
			<div className="pt-20 px-3 ">
				<div>
					<p className="text-2xl text-secondary font-semibold">Hi {user.name.split(' ')[0]}</p>
					<p className="text-sm">Hello, Welcome Back!</p>
				</div>
				<div className="md:flex gap-7 mb-5">
					<div className="p-7 bg-secondary flex justify-between items-center mt-6 rounded-lg w-full">
						<div className="w-[248px] ">
							<p className="text-white text-sm">Let's get started</p>
							<p className="text-white text-lg font-semibold mt-2 mb-4 leading-5">
								Get the best Insurance for your farm with us
							</p>
							<button className="text-white text-sm font-medium bg-primary rounded-lg px-2 py-[7.5px]">
								Secure now
							</button>
						</div>
						<div>
							<img src="/svg-icons/security.svg" alt="security" />
						</div>
					</div>
					<div className="p-7 bg-[#FFF3E6]  flex justify-between items-center mt-6 rounded-lg w-full">
						<div className="w-[248px] ">
							<p className="text-primary text-sm">Get the best product</p>
							<p className="text-primary text-lg font-semibold mt-2 mb-4 leading-5">
								Purchase good quality farm produce with quality pricing
							</p>
							<button className="text-primary text-sm font-medium border-2 border-primary rounded-lg px-2 py-[7.5px]">
								Buy Now
							</button>
						</div>
						<div>
							<img src="/svg-icons/truck.svg" alt="truck" />
						</div>
					</div>
				</div>
				<div className="bg-white p-2 rounded-lg shadow-lg">
					<TransactionTable />
				</div>
			</div>
		</motion.div>
	);
};

export default Home;
