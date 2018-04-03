import { ManageComponent } from './components/manage/manage.component';
import { ProductComponent } from './components/product/product.component';
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
        path: 'search/:query',
        component: SearchComponent
    },
    {
        path: 'manage',
        component: ManageComponent
    },
    {
        path: 'product',
        component: ProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }