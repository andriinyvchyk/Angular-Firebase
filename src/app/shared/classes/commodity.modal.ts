import { ICommodity } from '../interfaces/commodity.interface';



export class Сommodity implements ICommodity {
    constructor(
        public id: number,
        public nameCategory: string,
        public date: string,
        public author: string,
        public name: string,
        public description: string,
        public price: string,
        public img: string,
        public imgID: string
    ) {}
}
