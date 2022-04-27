import { VoteType } from './../enummeration/app.enum';
export interface SignUpRequestPayload {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequestPayload {
  password: string;
  username: string;
} 

export interface LoginResponse {
  authenticationToken: string;
  expiresAt: Date;
  refreshToken: string;
  username: string;
}

export interface PostRequestPayload {
  description: string;
  postName: string;
  subredditName: string;
  url: string;
}

export interface PostResponse {
  id: number;
  commentCount: number;
  description: string;
  duration: string;
  postName: string;
  subredditName: string;
  downVote: boolean;
  upVote: boolean;
  url: string;
  userName: string;
  voteCount: number;
}

export interface SubredditDto {
  id?: number;
  description: string;
  numberOfPosts?: number;
  subRedditName: string;
}

export interface VoteRequestPayload {
  postId: number;
  voteType: VoteType
}

export interface CommentDto {
  postId: number;
  text: string;
  duration?: string;
  userName?: string
}