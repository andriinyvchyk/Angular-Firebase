import { ICheckout } from '../interfaces/checkout.interface';


export class Checkout implements ICheckout {
    constructor(
        public id: number,
        public idOrder: string,
        public firstName: string,
        public lastName: string,
        public companyName: string,
        public country: string,
        public streetAddress: string,
        public suite: string,
        public townCity: string,
        public stateCounty: string,
        public postcode: string,
        public phone: string,
        public email: string,
        public orderNotes: string,
        public productOrder: Array<any>,
        public productOrderPrice: number,
        public dataOrder: string,
        public orderCount: number
    ) {}
}