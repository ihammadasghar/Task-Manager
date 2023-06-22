import { fetchGet, fetchPost } from "../../utils/api";
import { authActions } from "./slice";
import { uiActions } from "../ui/slice";

const login = (inputData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetchPost('api/ai-teachers-login-j.php', inputData);
            if (response?.success) {
                dispatch(uiActions.setState({ name: "notification", value: null }));
                const respUser = {
                    name: response.message,
                    password: inputData.apppassword,
                    fullName: response.FullName,
                    permission: response.permission,
                    org: response.Org,
                    taskboards: response.taskboards
                }
                dispatch(authActions.setUser(respUser));
                navigate('/dashboard');

                const payload = {
                    name: response.message,
                    password: inputData.apppassword,
                    _token: inputData.csrfId
                }

                const sessionResp = await fetchPost('api/create-user-session', payload);
                if (sessionResp?.success) {
                    dispatch(authActions.setLaravelSession());
                }
            } else {
                dispatch(uiActions.showNotification({ type: "error", message: response?.message, open: true }));
            }
        } catch (err) {
            dispatch(uiActions.showNotification({ type: "error", message: "Login error", open: true }));
        }
    };
};

const getSignature = () => {
    return async (dispatch) => {
        try {
            const response = await fetchGet('api/user-signature');
            if (response?.signature) {
                dispatch(authActions.setSignature(response));
            }
        } catch (err) {
            console.log("FAILED Signature Response", err);
        }
    };
};

export { login, getSignature }
