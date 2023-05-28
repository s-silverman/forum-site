import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  serverURL: string = "http://127.0.0.1:5000";  //local host, comment out when actually hosted

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

  /**
   * send new post to server to be saved in database
   * <br>
   * @param name        (string),   name of author
   * @param message     (string),   message of post
   * @param datetime    (string),   date and time posted
   */
  newPost( name:string, message:string, datetime:string ): void {

    //add name, message, and datetime to body of request
    const body = {
      name: name,
      message: message,
      datetime: datetime
    }

    //send put request
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
