import  {axiosInstance} from './axios'

// ----------------------------------------------------------------------

const isValidToken = (exp_date) => {

    if (!exp_date) {
        return false;
    }
    const exp = new Date(exp_date).getTime()
    const currentTime = Date.now() / 1000;

    return exp > currentTime;
};


const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export {isValidToken, setSession};