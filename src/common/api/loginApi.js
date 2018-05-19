import fetch from '@/common/utils/fetch'

function login (url,params){
  return fetch(
    {
      url:url,
      params:params || ''
    }
  )
}

export default  {
  login
}
