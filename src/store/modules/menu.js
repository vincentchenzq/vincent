import Api from '@/common/api/permission';
const menu = {
  state:{
    hiddenSidebar:false,
    activeKey:'',
    list:[],
    routers:[],
    roleList:[]
  },

  mutations:{
    SET_MENU_ACTIVE_KEY:(state, key) =>{
      state.activeKey = key;
    },
    SET_MENU_LIST: (state, list) => {
      state.list = list;
    },
    SET_HIDDEN_SEDEBAR: (state, flag) => {
      state.hiddenSidebar = flag;
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
    },
    SET_ROLE_LIST: (state, roleList) => {
      state.roleList = roleList;
    }
  },

  actions:{
    getPermission({ commit }, params){
      return new Promise((resolve, reject) => {
        Api.getPermission('').then((response) => {
          const menus = response.data;
          commit('SET_ROUTERS', menus);
          resolve(response.data);
        }).catch((error) =>{
          reject(error);
        });
      });
    }
  }

};


export default menu
