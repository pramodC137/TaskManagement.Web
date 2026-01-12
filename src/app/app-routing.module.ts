import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component'; // Import the component

const routes: Routes = [
  { path: 'auth', component: AuthComponent }, // Add route for AuthComponent
  { path: '', redirectTo: 'auth', pathMatch: 'full' } // Optional: redirect root to auth
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }