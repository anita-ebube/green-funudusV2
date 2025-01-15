import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import Card from '../../components/StoreCards'; // Import the Card component

// Define interfaces
interface StoreCard {
  name: string;
  get_image: string;
  description?: string;
  [key: string]: any; // For additional properties
}

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.7 },
};

const Stores: React.FC = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<StoreCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  useEffect(() => {
    if (location.state?.insuranceData) {
      const data = location.state.insuranceData;
      const formattedData: StoreCard[] = Array.isArray(data) ? data : [data];
      setFilteredProducts(formattedData);
    }
  }, [location.state]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredAndSearchedProducts = filteredProducts.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredAndSearchedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAndSearchedProducts.length / itemsPerPage);

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
      className="pt-14 lg:ml-[242px] border-2 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {location.state?.insurerSlug ? `Stores for ${location.state.insurerSlug}` : 'All Stores'}
              </h1>
              <p className="text-gray-500 mt-8">
                Showing {currentProducts.length} of {filteredAndSearchedProducts.length} stores
              </p>
            </div>

            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="Search stores..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
                <Card product={product} key={index} />
              ))}
              
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No stores found matching your search.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Stores;
