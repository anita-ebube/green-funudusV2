import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { InsuranceCard } from '../../interfaces/interface';
import Card from '../../components/InsuranceCard';
import StoreModal from '../../components/InsuranceModal';

const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.7 },
};

const Icompanies: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState<InsuranceCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const itemsPerPage = 4; // Number of items to show per page

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8080/api/v1/insurers/');
                setFilteredProducts(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCurrentPage = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageNumber = (value: string) => {
        if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage) && value === 'Next') {
            setCurrentPage((prev) => prev + 1);
        } else if (value === 'Previous' && currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Calculate the products to show for the current page
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                <div className="rounded-lg bg-white p-4 mt-6 w-full flex flex-col ">
                    {loading ? (
                        <p className="text-gray-500 text-base italic">Loading products...</p>
                    ) : error ? (
                        <p className="text-red-500 text-base italic">{error}</p>
                    ) : (
                        <>
                            <div className="mt-6 flex md:justify-normal gap-5 mb-12 max-w-[982.5px]">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product, index) => (
                                        <Card product={product} key={index} />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-base italic">No products found.</p>
                                )}
                            </div>
                            <div className="w-full flex justify-end mt-6 max-w-[982.5px]">
                                <div className="w-max flex gap-2 items-center">
                                    <div
                                        className="text-sm font-medium cursor-pointer text-primary flex gap-2 hover:bg-[#dafed9] py-2 px-2 rounded-lg"
                                        onClick={() => handlePageNumber('Previous')}
                                    >
                                        <img src="/svg-icons/arrow-left.svg" alt="" />
                                        Previous
                                    </div>
                                    {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
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
                        </>
                    )}
                </div>
                <StoreModal />
            </div>
        </motion.div>
    );
};

export default Icompanies;
