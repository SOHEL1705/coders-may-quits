import { Routes } from '@angular/router';
import { LoginComponent } from './components/header/login/login.component';
import { SignUpComponent } from './components/header/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import { AboutComponent } from './components/header/about/about.component';
import { CreateSnipComponent } from './components/header/create-snip/create-snip.component';
import { authGuard } from './authguard/auth.guard';
import { HomeComponent } from './components/header/home/home.component';
import { ViewSnipComponent } from './components/header/view-snip/view-snip.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'create-snip',component:CreateSnipComponent,canActivate:[authGuard]},
  {path:'about',loadComponent: () => import('./components/header/about/about.component').then(mod => mod.AboutComponent)},
  // {path:'' , redirectTo:'/login',pathMatch:'full'},
  {path:'view-snip/:id',component:ViewSnipComponent},
  {path:'**',component:NotFoundComponent},
];