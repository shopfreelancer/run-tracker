import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IRfbEventAttendance, RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { IRfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from 'app/entities/rfb-event/rfb-event.service';
import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from 'app/entities/rfb-user/rfb-user.service';

@Component({
  selector: 'jhi-rfb-event-attendance-update',
  templateUrl: './rfb-event-attendance-update.component.html'
})
export class RfbEventAttendanceUpdateComponent implements OnInit {
  isSaving: boolean;

  rfbevents: IRfbEvent[];

  rfbusers: IRfbUser[];
  attendanceDateDp: any;

  editForm = this.fb.group({
    id: [],
    attendanceDate: [],
    rfbEventId: [],
    rfbUserId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfbEventAttendanceService: RfbEventAttendanceService,
    protected rfbEventService: RfbEventService,
    protected rfbUserService: RfbUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfbEventAttendance }) => {
      this.updateForm(rfbEventAttendance);
    });
    this.rfbEventService
      .query()
      .subscribe((res: HttpResponse<IRfbEvent[]>) => (this.rfbevents = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.rfbUserService
      .query()
      .subscribe((res: HttpResponse<IRfbUser[]>) => (this.rfbusers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rfbEventAttendance: IRfbEventAttendance) {
    this.editForm.patchValue({
      id: rfbEventAttendance.id,
      attendanceDate: rfbEventAttendance.attendanceDate,
      rfbEventId: rfbEventAttendance.rfbEventId,
      rfbUserId: rfbEventAttendance.rfbUserId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfbEventAttendance = this.createFromForm();
    if (rfbEventAttendance.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbEventAttendanceService.update(rfbEventAttendance));
    } else {
      this.subscribeToSaveResponse(this.rfbEventAttendanceService.create(rfbEventAttendance));
    }
  }

  private createFromForm(): IRfbEventAttendance {
    return {
      ...new RfbEventAttendance(),
      id: this.editForm.get(['id']).value,
      attendanceDate: this.editForm.get(['attendanceDate']).value,
      rfbEventId: this.editForm.get(['rfbEventId']).value,
      rfbUserId: this.editForm.get(['rfbUserId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbEventAttendance>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRfbEventById(index: number, item: IRfbEvent) {
    return item.id;
  }

  trackRfbUserById(index: number, item: IRfbUser) {
    return item.id;
  }
}
