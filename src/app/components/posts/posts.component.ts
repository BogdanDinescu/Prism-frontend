import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public errorMessage: string = "";
  public alertMessage: string = "This is in development!"
  
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.updateLoading(false);
    },2000);
  }

  updateLoading(loading: boolean) {
    this.loadingChange.emit(loading);
  }
}
