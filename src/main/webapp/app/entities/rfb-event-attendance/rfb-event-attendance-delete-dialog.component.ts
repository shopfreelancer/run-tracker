import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';

@Component({
  templateUrl: './rfb-event-attendance-delete-dialog.component.html'
})
export class RfbEventAttendanceDeleteDialogComponent {
  rfbEventAttendance: IRfbEventAttendance;

  constructor(
    protected rfbEventAttendanceService: RfbEventAttendanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfbEventAttendanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'rfbEventAttendanceListModification',
        content: 'Deleted an rfbEventAttendance'
      });
      this.activeModal.dismiss(true);
    });
  }
}
