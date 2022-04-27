import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn?: boolean;
  username?: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInOutput.subscribe(
      (resp) => (this.isLoggedIn = resp)
    );
    this.authService.usernameOutput.subscribe((resp) => (this.username = resp));

    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();

  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
