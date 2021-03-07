import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleCarouselComponent } from './news-article-carousel.component';

describe('NewsArticleCarouselComponent', () => {
  let component: NewsArticleCarouselComponent;
  let fixture: ComponentFixture<NewsArticleCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsArticleCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
