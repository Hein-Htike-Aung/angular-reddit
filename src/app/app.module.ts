import { TokenInterceptor } from './interceptor/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './auth/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home/home.component';
import { PostTileComponent } from './pages/post-tile/post-tile.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { SubredditSideBarComponent } from './pages/subreddit-side-bar/subreddit-side-bar.component';
import { VoteButtonComponent } from './pages/vote-button/vote-button.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateSubredditComponent } from './pages/create-subreddit/create-subreddit.component';
import { SubredditListComponent } from './pages/subreddit-list/subreddit-list.component';
import { ViewSubredditComponent } from './pages/view-subreddit/view-subreddit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent,
    HomeComponent,
    PostTileComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    VoteButtonComponent,
    ViewPostComponent,
    CreatePostComponent,
    CreateSubredditComponent,
    SubredditListComponent,
    ViewSubredditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    FontAwesomeModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    EditorModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
