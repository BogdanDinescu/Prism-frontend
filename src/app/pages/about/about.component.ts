import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public year: number;
  public date: string;
  public sources: any = [
  {name:"Sursă1",selected: false},
  {name:"Sursă2",selected: true},
  {name:"Sursă3",selected: false},
  {name:"Sursă4",selected: false},
  {name:"Sursă5",selected: false}];

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
    this.setPhotoBlur(8);
    const options = {
      weekday: 'long',
      year: "numeric",
      month:"2-digit",
      day:"2-digit"
    };
    this.date = new Date().toLocaleString("ro-RO",options)
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
