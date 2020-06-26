import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataStore : {
    users: User[]
  };

  users: BehaviorSubject<User[]>;

  constructor(private _http: HttpClient) {
    this.dataStore = { users: [] };
    this.users = new BehaviorSubject<User[]>([]);
  }

  loadAll() {
    const usersUrl = 'http://localhost:3000/users';
    return this._http.get<User[]>(usersUrl)
      .subscribe((data) => {
        this.dataStore.users = data;
        this.users.next( Object.assign({}, this.dataStore).users);
      }, error => console.error('Failed to get users.'));
  }

  userById( userId ): User {
    // the userId maybe a string
    return this.dataStore.users.find( u=> u.id == userId );
  }

  addUser( user: User ): Promise<User> {
    return new Promise((resolve, reject)=>{
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push( user );
      
      this.users.next( Object.assign({}, this.dataStore).users);

      resolve(user);
    })
  }
}
