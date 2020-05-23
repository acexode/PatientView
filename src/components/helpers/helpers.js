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
    let dt =  new Date(date);   

    var h =  dt.getHours(), m = dt.getMinutes();
    var _time = (h > 12) ? (h-12 + ':' + m +' pm') : (h + ':' + m +' am');

    return _time;
} 
