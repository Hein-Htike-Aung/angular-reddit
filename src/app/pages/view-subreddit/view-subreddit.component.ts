import { SubredditDto } from './../../model/app.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SubredditService } from './../../service/subreddit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.scss'],
})
export class ViewSubredditComponent implements OnInit {
  subredditDto: SubredditDto;

  constructor(
    private subredditService: SubredditService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((resp) => {
      this.subredditService
        .getSubredditById(resp['subredditId'])
        .subscribe((resp) => (this.subredditDto = resp));
    });
  }

  goToSubreddits() {
    this.router.navigateByUrl('/subreddit-list');
  }
}
