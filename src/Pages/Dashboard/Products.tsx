import React, { useState } from 'react';
import ProductInputs from '../../components/ProductInputs';
import { productCard } from '../../dummyData/data';
import Card from '../../components/Card';
import ProductModal from '../../components/ProductModal';
import { motion } from 'framer-motion';
import { ICard } from '../../interfaces/interface';

const pageTransition = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
	transition: { duration: 0.7 },
};

const Products: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [filtereProducts, setFilteredProducts] = useState([...productCard]);

	const itemsPerPage = 4; // Number of items to show per page

	const handleCurrentPage = (page: number) => {
		setCurrentPage(page);
	};
	const handlePageNumber = (value: string) => {
		if (currentPage < Math.ceil(filtereProducts.length / itemsPerPage) && value === 'Next') {
			setCurrentPage((prev) => prev + 1);
		} else if (value === 'Previous' && currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const receiveProductSearch = (arg: ICard[]) => {
		console.log('filtered: ', arg);
		setFilteredProducts(arg);
	};

	// Calculate the products to show for the current page
	const indexOfLastProduct = currentPage * itemsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
	const currentProducts = filtereProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
			className="pt-4 lg:ml-[242px] border-2 min-h-screen"
		>
			<div className="pt-20 lg:ps-6 pe-4">
				<div className="rounded-lg bg-white p-4 mt-6 w-full flex flex-col items-center">
					<div className=" w-full max-w-[982.5px]">
						<ProductInputs getFilteredProducts={receiveProductSearch} />
					</div>
					<div className="mt-6 flex flex-wrap justify-around md:justify-normal gap-5 mb-12  max-w-[982.5px]">
						{currentProducts.length > 0 ? (
							currentProducts.map((product, index) => <Card product={product} key={index} />)
						) : (
							<p className="text-gray-500 text-base italic">No products found.</p>
						)}
					</div>
					<div className="w-full flex justify-end  mt-6  max-w-[982.5px]">
						<div className="w-max  flex gap-2 items-center ">
							<div
								className="text-sm font-medium cursor-pointer text-primary flex gap-2 items-center hover:bg-[#dafed9] py-2 px-2 rounded-lg"
								onClick={() => handlePageNumber('Previous')}
							>
								<img src="/svg-icons/arrow-left.svg" alt="" />
								Previous
							</div>
							{Array.from({ length: 2 }, (_, index) => (
								<div
									key={index + 1}
									onClick={() => handleCurrentPage(index + 1)}
									className={`cursor-pointer text-sm font-medium px-4 py-[7.5px] hover:bg-[#dafed9] ${
										currentPage === index + 1
											? 'bg-primary text-white hover:bg-primary '
											: 'text-primary'
									} rounded-lg w-max`}
								>
									{index + 1}
								</div>
							))}

							<div
								className="cursor-pointer text-sm font-medium text-primary flex gap-2 items-center hover:bg-[#dafed9] py-2 px-2 rounded-lg"
								onClick={() => handlePageNumber('Next')}
							>
								Next
								<img src="/svg-icons/right-arrow.svg" alt="" />
							</div>
						</div>
					</div>
				</div>
				<ProductModal />
			</div>
		</motion.div>
	);
};

export default Products;
