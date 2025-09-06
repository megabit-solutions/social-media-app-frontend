import { axiosInstance } from '../lib/axios';
import { setAccessToken } from '../features/auth/authSlice';
import { scheduleProactiveRefresh } from '../features/auth/tokenScheduler';

export async function initAuth(store) {
    try {
        const res = await axiosInstance.post('/users/refresh');
        console.log(res);
        const token = res?.data?.data?.accessToken;
        if (token) {
            store.dispatch(setAccessToken(token));
            scheduleProactiveRefresh(store, token);
        }
    } catch (err) {
        console.log(err);
        // no refresh cookie / not logged in — that's fine
    }
}
