import React from 'react';
import { motion } from 'framer-motion';

const pageTransition = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
	transition: { duration: 0.7 },
};

const Settings: React.FC = () => {
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
			<div className="pt-20 lg:ps-6 pe-4 text-3xl px-5 text-[#758193]">Coming Soon!!!</div>
		</motion.div>
	);
};

export default Settings;
