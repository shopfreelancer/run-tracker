import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RuntrackerSharedModule } from 'app/shared/shared.module';
import { RuntrackerCoreModule } from 'app/core/core.module';
import { RuntrackerAppRoutingModule } from './app-routing.module';
import { RuntrackerHomeModule } from './home/home.module';
import { RuntrackerEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    RuntrackerSharedModule,
    RuntrackerCoreModule,
    RuntrackerHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    RuntrackerEntityModule,
    RuntrackerAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class RuntrackerAppModule {}
