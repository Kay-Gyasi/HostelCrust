import { ActionReducerMap } from "@ngrx/store";
import { hostelReducer, HostelState } from "./hostel.reducer";


export const rootReducer = {};

export interface AppState {
  hostel: HostelState
}

export const reducers: ActionReducerMap<any, any> = {
  hostel: hostelReducer
}
