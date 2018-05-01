import { BoardsComponent } from './components/boards/boards.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FaqComponent } from './components/faq/faq.component';
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
        path: 'asset/:id',
        component: ProductComponent
    },
    {
        path: 'manage/:id',
        component: ManageComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'boards',
        component: BoardsComponent
    },
    {
        path: 'aboutus',
        component: AboutusComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}
