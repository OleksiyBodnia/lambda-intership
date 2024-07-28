import { infoType, tableData } from "../types/arr";

export const TableData: { [key: string]: tableData } = {
	supplier: [
		{ key: "contactName", id: "Image", header: "", type: "img" },
		{ key: "companyName", id: "Company", header: "Company", type: "link", linkTo: "/suppliers/", dataId: "id" },
		{ key: "contactName", id: "contactName", header: "Contact", type: "string" },
		{ key: "contactTitle", id: "contactTitle", header: "Title", type: "string" },
		{ key: "city", id: "city", header: "City", type: "string" },
		{ key: "country", id: "country", header: "Country", type: "string" },
	],
	products: [
		{ key: "name", id: "name", header: "Name", type: "link", linkTo: "/products/", dataId: "productId" },
		{ key: "quantityPerUnit", id: "quantityPerUnit", header: "Qt per unit", type: "string" },
		{ key: "price", id: "price", header: "Price", type: "string" },
		{ key: "stock", id: "stock", header: "Stock", type: "string" },
		{ key: "orders", id: "orders", header: "Orders", type: "string" },
	],
	orders: [
		{ key: "orderId", id: "orderId", header: "Id", type: "link", linkTo: "/orders/", dataId: "orderId" },
		{ key: "totalPrice", id: "totalPrice", header: "Total Price", type: "price" },
		{ key: "totalProducts", id: "totalProducts", header: "Products", type: "string" },
		{ key: "totalQuantity", id: "totalQuantity", header: "Quantity", type: "string" },
		{ key: "shippedDate", safetyKey: "shippedDate", id: "shippedDate", header: "Shipped", type: "date" },
		{ key: "shipName", id: "shipName", header: "Ship Name", type: "string" },
		{ key: "shipCity", id: "shipCity", header: "City", type: "string" },
		{ key: "shipCountry", id: "shipCountry", header: "Country", type: "string" },
	],
	order: [
		{
			key: "productName",
			id: "productName",
			header: "Product",
			type: "link",
			linkTo: "/products/",
			dataId: "productId",
		},
		{ key: "quantity", id: "quantity", header: "Quantity", type: "string" },
		{ key: "orderPrice", id: "orderPrice", header: "Order Price", type: "price" },
		{ key: "totalPrice", id: "totalPrice", header: "Total Price", type: "string" },
		{ key: "discount", id: "discount", header: "Discount", type: "string" },
	],
	employes: [
		{ key: "name", id: "Image", header: "", type: "img" },
		{
			key: "name",
			id: "name",
			header: "Name",
			type: "link",
			linkTo: "/employees/",
			dataId: "employeeId",
		},
		{ key: "title", id: "title", header: "Title", type: "string" },
		{ key: "city", id: "city", header: "City", type: "string" },
		{ key: "phone", id: "phone", header: "Phone", type: "string" },
		{ key: "country", id: "country", header: "Country", type: "string" },
	],
	customers: [
		{ key: "customerId", id: "Image", header: "", type: "img" },
		{
			key: "company",
			id: "company",
			header: "Company",
			type: "link",
			linkTo: "/customers/",
			dataId: "customerId",
		},
		{ key: "contact", id: "contact", header: "Contact", type: "string" },
		{ key: "title", id: "title", header: "Title", type: "string" },
		{ key: "city", id: "city", header: "City", type: "string" },
		{ key: "country", id: "country", header: "Country", type: "string" },
	],
};

export const IndividualData: { [key: string]: infoType } = {
	supplier: [
		{ key: "companyName", title: "Company Name", type: "string" },
		{ key: "region", title: "Region", type: "string" },
		{ key: "contactName", title: "Contact Name", type: "string" },
		{ key: "postalCode", title: "Postal Code", type: "string" },
		{ key: "contactTitle", title: "Contact Title", type: "string" },
		{ key: "country", title: "Country", type: "string" },
		{ key: "address", title: "Address", type: "string" },
		{ key: "phone", title: "Phone", type: "string" },
		{ key: "city", title: "City", type: "string" },
	],
	product: [
		{ key: "productName", title: "Product Name", type: "string" },
		{ key: "unitsInStock", title: "Units In Stock", type: "string" },
		{ key: "supplierName", title: "Supplier", type: "link", linkTo: "/suppliers/", dataId: "supplierID" },
		{ key: "unitsOnOrder", title: "Units In Order", type: "string" },
		{ key: "quantityPerUnit", title: "Quantity Per Unit", type: "string" },
		{ key: "reorderLevel", title: "Reorder Level", type: "string" },
		{ key: "unitPrice", title: "Unit Price", type: "price" },
		{ key: "discontinued", title: "Discontinued", type: "string" },
	],
	order: [
		{ key: "customerId", title: "Customer ID", type: "link", linkTo: "/customers/", dataId: "customerId" },
		{ key: "orderDate", title: "Order Date", type: "date" },
		{ key: "shipName", title: "Ship Name", type: "string" },
		{ key: "requiredDate", title: "Required Date", type: "date" },
		{ key: "totalProducts", title: "Total Products", type: "string" },
		{ key: "shippedDate", title: "Shipped Date", type: "date" },
		{ key: "totalQuantity", title: "Total Quantity", type: "string" },
		{ key: "shipCity", title: "Ship City", type: "string" },
		{ key: "totalPrice", title: "Total Price", type: "string" },
		{ key: "shipRegion", title: "Ship Region", type: "string" },
		{ key: "totalDiscount", title: "Total Discount", type: "string" },
		{ key: "shipPostalCode", title: "Ship Postal Code", type: "string" },
		{ key: "shipVia", title: "Ship Via", type: "string" },
		{ key: "shipCountry", title: "Ship Country", type: "string" },
		{ key: "freight", title: "Freight", type: "price" },
	],
	employee: [
		{ key: ["firstName", "lastName"], title: "Name", type: "string" },
		{ key: "postalCode", title: "Postal Code", type: "string" },
		{ key: "title", title: "Title", type: "string" },
		{ key: "country", title: "Country", type: "string" },
		{ key: "titleOfCourtesy", title: "Title Of Courtesy", type: "string" },
		{ key: "homePhone", title: "Home Phone", type: "string" },
		{ key: "birthDate", title: "Birth Date", type: "date" },
		{ key: "extension", title: "Extension", type: "string" },
		{ key: "hireDate", title: "Hire Date", type: "date" },
		{ key: "notes", title: "Notes", type: "string" },
		{ key: "address", title: "Address", type: "string" },
		{
			key: ["supervisorFirstName", "supervisorLastName"],
			title: "Reports To",
			type: "link",
			linkTo: "/employees/",
			dataId: "reportsTo",
		},
		{ key: "city", title: "City", type: "string" },
	],
	customer: [
		{ key: "companyName", title: "Company Name", type: "string" },
		{ key: "postalCode", title: "Postal Code", type: "string" },
		{ key: "contactName", title: "Contact Name", type: "string" },
		{ key: "region", title: "Region", type: "string" },
		{ key: "contactTitle", title: "Contact Title", type: "string" },
		{ key: "country", title: "Country", type: "string" },
		{ key: "address", title: "Address", type: "string" },
		{ key: "phone", title: "Phone", type: "string" },
		{ key: "city", title: "City", type: "string" },
		{ key: "fax", title: "Fax", type: "string" },
	],
};