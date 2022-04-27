import { VoteRequestPayload } from './../model/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const APIURL = `${environment.apiUrl}/votes`;

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private http: HttpClient) {}

  createVote(voteRequestPayload: VoteRequestPayload) {
    return this.http.post(`${APIURL}/create`, voteRequestPayload);
  }
}
