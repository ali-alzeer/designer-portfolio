import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getPosts(): Observable<any> {
    const posts = [
      {id : '1', title: "one"},
      {id : '2', title: "two"},
      {id : '3', title: "three"},
    ];
    return of(posts).pipe(delay(2000))
  }

}
