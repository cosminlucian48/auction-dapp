import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionPageComponent } from './pages/auction-page/auction-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NftPageComponent } from './pages/nft-page/nft-page.component';


const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'auction',
        component: AuctionPageComponent
    },
    {
      path: 'nft',
      component:NftPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
