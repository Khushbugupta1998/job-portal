import {combineReducers} from 'redux'
import authReducer from './slices/authSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth:authReducer
})

const persistConfig = {
    key:'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store)