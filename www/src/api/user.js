import ajax from '../util/ajax'

export  function register(data) {
  return ajax({
    method:'post',
    url: 'users/register',
    data: data
  })
}
export  function login(data) {
  return ajax({
    method:'post',
    url: 'users/login',
    data: data
  })
}
// export  function query() {
//   return ajax({
//     method:'get',
//     url: 'users',
//   })
// }
