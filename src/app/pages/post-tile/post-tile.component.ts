import { Router } from '@angular/router';
import { PostResponse } from './../../model/app.model';
import { Component, Input, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
})
export class PostTileComponent implements OnInit {
  faComments = faComments;

  @Input()
  posts: PostResponse[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
