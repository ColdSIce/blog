export class Comment{
    constructor(
        public author:string,
        public created:number,
        public parent:string,
        public text:string
    ){}
}