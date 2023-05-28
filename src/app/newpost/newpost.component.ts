/**
 * New Post page TypeScript
 * @author Sydney Silverman
*/

import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';   //necessary?

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
  post(){
    //TODO implement
  }
}
