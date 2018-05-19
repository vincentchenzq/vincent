import fetch from '@/common/utils/fetch'
import router from '@/router'



function getPermission (params){
  return new Promise(function(resolve, reject){
      resolve({
        code:'888',
        data:router.options.routes
      })
  });

  // return fetch(
  //   {
  //     url:url,
  //     params:params || ''
  //   }
  // )
}

const Api = {
  getPermission
}

export default  Api
