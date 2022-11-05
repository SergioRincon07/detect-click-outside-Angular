import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ClickOutsideMethod1Directive } from './shared/directives/click-outside-method1.directive';
import { ClickOutsideMethod2Directive } from './shared/directives/click-outside-method2.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideMethod1Directive, 
    ClickOutsideMethod2Directive
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
