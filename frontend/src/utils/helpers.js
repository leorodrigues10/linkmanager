import  {axiosInstance} from './axios'

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {

    if (!accessToken) {
        return false;
    }
    const exp = new Date(accessToken.exp).getTime()
    const currentTime = Date.now() / 1000;

    return exp > currentTime;
};


const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken.token));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken.token}`;
    } else {
        localStorage.removeItem('accessToken');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export {isValidToken, setSession};