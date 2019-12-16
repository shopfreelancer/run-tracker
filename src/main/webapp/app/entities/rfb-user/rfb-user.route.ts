import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { RfbUserComponent } from './rfb-user.component';
import { RfbUserDetailComponent } from './rfb-user-detail.component';
import { RfbUserUpdateComponent } from './rfb-user-update.component';
import { IRfbUser } from 'app/shared/model/rfb-user.model';

@Injectable({ providedIn: 'root' })
export class RfbUserResolve implements Resolve<IRfbUser> {
  constructor(private service: RfbUserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfbUser> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((rfbUser: HttpResponse<RfbUser>) => rfbUser.body));
    }
    return of(new RfbUser());
  }
}

export const rfbUserRoute: Routes = [
  {
    path: '',
    component: RfbUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfbUserDetailComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfbUserUpdateComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfbUserUpdateComponent,
    resolve: {
      rfbUser: RfbUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfbUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];
