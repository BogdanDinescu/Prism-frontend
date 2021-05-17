import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsArticleComponent } from './components/news-article/news-article.component';
import { NewsComponent } from './components/news/news.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddSourceModalComponent } from './components/add-source-modal/add-source-modal.component';
import { ModifySourceModalComponent } from './components/modify-source-modal/modify-source-modal.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NewsArticleCarouselComponent } from './components/news-article-carousel/news-article-carousel.component';
import { AboutComponent } from './pages/about/about.component';
import { NgBootstrapDarkmodeModule, THEME_LOADER, THEME_SAVER} from 'ng-bootstrap-darkmode';
import { DeleteUserModalComponent } from './components/delete-user-modal/delete-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NewsArticleComponent,
    NewsComponent,
    SettingsComponent,
    AddSourceModalComponent,
    ModifySourceModalComponent,
    NotFoundPageComponent,
    ChangePasswordModalComponent,
    MeteoComponent,
    NewsArticleCarouselComponent,
    AboutComponent,
    DeleteUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgBootstrapDarkmodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ AddSourceModalComponent, ModifySourceModalComponent, ChangePasswordModalComponent, DeleteUserModalComponent ]
})
export class AppModule { }
