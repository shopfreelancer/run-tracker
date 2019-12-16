import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IRfbUser, RfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from 'app/entities/rfb-location/rfb-location.service';

@Component({
  selector: 'jhi-rfb-user-update',
  templateUrl: './rfb-user-update.component.html'
})
export class RfbUserUpdateComponent implements OnInit {
  isSaving: boolean;

  homelocations: IRfbLocation[];

  editForm = this.fb.group({
    id: [],
    username: [],
    homeLocationId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfbUserService: RfbUserService,
    protected rfbLocationService: RfbLocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfbUser }) => {
      this.updateForm(rfbUser);
    });
    this.rfbLocationService.query({ filter: 'rfbuser-is-null' }).subscribe(
      (res: HttpResponse<IRfbLocation[]>) => {
        if (!this.editForm.get('homeLocationId').value) {
          this.homelocations = res.body;
        } else {
          this.rfbLocationService
            .find(this.editForm.get('homeLocationId').value)
            .subscribe(
              (subRes: HttpResponse<IRfbLocation>) => (this.homelocations = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(rfbUser: IRfbUser) {
    this.editForm.patchValue({
      id: rfbUser.id,
      username: rfbUser.username,
      homeLocationId: rfbUser.homeLocationId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfbUser = this.createFromForm();
    if (rfbUser.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbUserService.update(rfbUser));
    } else {
      this.subscribeToSaveResponse(this.rfbUserService.create(rfbUser));
    }
  }

  private createFromForm(): IRfbUser {
    return {
      ...new RfbUser(),
      id: this.editForm.get(['id']).value,
      username: this.editForm.get(['username']).value,
      homeLocationId: this.editForm.get(['homeLocationId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbUser>>) {
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

  trackRfbLocationById(index: number, item: IRfbLocation) {
    return item.id;
  }
}
