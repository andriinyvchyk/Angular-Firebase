import { IComment } from '../interfaces/comment.interface';

export class Comment implements IComment {
    constructor(
        public id: string,
        public text: string,
        public date: string,
        public author: string,
        public email: string,
    ) { }
}
