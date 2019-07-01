import JwtUtil from '../Utils/JwtUtil'
import ApiConfig from '../api/ApiConfig'
import AppStorage from './AppStorage'
const AppManager = {}


AppManager.refreshToken = function () {
    // console.log('refreshToken...');
    let token = AppStorage.get(AppStorage.APP_REFRESH_TOKEN)
    if(JwtUtil.isExpired(token)){
        token = AppStorage.get(AppStorage.APP_TOKEN)
        if(JwtUtil.isExpired(token)){
            token = null
        }
    }
    // console.log(JwtUtil.isExpired( AppStorage.get(AppStorage.APP_TOKEN))) 
    let config = {
        method: 'post',
        url: '/auth/refresh/token',
        data: { token }
    }
    ApiConfig.request(config).then((res)=>{
        // console.log('refreshToken finished..');
        // console.log(res.data.data.token);
        if(res.data&&res.data.data.token){
            console.log("Set Session....")
            AppStorage.set(AppStorage.APP_TOKEN,res.data.data.token )
        }else{
            console.log("Remove Session....")
            AppStorage.remove(AppStorage.APP_TOKEN)
        }
    }).catch(error => {
        console.log(error.response)
        AppStorage.remove(AppStorage.APP_TOKEN)
    })
}
AppManager.refreshToken()
AppManager.init = ()=> setInterval(() => {
    AppManager.refreshToken()
}, 1500000)

export default AppManager