import { ViewSubredditComponent } from './pages/view-subreddit/view-subreddit.component';
import { SubredditListComponent } from './pages/subreddit-list/subreddit-list.component';
import { CreateSubredditComponent } from './pages/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { AuthGuard } from './common/guard/auth.guard';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user-profile/:username',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'create-subreddit', component: CreateSubredditComponent },
  { path: 'subreddit-list', component: SubredditListComponent },
  { path: 'view-subreddit/:subredditId', component: ViewSubredditComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
