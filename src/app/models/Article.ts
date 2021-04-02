export class Article {
    id: Number;
    title: string;
    group: Number;
    createDate: string;
    source: string;
    content: string;
    link: string;
    imageUrl: string;
  
    constructor() {
      this.id = 0;
      this.title = "";
      this.group = 0;
      this.createDate = "";
      this.source = "";
      this.content = "";
      this.link = "";
      this.imageUrl = "";
    }
  }