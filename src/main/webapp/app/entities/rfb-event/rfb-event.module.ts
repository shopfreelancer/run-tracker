import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RuntrackerSharedModule } from 'app/shared/shared.module';
import { RfbEventComponent } from './rfb-event.component';
import { RfbEventDetailComponent } from './rfb-event-detail.component';
import { RfbEventUpdateComponent } from './rfb-event-update.component';
import { RfbEventDeleteDialogComponent } from './rfb-event-delete-dialog.component';
import { rfbEventRoute } from './rfb-event.route';

@NgModule({
  imports: [RuntrackerSharedModule, RouterModule.forChild(rfbEventRoute)],
  declarations: [RfbEventComponent, RfbEventDetailComponent, RfbEventUpdateComponent, RfbEventDeleteDialogComponent],
  entryComponents: [RfbEventDeleteDialogComponent]
})
export class RuntrackerRfbEventModule {}
