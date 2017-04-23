import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { EmailComponent } from '../../components/email/email.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { ContainerComponent } from '../../components/container/container.component';
import { AboutComponent } from '../../components/about/about.component';
import { BlogComponent } from '../../components/blog/blog.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { AuthGuard } from '../../auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/app/about', pathMatch:'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'login-email',  component: EmailComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'app', component: ContainerComponent, children:[
    {path: 'about', component: AboutComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'projects', component: ProjectsComponent}
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class RoutesModule { }
