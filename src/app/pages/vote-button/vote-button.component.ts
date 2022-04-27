import { throwError } from 'rxjs';
import { PostService } from './../../service/post.service';
import { AuthService } from './../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { VoteRequestPayload } from './../../model/app.model';
import { VoteService } from './../../service/vote.service';
import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/model/app.model';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VoteType } from 'src/app/enummeration/app.enum';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss'],
})
export class VoteButtonComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  voteRequestPayload: VoteRequestPayload;
  isLoggedIn: boolean;

  @Input()
  post: PostResponse;

  constructor(
    private voteService: VoteService,
    private toastr: ToastrService,
    private authService: AuthService,
    private postService: PostService
  ) {
    this.voteRequestPayload = {
      postId: undefined,
      voteType: undefined,
    };

    this.authService.loggedInOutput.subscribe(
      (resp) => (this.isLoggedIn = resp)
    );
  }

  ngOnInit(): void {}

  upvotePost() {
    this.voteRequestPayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.voteRequestPayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  vote() {
    this.voteRequestPayload.postId = this.post.id;

    this.voteService.createVote(this.voteRequestPayload).subscribe({
      // Refresh Vote after Submitting
      next: (_) => this.updateVoteDetails(),
      error: (error) => {
        this.toastr.error('You have already voted');
        throwError(() => error);
      },
    });
  }

  updateVoteDetails() {
    this.postService
      .getPostById(this.post.id)
      .subscribe((resp) => (this.post = resp));
  }
}
