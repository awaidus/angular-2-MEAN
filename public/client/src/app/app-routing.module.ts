import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

