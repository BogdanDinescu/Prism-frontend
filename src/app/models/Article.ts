export class Article {
    id: Number;
    title: string;
    simHash: Number;
    source: string;
    content: string;
    link: string;
    imageUrl: string;
  
    constructor() {
      this.id = 0;
      this.title = "";
      this.simHash = 0;
      this.source = "";
      this.content = "";
      this.link = "";
      this.imageUrl = "";
    }
  }