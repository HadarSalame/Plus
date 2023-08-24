import { produce } from "immer";
import axios from "axios";

const initialState = {
  expense: {},
};

const reducer = produce((state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      {
        state.expense = action.payLoad;
        console.log(state.expense, "state addusertoredux");
      }

      break;

    case "UPDATE_EXPENSE":
      {
        state.expense = action.payLoad;
      }
      break;
  }
}, initialState);

export default reducer;
