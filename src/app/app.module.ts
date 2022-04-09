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
import { NftPageComponent } from './pages/nft-page/nft-page.component';
import { PinataService } from './services/pinata.service';
import { NftBoxComponent } from './components/nft-box/nft-box.component';
import { PopUpCreateNftComponent } from './components/pop-up-create-nft/pop-up-create-nft.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 50
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    AuctionBoxComponent,
    PopUpCreateAuctionComponent,
    AuctionPageComponent,
    HeaderComponent,
    LandingPageComponent,
    NftPageComponent,
    NftBoxComponent,
    PopUpCreateNftComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [MetamaskService, PinataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
