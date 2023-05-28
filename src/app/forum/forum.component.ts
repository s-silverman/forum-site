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
    this.database.getAllPosts().then(
      (response) => response.json()
    ).then(
      (data) => {
        this.posts = data['message'];
      }
    );
  }
}
