import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTable, Column } from 'react-table';
import { setActivePage } from '../store/slices/navigationSlice';

type Transaction = {
	type: string;
	date: string;
	amount: string;
	status: string;
	method: string;
};

const TransactionTable: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePayments = (link: string) => {
		dispatch(setActivePage(link));
		navigate('/dashboard/Payments');
	};
	const data = React.useMemo<Transaction[]>(
		() => [
			{
				type: 'Chicken vaccine',
				date: 'Oct 12th, 2024',
				amount: '₦10',
				status: 'Completed',
				method: 'Debit Card, **** 3245',
			},
			{
				type: 'Chicken vaccine',
				date: 'Oct 12th, 2024',
				amount: '₦10',
				status: 'Completed',
				method: 'Debit Card, **** 3245',
			},
			{
				type: 'Chicken vaccine',
				date: 'Oct 12th, 2024',
				amount: '₦10',
				status: 'Completed',
				method: 'Debit Card, **** 3245',
			},
			{
				type: 'Chicken vaccine',
				date: 'Oct 12th, 2024',
				amount: '₦10',
				status: 'Completed',
				method: 'Debit Card, **** 3245',
			},
			{
				type: 'Chicken vaccine',
				date: 'Oct 12th, 2024',
				amount: '₦10',
				status: 'Failed',
				method: 'Debit Card, **** 3245',
			},
		],
		[]
	);

	const columns = React.useMemo<Column<Transaction>[]>(
		() => [
			{
				Header: 'Type',
				accessor: 'type',
				Cell: ({ row }: { row: { original: Transaction } }) => (
					<div className="flex items-center space-x-2">
						<div className="hidden sm:block w-10 h-10 rounded-full bg-secondary"></div>
						<div>
							<div className="text-secondary font-medium text-base">{row.original.type}</div>
							<div className="text-xs text-gray-500">{row.original.date}</div>
						</div>
					</div>
				),
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				Cell: ({ row }: { row: { original: Transaction } }) => (
					<div className="text-[#071B06] font-medium text-base">{row.original.amount}</div>
				),
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ value }: { value: string }) => (
					<div
						className={`${
							value === 'Completed' ? 'text-[#071B06] bg-[#ecfdeb]' : 'text-[#BD0505] bg-red-100 '
						} text-sm px-3 py-1 w-[103px] text-center rounded-md`}
					>
						{value}
					</div>
				),
			},
			{
				Header: 'Method',
				accessor: 'method',
				Cell: ({ row }: { row: { original: Transaction } }) => (
					<div className="w-[90px]">
						<div className="text-[#071B06] font-medium text-base">
							{row.original.method.split(',')[0]}
						</div>
						<div className="text-sm text-gray-500">{row.original.method.split(',')[1]}</div>
					</div>
				),
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});

	return (
		<div className="w-full mx-auto p-4">
			<div className="flex justify-between mb-2">
				<h2 className="text-xl font-semibold text-secondary">Recent transactions</h2>
				<p
					className="text-gray-500 flex gap-3 items-center font-semibold cursor-pointer"
					onClick={() => handlePayments('Payments')}
				>
					See more transaction
					{location.pathname !== '/dashboard/Payments' && (
						<span>
							<img src="/svg-icons/arrow-right.svg" alt="right-arrow" />
						</span>
					)}
				</p>
			</div>

			<div className="block md:hidden space-y-4">
				{rows.map((row) => {
					prepareRow(row);
					return (
						<div
							key={row.id}
							className="border p-4 flex flex-col space-y-2 rounded-md bg-white shadow-sm"
						>
							{row.cells.map((cell) => (
								<div key={cell.column.id} className="flex justify-between">
									<div className="font-medium text-[#758193]">{cell.column.render('Header')}:</div>
									<div>{cell.render('Cell')}</div>
								</div>
							))}
						</div>
					);
				})}
			</div>

			<div className="hidden md:block ">
				<table {...getTableProps()} className="w-full bg-white">
					<thead className="border-t text-left w-full">
						{headerGroups.map((headerGroup) => {
							const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
							return (
								<tr key={key} {...headerGroupProps}>
									{headerGroup.headers.map((column) => {
										const { key, ...columnProps } = column.getHeaderProps();
										return (
											<th
												key={key}
												{...columnProps}
												className="px-4 py-4 font-medium text-[#758193]"
											>
												{column.render('Header')}
											</th>
										);
									})}
								</tr> // Ensure no whitespace here
							);
						})}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							const { key, ...rowProps } = row.getRowProps();
							return (
								<tr key={key} {...rowProps} className="border-t">
									{row.cells.map((cell) => {
										const { key, ...cellProps } = cell.getCellProps();
										return (
											<td key={key} {...cellProps} className="px-4 py-2 whitespace-nowrap">
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr> // Ensure no whitespace here
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TransactionTable;
