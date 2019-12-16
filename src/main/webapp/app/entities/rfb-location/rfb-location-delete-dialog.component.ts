import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';

@Component({
  templateUrl: './rfb-location-delete-dialog.component.html'
})
export class RfbLocationDeleteDialogComponent {
  rfbLocation: IRfbLocation;

  constructor(
    protected rfbLocationService: RfbLocationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfbLocationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'rfbLocationListModification',
        content: 'Deleted an rfbLocation'
      });
      this.activeModal.dismiss(true);
    });
  }
}
