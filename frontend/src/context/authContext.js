import PropTypes from 'prop-types';
import {createContext, useEffect, useReducer} from 'react';
import {isValidToken, setSession} from "../utils/helpers";
import {axiosInstance} from "../utils/axios";
import jwtDecode from 'jwt-decode'


const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    registered: false,
    user: null,
}

const handlers = {
    INITIALIZE: (state, action) => {
        const {isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {

        const {user} = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    REGISTER: (state, action) => ({
        ...state,
        ...action.payload,
    }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);


const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
    initialize: () => Promise.resolve()
});

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        initialize();
    }, []);


    const initialize = async () => {
        try {
            const accessToken = JSON.parse(localStorage.getItem('accessToken'));

            if (accessToken.token && isValidToken(accessToken)) {
                setSession(accessToken);

                const response = await axiosInstance.get('/user/info');
                let {user} = response.data.data;

                if (response.data.data.rating) {
                    const {rating} = response.data.data
                    user = {
                        ...user,
                        rating
                    }
                }


                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            } else {
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (err) {
            dispatch({
                type: 'INITIALIZE',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    const login = async (name, password) => {
        const response = await axiosInstance.post('/login/', {
            username: name,
            password,
        });

        let {access, refresh} = response.data;

        const {user_id, email, username, exp} = jwtDecode(access)

        setSession({token: access, exp});
        console.log(user_id, email, username, exp)
        dispatch({
            type: 'LOGIN',
            payload: {
                user: {
                    id: user_id,
                    email,
                    username
                }
            },
        });
    };

    const loginOnRegister = async (user, token) => {

        setSession(token);
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        });
    };

    const register = async (data) => {
        const response = await axiosInstance.post('/user/', data);

        if (data.type === 'Client') {
            const {token, user} = response.data.data;

            setSession(token)
            dispatch({
                type: 'LOGIN',
                payload: {
                    user
                }
            });

            return;
        }

        const {msg} = response.data

        dispatch({
            type: 'REGISTER',
            payload: {
                registered: true,
                message: msg
            }
        });
    };

    const logout = async () => {
        setSession(null);
        dispatch({type: 'LOGOUT'});
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                register,
                loginOnRegister,
                initialize,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};

