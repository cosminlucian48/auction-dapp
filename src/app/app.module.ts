import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';
import { AuctionBoxComponent } from './components/auction-box/auction-box.component';
import { HeaderComponent } from './components/header/header.component';
import { PopUpCreateAuctionComponent } from './components/pop-up-create-auction/pop-up-create-auction.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuctionPageComponent } from './pages/auction-page/auction-page.component';
import { AppRoutingModule } from './app-routing.module';
import { MetamaskService } from './services/metamask.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    AuctionBoxComponent,
    PopUpCreateAuctionComponent,
    AuctionPageComponent,
    HeaderComponent,
    LandingPageComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
  ],
  providers: [MetamaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
