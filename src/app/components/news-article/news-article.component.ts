import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {

  @Input('article') article: Article;
  
  constructor() { }

  ngOnInit(): void {
  }

}
