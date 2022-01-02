import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { SharedService } from "src/app/services/shared.service";
import { LoadHostelAction, LoadHostelFailureAction, LoadHostelSuccessAction } from "../store/action/hostel.action";
import { HostelActionType } from "../store/enum/enum.enum";

@Injectable()
export class HostelEffects{

  loadProducts$ = createEffect(() => this.actions$
  .pipe(
    ofType<LoadHostelAction>(HostelActionType.LOAD_HOSTEL),
    mergeMap(
      () => this.service.GetProducts()
      .pipe(
        map(data => new LoadHostelSuccessAction(data)),
        catchError(error => of(new LoadHostelFailureAction(error)))
        )
    )
  ));

    constructor(private service:SharedService, private actions$:Actions) {
    }
}
