import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductInputs from '../../components/ProductInputs';
import Card from '../../components/Card';
import ProductModal from '../../components/ProductModal';
import { ICard } from '../../interfaces/interface';
import axios from 'axios';

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.7 },
};

const Products: React.FC = () => {
  const location = useLocation();
  const storeData = location.state?.storeData;
  const storeId = location.state?.storeId;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = storeId 
          ? `http://127.0.0.1:8080/api/v1/insurers/${storeId}/products/` 
          : 'http://127.0.0.1:8080/api/v1/products/';
        const response = await axios.get(url);
        setFilteredProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [storeId]);

  const receiveProductSearch = (products: ICard[]) => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition.transition}
      variants={pageTransition}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-14 lg:ml-[242px] border-2 min-h-screen">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-full mb-6">
            {storeData && (
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Products from {storeData.productName}
                </h1>
                <p className="text-gray-500 mt-1">
                  Showing {currentProducts.length} of {filteredProducts.length} products
                </p>
              </div>
            )}
            <ProductInputs getFilteredProducts={receiveProductSearch} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <Card product={product} key={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products found.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium 
                    disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium 
                    disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        <ProductModal />
      </div>
    </motion.div>
  );
};

export default Products;