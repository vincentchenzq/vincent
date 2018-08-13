//引入mockjs
const Mock = require('mockjs');
//使用mockjs模拟数据
Mock.mock('/api/data', (req, res) => {
    return {
        code: '888',
        msg: '',
        data: {
            userId: 'Vincent123',
            userName: 'Vincent'
        }
    }
});


Mock.mock('/api/menu-list', (req, res) => {
    return {
        code: '888',
        msg: '',
        data: [
            {
                name: "用户信息管理",
                index: '1',
                className: "fa fa-user-md",
                children: [
                    {
                        path: "/HelloWorld",
                        name: "选项1"
                    },
                    {
                        path: "/hello",
                        name: "选项2"
                    },
                    {
                        path: '/imageModify',
                        name: "图片修改"
                    },
                    {
                        path: '/canvas',
                        name: '涂鸦'
                    },
                    {
                        path: '/schart',
                        name: '图表'
                    }
                ]
            },
            {
                name: "这真的是待办项",
                index: '2',
                className: "fa fa-bookmark",
                children: [
                    {
                        path: "/todoItem",
                        name: "待办项"
                    }

                ]
            }
        ]
    }
});
