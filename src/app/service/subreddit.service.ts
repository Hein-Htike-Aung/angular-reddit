import { SubredditDto } from './../model/app.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const APIURL = `${environment.apiUrl}/subreddit`;

@Injectable({
  providedIn: 'root',
})
export class SubredditService {
  constructor(private http: HttpClient) {}

  getAllSubreddits(): Observable<SubredditDto[]> {
    return this.http.get<SubredditDto[]>(`${APIURL}`);
  }

  getSubredditById(id: number): Observable<SubredditDto> {
    return this.http.get<SubredditDto>(`${APIURL}/${id}`);
  }

  createSubreddit(subredditDto: SubredditDto): Observable<SubredditDto> {
    return this.http.post<SubredditDto>(`${APIURL}/create`, subredditDto);
  }
}
