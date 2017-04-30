export class Post{
    private options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    constructor(
        public author:string,
        public body:string,
        public created:number,
        public updated:number,
        public intro:string,
        public likes:number,
        public main_img:string,
        public tags:string[],
        public title:string
    ){}
}