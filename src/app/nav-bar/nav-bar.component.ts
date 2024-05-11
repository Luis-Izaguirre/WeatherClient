import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatToolbarModule,
    MatButtonModule, 
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
  //Behavior subject makes it less singleton friendly
  //Creating new behavior service, so we need to delete
  //We are going to work with Observable
  //pip, tap, and now third function "takeUntil"
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedin = false;
  destroySubject = new Subject();

  //Combination of observable and pipe
  //This is why behavior doesn't get deleted automatically 
  constructor(private authService: AuthService, private router: Router){
    authService.authStatus.pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.isLoggedin = result;
    })
  }
  ngOnInit(): void {
    this.isLoggedin = this.authService.isAuthenticated();
  }
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete;
  }
  
  onLogOut(): void {
    this.authService.LogOut();
    //this.router.navigate["/"]
  }

}
