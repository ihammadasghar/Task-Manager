import { fetchGet } from "../../utils/api";
import { alertActions } from "./slice";
import { ONE_MINUTE } from "../../utils/constants";

const getAlerts = (lastAlertFetchDt) => {
    return async (dispatch) => {
        if(((new Date()) - lastAlertFetchDt) > ONE_MINUTE){
            try {
                const response = await fetchGet('/api/app-alerts.php');
                if(response){
                dispatch(alertActions.replaceAlert(response));
            }
            } catch (err) { console.log("ERROR_FETCHING_ALERTS"); }
        }
    };
};

export default getAlerts;