import jwtDecode from 'jwt-decode'
const JwtUtil = {}
JwtUtil.decode = (token) => {
    console.log(token)
    if (!token || token === 'undefined') return
    return jwtDecode(token)
}
JwtUtil.isExpired = (token) => {
    console.log(token)
    if (!token || token === 'undefined') {
        return true
    }
    console.log(token)
    let data = jwtDecode(token)
    console.log(JSON.stringify(data))
    let exp = new Date(data.exp * 1000)
    let now = new Date()
    return exp < now
}
export default JwtUtil