import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  serverURL: string = "http://127.0.0.1:5000";  //local host

  constructor() { }

  /**
   * return an array of posts
   */
  getPosts(): Promise<any> {
    //TODO implement
    return fetch( this.serverURL + "/getPosts", 
    {
      method: 'GET',
      headers:
        {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*'
        }
    })
  }

  newPost( name:string, message:string, datetime:string ): void {
    const body = {
      name: name,
      message: message,
      datetime: datetime
    }
    
    fetch( this.serverURL + "/newPost",
    {
      method: 'PUT',
      headers:
        {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*'
        },
      body: JSON.stringify( body )
    })
  }
}
