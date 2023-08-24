import { produce } from "immer";
import axios from "axios";

const initialState = {
  user: {},
  loginUser: false,
};

const reducer = produce((state, action) => {
  switch (action.type) {
    case "ADD_USER":
      {
        state.user = action.payLoad;
        state.loginUser = true;

        console.log(state.user, "state addusertoredux");
      }

      break;

    case "SINGHOUT_USER":
      {
        state.loginUser = false;
      }

      break;
    case "UPDATE_USER":
      {
        state.user = action.payLoad;
      }
      break;
  }
}, initialState);

export default reducer;
