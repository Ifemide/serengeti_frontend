import { AuthComponent } from './components/auth/auth.component';
import { SearchComponent } from './components/search/search.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'campaign',
        component: CampaignComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }