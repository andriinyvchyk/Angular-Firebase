import { ICategory } from '../interfaces/category.interface';


export class Category implements ICategory {
    constructor(
        public id: number,
        public nameCategory: string,
        public date: string,
        public author: string,
        public icons: string
    ) {}
}
