import fetch from '@/common/utils/fetch'
import router from '@/router'


function getPermission(params) {
    return new Promise(function (resolve, reject) {
        resolve({
            code: '888',
            data: router.options.routes
        })
    });

    // return fetch(
    //   {
    //     url:url,
    //     params:params || ''
    //   }
    // )
}

function getData(params) {
    return fetch({
        url: '/api/data',
        params: params || {}
    });
}

function getMenuList(params) {
    return fetch({
        url: '/api/menu-list',
        params: params || {}
    });
}

const Api = {
    getPermission,
    getData,
    getMenuList
}

export default Api
