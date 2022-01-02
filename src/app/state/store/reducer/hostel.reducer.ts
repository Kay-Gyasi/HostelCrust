import { Product } from "src/app/models/product";
import { HostelAction } from "../action/hostel.action";
import { HostelActionType } from "../enum/enum.enum";


export interface HostelState{
  list: Product[],
  loading: boolean,
  error: Error
}

export const initialState:HostelState = {
  list: [],
  loading: false,
  error: Error()
}

export function hostelReducer(state:HostelState = initialState, action: HostelAction){
  switch(action.type){
    case HostelActionType.LOAD_HOSTEL:
      return {
        ...state,
        loading: true
      }

    case HostelActionType.LOAD_HOSTEL_SUCCESS:
      return{
        ...state,
        list: action.payload,
        loading: false
      }

    case HostelActionType.LOAD_HOSTEL_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
}
