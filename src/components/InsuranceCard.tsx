import React from 'react';
import { IIcard, StoreCard } from '../interfaces/interface';
import { useDispatch } from 'react-redux';
import { setIsModalOpen, setModalProduct } from '../store/slices/modalSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const InsuranceCard: React.FC<IIcard> = ({ product }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleOpenModal = (product: StoreCard) => {
		dispatch(setIsModalOpen(true));
		dispatch(setModalProduct(product));
	};
	const handleAddToCart = (product: StoreCard) => {
		console.log(product);
		navigate('/dashboard/Stores');
	};

	const location = useLocation();
	return (
		<div className="p-[10px] w-full max-w-[230px] border-2 border-[#EBEEF4] rounded-lg relative">
			<div onClick={() => handleOpenModal(product)} className="pb-9">
				<img src={`http://127.0.0.1:8000${product.logo}`} alt="Product logo" />
				<div className="text-sm text-secondary font-semibold flex justify-between mt-[10px]">
					<p>{product.name}</p>
					{/* <p className="text-primary font-semibold">{product.description}</p> */}
				</div>
				<div className="py-[10px] text-xs h-full max-h-[84px]">{product.description}</div>
				<button
					onClick={() => handleAddToCart(product)}
					className="px-[10px] py-2 border-2 text-primary text-xs border-primary rounded-md bg-white absolute z-10 bottom-[3%] left-[5%]"
				>
					View our Stores
				</button>
			</div>


		</div>

	);
};

export default InsuranceCard;
