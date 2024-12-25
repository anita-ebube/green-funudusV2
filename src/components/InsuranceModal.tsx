import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setIsModalOpen } from '../store/slices/modalSlice';
import { addToCart } from '../store/slices/cartSlice';
import {  StoreCard } from '../interfaces/interface';
import { useNavigate } from 'react-router-dom';
// import { successToast } from '../utils/toast';

const InsuranceModal: React.FC = () => {
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);
	const modalProduct = useSelector((state: RootState) => state.modal.modalProduct);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const closeModal = () => {
		dispatch(setIsModalOpen(false));
	};
	const ToCheckOut = (Insurance: StoreCard) => {
		dispatch(addToCart(Insurance));
		navigate('/dashboard/Stores');
		closeModal();
	};

	return (
		<>
			<div
				onClick={closeModal}
				className={` ${
					isModalOpen
						? 'h-screen bg-black inset-0 opacity-50 fixed top-0 z-40'
						: 'h-0 opacity-0 relative z-0'
				} `}
			></div>

			<div
				className={`transition-all duration-[1000ms] ease-in-out transform ${
					isModalOpen
						? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 bg-white rounded-lg p-5 z-50 w-[80%] max-w-[527px] md:w-[70%] lg:w-[527px]'
						: 'scale-0 opacity-0 h-0 relative z-0'
				}`}
			>
				{/* <!-- Modal Header --> */}
				<div className="flex justify-between items-center mb-4">
					<p className="text-base font-semibold text-secondary">Insurance details</p>
					<p onClick={closeModal} className="flex items-center gap-1 cursor-pointer">
						close{' '}
						<span>
							<img src="/svg-icons/close-circle.svg" width={15} alt="close" />
						</span>
					</p>
				</div>

				{/* <!-- Product Image --> */}
				<img
					src={`http://127.0.0.1:8000${modalProduct?.logo}`} 
					alt="tomatoes"
					className="w-full h-auto mb-4 rounded-lg"
				/>

				{/* <!-- Product Details --> */}
				<div className="mb-2 flex justify-between text-xs">
					<p className="md:text-sm lg:text-base font-semibold text-secondary">
						{modalProduct?.productName}
					</p>
					<p className="text-primary md:text-sm lg:text-base font-semibold">
						{modalProduct?.amount}
					</p>
				</div>

				{/* <!-- Product Description --> */}
				<div className="text-xs md:text-sm text-gray-700 mb-4">{modalProduct?.description}</div>

				{/* <!-- Buttons --> */}
				<div className="space-y-2">
					<button
						onClick={() => ToCheckOut(modalProduct!)}
						className="w-full py-2 lg:py-[15.5px]   bg-primary  text-sm font-semibold rounded-lg hover:bg-primary-dark transition duration-500 text-white "
					>
						View our Stores
					</button>
				</div>
			</div>
		</>
	);
};

export default InsuranceModal;
