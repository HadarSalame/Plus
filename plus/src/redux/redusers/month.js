import { produce } from "immer";
import axios from "axios";

const initialState = {
  month: {},
};

const reducer = produce((state, action) => {
  switch (action.type) {
    case "SELECT_MONTH":
      {
        state.month = action.payLoad;
        console.log(state.month, "state addusertoredux");
      }

      break;

    case "UPDATE_MONTH":
      {
        state.month = action.payLoad;
        // axios
        //   .patch(
        //     `http://localhost:3030/api/v1/month/${state.month._id}`,
        //     state.month
        //   )
        //   .then((res) => {
        //     if (!res.data) {
        //       console.log("update month not working");
        //     } else {
        //       console.log(res.data);
        //     }
        //   });
      }
      break;
  }
}, initialState);

export default reducer;
