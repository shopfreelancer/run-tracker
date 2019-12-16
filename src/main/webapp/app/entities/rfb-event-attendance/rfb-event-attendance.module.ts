import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RuntrackerSharedModule } from 'app/shared/shared.module';
import { RfbEventAttendanceComponent } from './rfb-event-attendance.component';
import { RfbEventAttendanceDetailComponent } from './rfb-event-attendance-detail.component';
import { RfbEventAttendanceUpdateComponent } from './rfb-event-attendance-update.component';
import { RfbEventAttendanceDeleteDialogComponent } from './rfb-event-attendance-delete-dialog.component';
import { rfbEventAttendanceRoute } from './rfb-event-attendance.route';

@NgModule({
  imports: [RuntrackerSharedModule, RouterModule.forChild(rfbEventAttendanceRoute)],
  declarations: [
    RfbEventAttendanceComponent,
    RfbEventAttendanceDetailComponent,
    RfbEventAttendanceUpdateComponent,
    RfbEventAttendanceDeleteDialogComponent
  ],
  entryComponents: [RfbEventAttendanceDeleteDialogComponent]
})
export class RuntrackerRfbEventAttendanceModule {}
