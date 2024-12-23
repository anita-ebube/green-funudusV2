export interface Iform {
	username: string;
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
	name:string;
	logo: string;
	productName: string;
	amount: string;
	slug: string; 
	description: string;
	insurance: string;
}

export interface InsuranceCard {
	name:string;
	logo: string;
	productName: string;
	slug: string
	amount: string;
	description: string;
	insurance: string;
}
export interface ProductCard {
	category_name:string;
	get_image: string;
	name: string;
	price: string;
	description: string;
	insurance: string;
}
export interface StoreCard {
	name:string;
	logo: string;
	productName: string;
	amount: string;
	description: string;
	insurance: string;
	slug: string
}

export interface IproductCard {
	product: ProductCard;
}

export interface IIcard {
	product: ICard;
}

export interface IproductQuantity {
	addMinus: string;
}
