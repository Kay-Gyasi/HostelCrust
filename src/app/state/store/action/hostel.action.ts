import { Action } from "@ngrx/store";
import { Product } from "src/app/models/product";
import { HostelActionType } from "../enum/enum.enum";

export class LoadHostelAction implements Action {
  readonly type = HostelActionType.LOAD_HOSTEL;
}

export class LoadHostelSuccessAction implements Action {
  readonly type = HostelActionType.LOAD_HOSTEL_SUCCESS;

  constructor(public payload: Array<Product>) {}
}

export class LoadHostelFailureAction implements Action {
  readonly type = HostelActionType.LOAD_HOSTEL_FAILURE;

  constructor(public payload: Error) {}
}

export type HostelAction = LoadHostelAction | LoadHostelSuccessAction | LoadHostelFailureAction;

