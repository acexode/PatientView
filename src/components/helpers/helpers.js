export const getDate= (date) =>{
    return new Date(date).toLocaleDateString()
}
export const getOTPState= (date) =>{
    return localStorage.getItem("noOTP")
}
export const hospitalInfo = () =>{
    return JSON.parse(localStorage.getItem("hData"))
}
export const User = () =>{
    return JSON.parse(localStorage.getItem("user"))
}
export const getTime = (date) =>{
    let time =  new Date(date).toLocaleTimeString().split(":")    
    if(parseInt(time[0]) <= 12){
        return time[0] + ":" + time[1] + ' am'
    }else{
        return  parseInt(time[0]) - 12 + ":" + time[1] + ' pm'
    }
} 