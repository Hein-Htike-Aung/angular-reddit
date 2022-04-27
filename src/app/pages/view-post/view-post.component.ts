import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentDto, PostResponse } from './../../model/app.model';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../../service/comment.service';
import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  commentDto: CommentDto;
  postId: number;
  post: PostResponse;
  commentForm: FormGroup;
  comments: CommentDto[];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder
  ) {
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.commentDto = {
      postId: this.postId,
      text: '',
    };
  }

  ngOnInit(): void {
    this.commentForm = this.builder.group({
      text: ['', Validators.required],
    });

    this.getPostById();
    this.getCommentForPost();
  }

  private getPostById() {
    this.postService.getPostById(this.postId).subscribe({
      next: (resp) => (this.post = resp),
      error: (error) => throwError(() => error),
    });
  }

  private getCommentForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe({
      next: (resp) => (this.comments = resp),
      error: (error) => throwError(() => error),
    });
  }

  createComment() {
    this.commentDto.text = this.commentForm.get('text').value;

    this.commentService.createComment(this.commentDto).subscribe({
      next: (_) => {
        this.commentForm.reset();
        // Refresh Comment List
        this.getCommentForPost();
      },
      error: (error) => throwError(() => error),
    });
  }
}
