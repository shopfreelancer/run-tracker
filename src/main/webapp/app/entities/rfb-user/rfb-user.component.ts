import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { RfbUserDeleteDialogComponent } from './rfb-user-delete-dialog.component';

@Component({
  selector: 'jhi-rfb-user',
  templateUrl: './rfb-user.component.html'
})
export class RfbUserComponent implements OnInit, OnDestroy {
  rfbUsers: IRfbUser[];
  eventSubscriber: Subscription;

  constructor(protected rfbUserService: RfbUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.rfbUserService.query().subscribe((res: HttpResponse<IRfbUser[]>) => {
      this.rfbUsers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInRfbUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRfbUser) {
    return item.id;
  }

  registerChangeInRfbUsers() {
    this.eventSubscriber = this.eventManager.subscribe('rfbUserListModification', () => this.loadAll());
  }

  delete(rfbUser: IRfbUser) {
    const modalRef = this.modalService.open(RfbUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rfbUser = rfbUser;
  }
}
