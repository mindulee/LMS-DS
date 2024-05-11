import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware } from 'redux';
//import { composeWithDevTools } from '@redux-devtools/extension';
import AuthSliceReducer from "./Slices/AuthSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";
import StatSliceReducer from "./Slices/StatSlice";
import {
    deleteJobReducer, 
    loadJobReducer, 
    loadJobSingleReducer, 
    registerAjobReducer 
} from './reducers/jobReducer';
import { 
    createJobTypeReducer, 
    loadJobTypeReducer 
} from './reducers/jobTypeReducer';
import {
    allUserReducer,
    userApplyJobReducer,
    userReducerLogout,
    userReducerProfile,
    userReducerSignIn,
    userReducerSignUp
} from './reducers/userReducer';
import { modeReducer } from './reducers/themeModeReducer';

// Combine reducers from both configurations
const rootReducer = combineReducers({
    auth: AuthSliceReducer,
    razorpay: RazorpaySliceReducer,
    stat: StatSliceReducer,
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    mode: modeReducer,
    registerJob: registerAjobReducer,
    deleteJob: deleteJobReducer,
    createJobType: createJobTypeReducer
});

// Initial state combining both initial states
const initialState = {
    auth: {}, // Add initial state for AuthSlice if needed
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    mode: {
        mode: "light"
    }
};

// Setup middleware
const middleware = [thunk];

// Create the store
const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware,
    devTools: true
});

export default store;
