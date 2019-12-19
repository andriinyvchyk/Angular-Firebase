export interface IBlog {
    id: number;
    title: string;
    date: string;
    author: string;
    text: string;
    img: string;
    imgID: string;
    postCate: string;
    postNotes: Array<any>;
}