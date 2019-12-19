import { ICard } from '../interfaces/mycard.interface';

export class Mycard implements ICard {
    constructor(
        public id: string,
        public name: string,
        public img: string,
        public price: string,
        public countProd: string
    ) {}
}