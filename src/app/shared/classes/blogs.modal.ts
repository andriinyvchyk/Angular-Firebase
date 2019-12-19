import { IBlog } from '../interfaces/blogs.interface';



export class Blogs implements IBlog {
    constructor(
        public id: number,
        public title: string,
        public date: string,
        public author: string,
        public text: string,
        public img: string,
        public imgID: string,
        public postCate: string,
        public postNotes: Array<any>
    ) {}
}
