import { SubredditDto } from './../../model/app.model';
import { SubredditService } from './../../service/subreddit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.scss'],
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: SubredditDto[];
  displayAllViews: boolean;

  constructor(private subredditService: SubredditService) {}

  ngOnInit(): void {
    this.subredditService
      .getAllSubreddits()
      .subscribe((resp: SubredditDto[]) => {
        if (resp.length > 3) {
          this.subreddits = resp.splice(0, 3); // First Three Subreddits
          this.displayAllViews = true;
        } else {
          this.subreddits = resp;
        }
      });
  }
}
