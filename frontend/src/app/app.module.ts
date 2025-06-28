import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// BrowserAnimationsModule is NO LONGER needed here
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // REMOVED BrowserAnimationsModule from here
    HttpClientModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync() // This is now the single source for animations
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }