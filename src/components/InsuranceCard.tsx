import React from 'react';
import { IIcard, StoreCard } from '../interfaces/interface';
import { useDispatch } from 'react-redux';
import { setIsModalOpen, setModalProduct } from '../store/slices/modalSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InsuranceCard: React.FC<IIcard> = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // const handleOpenModal = (product: StoreCard) => {
    //     dispatch(setIsModalOpen(true));
    //     dispatch(setModalProduct(product));
    // };
console.log(product, 'product')


    const fetchInsuranceDetails = async () => {
        
        try {
            const response = await axios.get(`https://api.qubic.com.ng/api/v1/insurers/${product.slug}/`);
            console.log('Insurance details:', response.data);
            // Navigate to stores page with the fetched data
            navigate('/dashboard/Stores', {
                state: {
                    insuranceData: response.data.categories,
                    insurerSlug: product.slug
                }
            });
        } catch (error) {
            console.error('Error fetching insurance details:', error);
            // Optionally handle error (show error message, etc.)
        }
    };

    return (
        <div className="p-[10px] w-full max-w-[230px] border-2 border-[#EBEEF4] rounded-lg relative">
            <div  className="pb-9">
                <img 
                    src={product.logo ? `https://api.qubic.com.ng${product.logo}` : '/default-logo.png'} 
                    alt={product.name} 
                    className="w-full h-auto object-cover"
                />
                <div className="text-sm text-secondary font-semibold flex justify-between mt-[10px]">
                    <p>{product.name}</p>
                </div>
                <div className="py-[10px] text-xs h-full max-h-[84px]">{product.description}</div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening
                        fetchInsuranceDetails();
                    }}
                    className="px-[10px] py-2 border-2 text-primary text-xs border-primary rounded-md bg-white absolute z-10 bottom-[3%] left-[5%] hover:bg-primary hover:text-white transition-colors"
                >
                    View our Stores
                </button>
            </div>
        </div>
    );
};

export default InsuranceCard;