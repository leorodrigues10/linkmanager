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
    message: ''
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
            const {user_id, email, name, exp} = jwtDecode(accessToken)

            if (accessToken && isValidToken(exp)) {
                setSession(accessToken);

                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: true,
                        user: {
                            id: user_id,
                            email,
                            name
                        }
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

    const login = async (username, password) => {
        const response = await axiosInstance.post('/login/', {
            username,
            password,
        });

        let {access, refresh} = response.data;

        const {user_id, email, name, exp} = jwtDecode(access)

        setSession(access);

        dispatch({
            type: 'LOGIN',
            payload: {
                user: {
                    id: user_id,
                    email,
                    name
                }
            },
        });
    };


    const register = async (data) => {

        await axiosInstance.post('/auth/register/', data);

        dispatch({
            type: 'REGISTER',
            payload: {
                registered: true,
                message: "Utilizador registrado com sucesso, faça o login"
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
                initialize,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};

