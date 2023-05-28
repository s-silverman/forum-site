/**
 * New Post page TypeScript
 * @author Sydney Silverman
*/

import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent {

  constructor( private database:DatabaseService ){}

  /**
   * add a new post to database
   * get name and message from input fields, generate date and time on submit
   */
  post(): void {
    //get name from input
    let name = (document.getElementById("NAME") as HTMLInputElement).value;

    //get message from input
    let message = (document.getElementById("MESSAGE") as HTMLInputElement).value;


    //generate date and time
    let date = new Date();

    let hours = date.getHours();
    let flag = 'AM';
    if( hours > 11 ){   //change flag from AM to PM
      flag = 'PM';

      if( hours > 12){  //convert to 12 hour time
        hours -= 12;
      }
    }

    let minutes = '' + date.getMinutes();
    if( minutes.length < 2 ){ minutes = '0' + minutes }   //if single digit, add 0 before
  
    let datetime = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes}${flag}`;  // MM-DD-YYYY HH:mm

    this.database.newPost( name, message, datetime );
  }
}


