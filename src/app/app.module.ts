import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './Pipes/filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AlertifyService } from './services/alertify.service';
import { SharedService } from './services/shared.service';
import { FooterComponent } from './components/footer/footer.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { SortPipe } from './Pipes/sort.pipe';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/store/reducer';
import { HostelEffects } from './state/effect/hostel.effect';
import { PhoneFooterComponent } from './components/phone-footer/phone-footer.component';
import { MobileItemCardComponent } from './components/mobile-item-card/mobile-item-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ItemCardComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    FilterPipe,
    SortPipe,
    PhoneFooterComponent,
    MobileItemCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([HostelEffects])
  ],
  providers: [AlertifyService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
