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
export  function queryFriend(params) {
  return ajax({
    method:'get',
    params: params,
    url: 'users/friend',
  })
}
export  function addFriend(data) {
  return ajax({
    method:'post',
    data: data,
    url: 'users/addFriend',
  })
}
export  function getFriends(uid) {
  let params ={
    t: new Date()
  }
  return ajax({
    method:'get',
    params: params,
    url: 'json/'+ uid + '_fri.json',
  })
}
/*export  function query() {
  return ajax({
    method:'get',
    url: 'users',
  })
}*/
