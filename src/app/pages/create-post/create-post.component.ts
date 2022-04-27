import { throwError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostRequestPayload, SubredditDto } from './../../model/app.model';
import { Router } from '@angular/router';
import { SubredditService } from './../../service/subreddit.service';
import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postRequestPayload: PostRequestPayload;
  postForm: FormGroup;
  subreddits: SubredditDto[];

  constructor(
    private postService: PostService,
    private subredditService: SubredditService,
    private rounter: Router,
    private builder: FormBuilder
  ) {
    this.postRequestPayload = {
      postName: '',
      description: '',
      url: '',
      subredditName: '',
    };
  }

  ngOnInit(): void {
    this.postForm = this.builder.group({
      postName: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      subredditName: ['', Validators.required],
    });

    this.subredditService.getAllSubreddits().subscribe({
      next: (resp) => (this.subreddits = resp),
      error: (error) => throwError(() => error),
    });
  }

  createPost() {
    this.postRequestPayload.postName = this.postForm.get('postName').value;
    this.postRequestPayload.description =
      this.postForm.get('description').value;
    this.postRequestPayload.url = this.postForm.get('url').value;
    this.postRequestPayload.subredditName =
      this.postForm.get('subredditName').value;

    this.postService.createPost(this.postRequestPayload).subscribe({
      next: (_) => this.rounter.navigateByUrl('/'),
      error: (error) => throwError(() => error),
    });
  }

  discardPost() {
    this.rounter.navigateByUrl('/');
  }
}
