
import { IBcategory } from '../interfaces/blogscategory.interface';


export class Blogscategory implements IBcategory {
    constructor(
        public id: number,
        public nameCategory: string,
        public date: string,
        public author: string
    ) { }
}
