import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'ng-bootstrap-darkmode';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public year: number;
  public date: string;
  public card: Article = {
    id: 1,
    group: 0,
    title: "Titlu articol",
    imageUrl: "/assets/prism-only-logo.png",
    createDate: new Date().toString(),
    content: "Urmărește Prism pentru cele mai noi informații depre actualitate.",
    source: "/",
    link: "/"
  };
  public sources: any = [
  {name:"Sursă1",selected: false},
  {name:"Sursă2",selected: true},
  {name:"Sursă3",selected: false},
  {name:"Sursă4",selected: false},
  {name:"Sursă5",selected: false}];

  constructor(private themeService: ThemeService,) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
    this.setPhotoBlur(8);
    const options = {
      weekday: 'long',
      year: "numeric",
      month:"2-digit",
      day:"2-digit"
    };
  }

  sourceClick(sourceName) {
    let foundSource = this.sources.find(source => source.name === sourceName);
    if (foundSource) {
      foundSource.selected = !foundSource.selected;
    }
    var selectedNumber = 0;
    this.sources.forEach(element => {
      selectedNumber += element.selected?1:0
    });
    this.setPhotoBlur((5-selectedNumber)*2);
  }

  setPhotoBlur(x:number) {
    var photo = document.getElementById('photo');
    photo.style.filter = `blur(${x}px)`;
  }
  
}
