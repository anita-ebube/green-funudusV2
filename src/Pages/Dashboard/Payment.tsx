import React from 'react';
import { motion } from 'framer-motion';
import TransactionTable from '../../components/TransactionTable';

const pageTransition = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
	transition: { duration: 0.7 },
};

const Payment: React.FC = () => {
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
			className="pt-4 lg:ml-[242px] border-2 h-screen"
		>
			<div className="pt-20 lg:ps-6 pe-4  px-5 text-[#758193]">
				<TransactionTable />
			</div>
		</motion.div>
	);
};

export default Payment;
