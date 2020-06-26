import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { parse } from 'fast-xml-parser';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  json: object = null;
  user: User = null;

  constructor(private _httpClient: HttpClient, 
      private _route: ActivatedRoute,
      private _userService: UserService) {
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params) => {
        let id = params['id'];
        if( !id ) {
          id = 1;
        }
        console.log( id );

        this._userService.users.subscribe(
          (users) => {
            if( users.length == 0) return ;
            this.user = this._userService.userById( id );
            console.log( this.user );
            
          },
          error => console.error( error )
        );

      }
    )
  }

  parseODataMetadata(): void {

    const url = "https://services.odata.org/TripPinRESTierService/(S(1jifcfdeemt3xfwmpbfe4ch5))/$metadata";

    this._httpClient.get( url, { responseType: 'text' } )
    .pipe(
      map( data=>{
        console.log( data );
        const xml: string = data as any;

        var options = {
          attributeNamePrefix : "",
          ignoreAttributes: false,
        };
        this.json =  parse( xml, options);
        console.log( this.json );

        return data;
      }),
      tap( // Log the result or error
        data => {
           
        },
        error => console.error(error )
      )
    )
    .subscribe();
    
  }
}
