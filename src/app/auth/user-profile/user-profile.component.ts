import { PostResponse, CommentDto } from './../../model/app.model';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../../service/comment.service';
import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  username: string;
  posts: PostResponse[];
  comments: CommentDto[];
  numberOfPosts: number;
  numberOfComments: number;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];

    this.postService.getAllPostsByUsername(this.username).subscribe((resp) => {
      this.posts = resp;
      this.numberOfPosts = resp.length;
    });

    this.commentService
      .getAllCommentsByUser(this.username)
      .subscribe((resp) => {
        this.comments = resp;
        this.numberOfComments = resp.length;
      });
  }
}
