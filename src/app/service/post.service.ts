import { PostRequestPayload } from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { PostResponse } from '../model/app.model';

const APIURL = `${environment.apiUrl}/posts`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${APIURL}`);
  }

  createPost(postRequestPayload: PostRequestPayload): Observable<string> {
    return this.http.post(`${APIURL}/create`, postRequestPayload, {
      responseType: 'text',
    });
  }

  getPostById(id: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${APIURL}/${id}`);
  }

  getAllPostsByUsername(username: string): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${APIURL}/by-user/${username}`);
  }

  getAllPostsBySubredditId(id: number): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${APIURL}/${id}`);
  }
}
