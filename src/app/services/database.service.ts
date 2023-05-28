import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  flaskEndpoint="http://localhost:4200/";

  constructor() { }

  /**
   * return an array of posts
   */
  getPosts(): any[] {
    //TODO implement
    return [];
  }

  getAllPosts(): Promise<any>{
    return fetch(this.flaskEndpoint + "/test",
    {
      method: 'GET',
      headers: {
        'Conent-Type': 'application/json',
        'Access-Control-Request-Headers': '*'
      }
    });
  }
}
