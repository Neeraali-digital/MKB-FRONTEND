import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ListingComponent } from './pages/listing/listing';
import { PropertyDetailComponent } from './pages/property-detail/property-detail';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'MKB Developers - Premium Properties'
    },
    {
        path: 'properties',
        component: ListingComponent,
        title: 'Properties - MKB Developers'
    },
    {
        path: 'property/:id',
        component: PropertyDetailComponent,
        title: 'Property Details - MKB Developers'
    },
    {
        path: 'contact',
        redirectTo: '', // Placeholder
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
