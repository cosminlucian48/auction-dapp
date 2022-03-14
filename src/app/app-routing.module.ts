import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionPageComponent } from './pages/auction-page/auction-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'auction',
        component: AuctionPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
