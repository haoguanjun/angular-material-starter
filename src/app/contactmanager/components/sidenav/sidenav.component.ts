import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList
    = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>; 
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  constructor(
    zone: NgZone, 
    private _userService: UserService,
    private _router: Router ) {
    this.mediaMatcher.addListener(mql =>
      zone.run(this.mediaMatcher = mql as any));
  }

  ngOnInit(): void {
    this.users = this._userService.users;
    this.users.subscribe(
      (data)=> { 
        this._router.events.subscribe(
          ()=>{
            if( this.isScreenSmall() ){
              // TODO close side nav
              this.sidenav.close();
            }
          },
          error => console.error( error)
        )
      }, 
      error=>console.error(error)
    );

    this._userService.loadAll();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir === 'ltr'? 'rtl': 'ltr';
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }


}
