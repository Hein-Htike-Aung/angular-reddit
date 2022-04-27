import { CommentDto } from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const APIURL = `${environment.apiUrl}/comments`;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getAllCommentsForPost(postId: number): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${APIURL}/by-post/${postId}`);
  }

  getAllCommentsByUser(username: string): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${APIURL}/by-user/${username}`);
  }

  createComment(commentDto: CommentDto): Observable<any> {
    return this.http.post(`${APIURL}/create`, commentDto);
  }
}
