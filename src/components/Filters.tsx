import React, { useState } from 'react';
import { IFilters } from '../interfaces/interface';

const Filters: React.FC<IFilters> = ({ filterType, list }) => {
	const [currentShowValue, setCurrentShowValue] = useState(list[0]);
	const [activeDropdown, setActiveDropdown] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleDropdown = (active: string) => {
		setActiveDropdown(active);
		setIsDropdownOpen(!isDropdownOpen);
	};

	const getFilterValue = (value: string) => {
		console.log(value);
		setIsDropdownOpen(false);
		setCurrentShowValue(value);
	};
	return (
		<div className="w-full max-w-[210px] relative mb-2">
			<div
				onClick={() => handleDropdown('products')}
				className="border-2 border-[#EBEEF4] rounded-lg gap-3 w-full flex justify-between items-center py-3 px-4 text-[#758193] text-sm font-medium cursor-pointer"
			>
				<span className="text-[rgb(117,129,147)] text-xs font-semibold">{filterType}:</span>{' '}
				{currentShowValue}
				<img src="/svg-icons/arrow-down.svg" alt="arrow-down" />
			</div>
			<div
				className={`${
					isDropdownOpen && activeDropdown === 'products'
						? 'max-h-40 opacity-100'
						: 'max-h-0 opacity-0'
				} overflow-hidden transition-all z-30 duration-300 ease-in-out absolute w-full border-2 border-[#EBEEF4] rounded-lg mt-1 bg-white`}
			>
				<ul className="flex flex-col bg-white">
					{list.map((el, index) => (
						<li
							key={index}
							className="hover:bg-[#35C12F] hover:text-white p-2 text-sm cursor-pointer"
							onClick={() => getFilterValue(el)}
						>
							{el}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Filters;
