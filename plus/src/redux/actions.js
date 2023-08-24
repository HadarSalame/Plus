//user
export function addUser(newUser){
    return{type:'ADD_USER',payLoad:newUser}
}

export function updateUser(user){
    return{type:'UPDATE_USER',payLoad:user}
}

export function signhoutUser(user){
    return{type:'SINGHOUT_USER',payLoad:user}
}

//month
export function selectMonth(month){
    return{type:'SELECT_MONTH',payLoad:month}
}

export function updateMonth(month){
    return{type:'UPDATE_MONTH',payLoad:month}
}

//expenses
export function addExpense(expense){
    return{type:'ADD_EXPENSE',payLoad:expense}
}

export function updateExpense(expense){
    return{type:'UPDATE_EXPENSE',payLoad:expense}
}


