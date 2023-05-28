import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForumComponent } from './forum/forum.component';
import { NewpostComponent } from './newpost/newpost.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'forum', pathMatch: 'full'},
  { path: 'forum', component: ForumComponent },
  { path: 'newPost', component: NewpostComponent },

  { path: '**', component: PagenotfoundComponent }  //always keep at end
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
