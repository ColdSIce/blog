import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './modules/routes/routes.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContainerComponent } from './components/container/container.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AngularFireModule } from 'angularfire2';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostComponent } from './components/post/post.component';
import { PostService } from './services/post.service';
import { MessageService } from './services/message.service';
import { CommentService } from './services/comment.service';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { MarkdownModule } from 'angular2-markdown';
import { ImagesManagementComponent } from './components/images-management/images-management.component';

export const firebaseconfig = {
  apiKey: "AIzaSyDE4CprlYX0gq8xxDfSSjxXj59vdskZt7c",
  authDomain: "alekhin-fe5f3.firebaseapp.com",
  databaseURL: "https://alekhin-fe5f3.firebaseio.com",
  projectId: "alekhin-fe5f3",
  storageBucket: "alekhin-fe5f3.appspot.com",
  messagingSenderId: "391544182696"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    AboutComponent,
    BlogComponent,
    ProjectsComponent,
    EmailComponent,
    SignupComponent,
    PageNotFoundComponent,
    PostComponent,
    PostManagementComponent,
    ImagesManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    AngularFireModule.initializeApp(firebaseconfig),
    MarkdownModule.forRoot()
  ],
  providers: [
    AuthGuard,
    PostService,
    CommentService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
