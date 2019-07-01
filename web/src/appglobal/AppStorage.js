const AppStorage = {}
AppStorage.APP_TOKEN = 'APP_TOKEN'
AppStorage.APP_REFRESH_TOKEN = 'APP_REFRESH_TOKEN'

AppStorage.set = (key, value) =>{
    // console.log(`set ${key} : ${value}`)
    window.sessionStorage.setItem(key, value)
}
AppStorage.get = (key) =>{
    // console.log(`get ${key}`)
    return window.sessionStorage.getItem(key)||null
}
AppStorage.remove = (key) =>{
    // console.log(`remove ${key}`)
    window.sessionStorage.removeItem(key)
}
AppStorage.clear = () =>{
    window.sessionStorage.clear()
}
export default AppStorage