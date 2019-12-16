import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';

@Component({
  templateUrl: './rfb-user-delete-dialog.component.html'
})
export class RfbUserDeleteDialogComponent {
  rfbUser: IRfbUser;

  constructor(protected rfbUserService: RfbUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfbUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'rfbUserListModification',
        content: 'Deleted an rfbUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}
