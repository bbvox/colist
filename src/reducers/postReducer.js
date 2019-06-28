import {
  START_FETCH,
  FETCH_POSTS,
  START_POST,
  NEW_POST,
  CLICK_MENU
} from "../actions/types";

const initialState = {
  items: [],
  item: {}
};

//START_FETCH - preloading get posts ...
//START_POST - preloading make NEW posts ...
export default function(state = initialState, action) {
  switch (action.type) {
    case START_FETCH:
      return {
        ...state,
        startFlag: true
      };
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
        startFlag: false
      };
    case START_POST:
      return {
        ...state,
        startFlag: true
      };
    case NEW_POST:
      console.log("reducer new POST ;;", action.payload);
      return {
        ...state,
        item: action.payload,
        startFlag: false
      };
    case CLICK_MENU:
      console.log("reducer click MENU;;", state);
      return {
        ...state,
        menuId: action.menuId
      };
    default:
      return state;
  }
}
