import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubredditDto } from './../../model/app.model';
import { SubredditService } from './../../service/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.scss'],
})
export class CreateSubredditComponent implements OnInit {
  subredditDto: SubredditDto;
  subredditForm: FormGroup;

  constructor(
    private subredditService: SubredditService,
    private rounter: Router,
    private builder: FormBuilder
  ) {
    this.subredditDto = {
      subRedditName: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.subredditForm = this.builder.group({
      subredditName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  discard() {
    this.rounter.navigateByUrl('/');
  }

  createSubreddit() {
    this.subredditDto.subRedditName =
      this.subredditForm.get('subredditName').value;
    this.subredditDto.description = this.subredditForm.get('description').value;

    this.subredditService.createSubreddit(this.subredditDto).subscribe({
      next: (_) => this.rounter.navigateByUrl('/subreddit-list'),
      error: (error) => throwError(() => error),
    });
  }
}
