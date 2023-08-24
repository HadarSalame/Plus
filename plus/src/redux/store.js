import { createStore, combineReducers } from 'redux';
import { produce } from 'immer';
import user from './redusers/user'
import month from './redusers/month'
import expenses from './redusers/expense'



const reducer = combineReducers({User:user,Month:month,Expenses:expenses})

const store = createStore(reducer);
window.store = store;
export default store;