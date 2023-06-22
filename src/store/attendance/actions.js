import { attendanceActions } from "./slice";
import { fetchPost } from "../../utils/api";
import store from '../../store';

const getStaffList = () => {
    return async (dispatch) => {
        const state = store.getState();
        const inputData = {
            appuser: state.auth.user.name,
            apppassword: state.auth.user.password
        }

        try {
            const response = await fetchPost('/api/app-staff-list.php', inputData);
            if (response?.success) {
                dispatch(attendanceActions.setState({ name: "staffList", value: response.data }));
            }
            // if (process.env.REACT_APP_ENV === "DEV"){ // Uncomment when required.
            //     console.log(response);
            // }
        } catch (err) {
            if (process.env.REACT_APP_ENV === "DEV") {
                console.log(err);
            }
        }
    };
};

export { getStaffList };