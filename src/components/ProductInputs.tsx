import React, { useState } from 'react';
import Filters from './Filters';
import { productCard, show, sortedBy1, sortedBy2 } from '../dummyData/data';
import { ICard } from '../interfaces/interface';

export interface IProductSearch {
	getFilteredProducts: (value: ICard[]) => void;
}
const FilterBar: React.FC<IProductSearch> = ({ getFilteredProducts }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredProducts, setFilteredProducts] = useState<ICard[]>([]);

	// Handle search input changes
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);

		// Filter products based on the search term
		const filtered = productCard.filter(
			(product) =>
				product.productName.toLowerCase().includes(term) ||
				product.description.toLowerCase().includes(term)
		);
		getFilteredProducts(filteredProducts);

		setFilteredProducts(filtered);
	};
	return (
		<div id="product-inputs" className="flex  flex-wrap gap-2">
			<div
				className="px-3 py-2 flex-1 flex border-2 border-[#EBEEF4] rounded-lg gap-3 mb-2 w-full max-w-[335px] "
				id="input-search"
			>
				<img width={22} src="/svg-icons/search-normal.svg" alt="search" />
				<input
					type="text"
					value={searchTerm}
					placeholder="Search for products..."
					onChange={handleSearch}
				/>
			</div>

			<Filters list={show} filterType={'show'} />
			<Filters list={sortedBy1} filterType={'sort by'} />
			<Filters list={sortedBy2} filterType={'sort by'} />
		</div>
	);
};

export default FilterBar;
