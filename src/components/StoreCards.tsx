import React from 'react';
import { ICard, IIcard } from '../interfaces/interface'; 
import { useDispatch } from 'react-redux';
import { setIsModalOpen, setModalProduct } from '../store/slices/modalSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const StoreCard: React.FC<IIcard> = ({ product }) => {  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenModal = (product: ICard) => {
        dispatch(setIsModalOpen(true));
        dispatch(setModalProduct(product));
    };

    const handleViewProducts = (product: ICard) => {
        navigate('/dashboard/Products', {
            state: {
                storeData: product,
                storeId: product.slug,
            }
        });
    };

    return (
        <div className="p-4 w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div onClick={() => handleOpenModal(product)} className="relative pb-12">
                <img 
                    src={product.logo} 
                    alt={product.productName} 
                    className="w-full h-48 object-cover rounded-md"
                /> 
                <div className="mt-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">{product.productName}</h3>
                    <span className="text-primary font-semibold">{product.amount}</span>
                </div>
                
                {location.pathname === '/dashboard/Stores' && !['Fresh Spinach', 'Organic Carrots', 'Fresh Strawberries', 'Free-range-eggs'].includes(product.productName) && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-[#FFF3E6] text-primary text-sm rounded-md">
                        {product.insurance} Insurance
                        <img src="/svg-icons/info-circle.svg" alt="info" className="ml-1 w-4 h-4" />
                    </div>
                )}

                <p className="mt-3 text-sm text-gray-600 line-clamp-3">{product.description}</p>
                
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewProducts(product);
                    }}
                    className="absolute bottom-0 left-0 w-full px-4 py-2 text-sm font-medium text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                    View our Products
                </button>
            </div>
        </div>
    );
};

export default StoreCard;