export class Comment{
    constructor(
        public author:string,
        public created:Date,
        public parent:string,
        public text:string
    ){}
}