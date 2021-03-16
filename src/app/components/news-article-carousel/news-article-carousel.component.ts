import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-news-article-carousel',
  templateUrl: './news-article-carousel.component.html',
  styleUrls: ['../news-article/news-article.component.css']
})
export class NewsArticleCarouselComponent implements OnInit {
  
  @Input('tuple') tuple: [Article];

  constructor() { }

  ngOnInit(): void {
  }

}
