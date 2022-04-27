import { throwError } from 'rxjs';
import { SubredditDto } from './../../model/app.model';
import { SubredditService } from './../../service/subreddit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subreddit-list',
  templateUrl: './subreddit-list.component.html',
  styleUrls: ['./subreddit-list.component.scss'],
})
export class SubredditListComponent implements OnInit {
  subreddits: SubredditDto[];

  constructor(private subredditService: SubredditService) {}

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe({
      next: (resp) => (this.subreddits = resp),
      error: (error) => throwError(() => error),
    });
  }
}
