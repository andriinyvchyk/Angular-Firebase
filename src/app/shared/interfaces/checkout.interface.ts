export interface ICheckout {
    id: number;
    idOrder: string;
    firstName: string;
    lastName: string;
    companyName: string;
    country: string;
    streetAddress: string;
    suite: string;
    townCity: string;
    stateCounty: string;
    postcode: string;
    phone: string;
    email: string;
    orderNotes: string;
    productOrder: Array<any>;
    productOrderPrice: number;
    dataOrder: string;
    orderCount: number;
}