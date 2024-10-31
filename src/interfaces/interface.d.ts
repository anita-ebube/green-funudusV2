export interface Iform {
	name: string;
	email?: string;
	password: string;
}

export interface IActiveNavLink {
	activeLink: string;
}

export interface IFilters {
	list: string[];
	filterType: string;
}

export interface ICard {
	imageUrl: string;
	productName: string;
	amount: string;
	description: string;
	insurance: string;
}
export interface InsuranceCard {
	imageUrl: string;
	productName: string;
	amount: string;
	description: string;
	insurance: string;
}

export interface IproductCard {
	product: ICard;
}

export interface IproductQuantity {
	addMinus: string;
}
