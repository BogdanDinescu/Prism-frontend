import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {

  @Input('article') article: Article;
  public copySuccess: boolean = false;

  constructor(private news: NewsService) { }

  ngOnInit(): void {
  }

  copyToClipboard(text) {
    var self = this;
    navigator.clipboard.writeText(text).then(function() {
      console.log('Copying to clipboard was successful!');
      self.copySuccess = true;
    }, function(err) {
      console.log('Could not copy text: ', err);
    });
  }

  dateFormat(date_string: string): string {
    let options = {
      weekday: 'long',
      year: "numeric",
      month:"2-digit",
      day:"2-digit"
    };
    let date = new Date(date_string).toLocaleString("ro-RO",options)
    return date;
  }
}
