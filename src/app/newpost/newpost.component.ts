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
   * 
   */
  post(): void {
    let name = (document.getElementById("NAME") as HTMLInputElement).value;
    let message = (document.getElementById("MESSAGE") as HTMLInputElement).value;

    let date = new Date();
    let datetime = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;  // MM-DD-YYYY HH:mm

    this.database.newPost( name, message, datetime );
  }
}


