import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { RfbEventAttendanceDeleteDialogComponent } from './rfb-event-attendance-delete-dialog.component';

@Component({
  selector: 'jhi-rfb-event-attendance',
  templateUrl: './rfb-event-attendance.component.html'
})
export class RfbEventAttendanceComponent implements OnInit, OnDestroy {
  rfbEventAttendances: IRfbEventAttendance[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected rfbEventAttendanceService: RfbEventAttendanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.rfbEventAttendances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.rfbEventAttendanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IRfbEventAttendance[]>) => this.paginateRfbEventAttendances(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.rfbEventAttendances = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInRfbEventAttendances();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRfbEventAttendance) {
    return item.id;
  }

  registerChangeInRfbEventAttendances() {
    this.eventSubscriber = this.eventManager.subscribe('rfbEventAttendanceListModification', () => this.reset());
  }

  delete(rfbEventAttendance: IRfbEventAttendance) {
    const modalRef = this.modalService.open(RfbEventAttendanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rfbEventAttendance = rfbEventAttendance;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRfbEventAttendances(data: IRfbEventAttendance[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.rfbEventAttendances.push(data[i]);
    }
  }
}
