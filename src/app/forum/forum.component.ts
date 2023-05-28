/**
 * New Post page TypeScript
 * @author Sydney Silverman
*/

import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  posts: any[] = [];

  constructor( private database:DatabaseService ){}

  ngOnInit(): void {
    this.database.getPosts().then(
      (response) => response.json()     //convert promise to json
    ).then(
      (data) => {
        this.posts = data;              //data['something'] ???
      }
    )
  }
}
