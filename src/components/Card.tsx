import React from 'react';
import { ICard, IproductCard } from '../interfaces/interface';
import { useDispatch } from 'react-redux';
import { setIsModalOpen, setModalProduct } from '../store/slices/modalSlice';
import { addToCart } from '../store/slices/cartSlice';
import { successToast } from '../utils/toast';
import { useLocation } from 'react-router-dom';

const Card: React.FC<IproductCard> = ({ product }) => {
	const dispatch = useDispatch();

	const handleOpenModal = (product: ICard) => {
		dispatch(setIsModalOpen(true));
		dispatch(setModalProduct(product));
	};

	const handleAddToCart = (product: ICard) => {
		console.log(product);
		dispatch(addToCart(product));
		successToast('Successfully Added to Cart!');
	};
	const location = useLocation();

	return (
		<div className="p-[10px] w-full max-w-[230px] border-2 border-[#EBEEF4] rounded-lg relative">
			<div onClick={() => handleOpenModal(product)} className="pb-9">
				<img src={product.imageUrl} alt="" />
				<div className="text-sm text-secondary font-semibold flex justify-between mt-[10px]">
					<p>{product.productName}</p>
					<p className="text-primary font-semibold">{product.amount}</p>
				</div>
				{location.pathname === '/dashboard/Insurance' && (
					<div
						className={`w-full max-w-max p-1 text-primary text-xs bg-[#FFF3E6] flex items-center rounded-md ${
							[
								'Fresh Spinach',
								'Organic Carrots',
								'Fresh Strawberries',
								'Free-range-eggs',
							].includes(product.productName) && 'hidden'
						} `}
					>
						{product.insurance} Insurance{' '}
						<span className="ps-1">
							<img src="/svg-icons/info-circle.svg" alt="circle" />
						</span>
					</div>
				)}
				<div className="py-[10px] text-xs h-full max-h-[84px]">{product.description}</div>
			</div>
			<button
				onClick={() => handleAddToCart(product)}
				className="px-[10px] py-2 border-2 text-primary text-xs border-primary rounded-md bg-white absolute z-10 bottom-[3%] left-[5%]"
			>
				Add Cart
			</button>
		</div>
	);
};

export default Card;
