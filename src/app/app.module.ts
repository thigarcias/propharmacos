import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TextFieldModule} from '@angular/cdk/text-field';
import { MarkdownModule, MarkdownService } from "ngx-markdown";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ChatgptComponent } from "./chatgpt/chatgpt.component";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatgptComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    TextFieldModule,
    MarkdownModule.forRoot(),
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [MarkdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
