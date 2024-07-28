export type SupplierType = {
  id: number;
  supplierID?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  fax?: string;
  homePage?: string;
};

export type SuppliersResponse = {
  total: string;
  page: number;
  pageCount: number;
  pageSize: number;
  data: SupplierType[];
};

export type ProductType = {
  id: number;
  productId?: number;
  name?: string;
  quantityPerUnit?: string;
  price?: string;
  stock?: number;
  orders?: number;
  productID?: number;
  productName?: string;
  supplierID?: number;
  categoryID?: number;
  unitPrice?: string;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: number;
  discontinued?: number;
  supplierName?: string;
};

// export interface OneProductType extends ProductType {
// 	SupplierName: string;
// }

export type ProsuctsResponse = {
  total: string;
  page: number;
  pageCount: number;
  pageSize: number;
  data: OrderType[];
};

export type OrderType = {
  orderId?: number;
  totalPrice?: string;
  totalProducts?: number;
  totalQuantity?: number;
  shippedDate?: string;
  shipName?: string;
  shipCity?: string;
  shipCountry?: string;
  TotalProductsDiscount?: number;
  TotalProductsPrice?: number;
  TotalProductsItems?: number;
  TotalProducts?: number;
  OrderId?: string;
  CustomerID?: string;
  EmployeeID?: string;
  OrderDate?: string;
  RequiredDate?: string;
  ShippedDate?: string;
  ShipVia?: string;
  Freight?: string;
  ShipName?: string;
  ShipAddress?: string;
  ShipCity?: string;
  ShipRegion?: string;
  ShipPostalCode?: string;
  ShipCountry?: string;
  ProductId?: string;
};

export type OneOrderType = {
	orderId?: number;
	customerId: string;
	shipName?: string;
	totalProducts?: number;
	totalQuantity?: number;
	totalPrice?: string;
	totalDiscount?: string;
	shipVia?: string;
	freight?: string;
	orderDate?: string;
	requiredDate?: string;
	shippedDate?: string;
	shipCity?: string;
	shipRegion?: string;
	shipPostalCode?: string;
	shipCountry?: string;

  products?: {
    productId?: number;
	productName?: string;
	quantity?: number;
	orderPrice?: string;
	totalPrice?: string;
	discount?: string;
  }[];
};

export type OrderProductsType = {
  OrderID: string;
  Quantity: string;
  OrderUnitPrice: string;
  Discount: string;
  ProductID: string;
  ProductName: string;
  SupplierID: string;
  CategoryID: string;
  QuantityPerUnit: string;
  ProductUnitPrice: string;
  UnitsInStock: string;
  UnitsOnOrder: string;
  ReorderLevel: string;
  Discontinued: string;
};

export type OrdersResponse = {
  total: string;
  page: number;
  pageCount: number;
  pageSize: number;
  data: OrderType[];
};

export interface EmployeeType {
  employeeId?: string;
  name?: string;
  title?: string;
  city?: string;
  phone?: string;
  country?: string;
  id?: number;
  employeeID?: string;
  lastName?: string;
  firstName?: string;
  titleOfCourtesy?: string;
  birthDate?: string;
  hireDate?: string;
  address?: string;
  region?: string;
  postalCode?: string;
  homePhone?: string;
  extension?: string;
  notes?: string;
  reportsTo?: string;
  supervisorLastName?: string;
  supervisorFirstName?: string;
}

// export interface OneEmployeeType extends EmployeeType {
//   ReportId: string;
//   ReportFirstName: string;
//   ReportLastName: string;
// }

export type EmployeesResponse = {
  total: string;
  page: number;
  pageCount: number;
  pageSize: number;
  data: EmployeeType[];
};

export type CustomerType = {
  id?: number;

  customerID?: string;
  company?: string;
  contact?: string;
  title?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: string;

  Address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  fax?: string;
  customerId: string
};

export type CustomerssResponse = {
  total: string;
  page: number;
  pageCount: number;
  pageSize: number;
  data: CustomerType[];
};

export type DashboardResponse = {
  // geoData: {
  // 	ip_address: string;
  // 	city: string;
  // 	city_geoname_id: number;
  // 	region: string;
  // 	region_iso_code: string;
  // 	region_geoname_id: number;
  // 	postal_code: string;
  // 	country: string;
  // 	country_code: string;
  // 	country_geoname_id: number;
  // 	country_is_eu: false;
  // 	continent: string;
  // 	continent_code: string;
  // 	continent_geoname_id: number;
  // 	longitude: number;
  // 	latitude: number;
  // 	security: { is_vpn: false };
  // 	timezone: { name: string; abbreviation: string; gmt_offset: number; current_time: string; is_dst: false };
  // 	flag: { emoji: string; unicode: string; png: string; svg: string };
  // 	currency: { currency_name: string; currency_code: string };
  // 	connection: {
  // 		autonomous_system_number: number;
  // 		autonomous_system_organization: string;
  // 		connection_type: string;
  // 		isp_name: string;
  // 		organization_name: string;
  // 	};
  // };
  // query_count: number;
  // select: number;
  // select_where: number;
  // select_left: number;
  // result_count: number;
  // logs: {
  // 	id: number;
  // 	result_count: string;
  // 	type: string;
  // 	date: string;
  // 	database_name: string;
  // 	time_passed: string;
  // 	query: string;
  // }[];
};

export type ApiResult<T> = {
  data: T;
  success: true;
};

export type ApiError = {
  message: string;
  success: false;
};

export type ApiResponse<T> = ApiError | ApiResult<T>;
