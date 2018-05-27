import store from 'src/common/utils/Tabs';

const TAB_ID_FOLLOW_ROUTER = false;

//默认页面
const DEFAULT_TAB = {
    id: TAB_ID_FOLLOW_ROUTER ? "expert" : "_expert",
    title: '专家查询',
    path: '/expert'
};

const DEFAULT_PAGE = DEFAULT_TAB.id;

const SPECIAL_CHARS_REGEXP = /([:\-_]+(_))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => (offset ? letter.toUpperCase() : letter)).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

export function getStyle(element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element[styleName]
    }

}


function getRouterComp(router, path, routers) {

    for (let i = 0; i < routers.length; i++) {
        const it = routers[i];
        if (it.path === path) {
            router.push(it)
            return router
        } else if (it.children) {
            const comRouter = getRouterComp(router, path, it.children)
            if (comRouter) {
                return comRouter.splice(0, 0, it)
            }
        }

    }
    return null;
}


function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&ngsp;')
        .replace(/"/g, '&#34;')
        .replace(/'/g, '&#39;')
}

export const Tabs = {
    DEFAULT_TAB,
    initTab(to, routers) {
        const path = to.path;
        const self = this;

        const findRouterComponent = (currentPath, routersRegistry) => {
            if (window.refreshPage) {
                if (TAB_ID_FOLLOW_ROUTER) {
                    return null;
                }

                const tabPaths = [];
                getRouterComp(tabPaths, currentPath, routersRegistry);

                if (!tabPaths.length) {
                    console.log("not find tab");
                    return null;
                }

                let tab = tabPaths[0];
                const lastTab = tabPaths[tabPaths.length - 1];
                if (TAB_ID_FOLLOW_ROUTER) {
                    tab.path = lastTab.path;
                } else {
                    tab = lastTab;
                }

                if (tab.path === '/') {
                    tab = DEFAULT_TAB;
                }
                const tabId = self.createTabId(tab.path);
                return {
                    id: tabId,
                    query: to.query,
                    title: tab.title || (tab.meta ? tab.meta.title : ''),
                    path: tab.path
                }

            }

            const routerTab = findRouterComponent(path, routers);
            if (routerTab) {
                this.addTab(routerTab);
                this.setActiveTab(routerTab.id);
                window.refreshPage = true;
            }
        }
    },

    findTab(path, menuList) {
        let toTab;
        menuList.forEach((it) => {
            if (it.children) {
                const fit = it.children.find(it1 => it1.path === path)
                if (fit) toTab = fit;
            } else if (it.path === path) {
                toTab = it;
            }
        })

        if (!toTab) {
            console.log("not find tab " + path);
            return null;
        }

        const tabId = this.createTabId(toTab.path);
        return {
            id: tabId,
            title: toTab.title || toTab.meta.title,
            path: toTab.path
        }

    },
    createTabId(path) {
        if (!TAB_ID_FOLLOW_ROUTER) {
            return path.replace(/[/]/g, '_');
        }

        const p = path.split('/');
        return p[1] === DEFAULT_PAGE ? DEFAULT_PAGE : (p[2] || DEFAULT_PAGE);
    },
    addTab(tab) {
        if (!tab.id) {
            return;
        }
        const tabs = this.getTabs();

        const isFound = this.getTab(tab.path) || this.getTabById(tab.id);
        if (!isFound) {
            tabs.push(tab);
        } else {
            isFound.query = tab.query;
        }
    },
    getActiveTab() {
        return store.state.tabs.activeTab;
    },
    setActiveTab(id) {
        store.commit("SET_ACTIVE_TAB", id);
    },
    getTabs() {
        return store.state.tabs.list
    },
    getTab(path) {
        if (!TAB_ID_FOLLOW_ROUTER) {
            return this.getTabByPath(path);
        }
        const pathA = path.split('/');
        const id = pathA[pathA.length - 1];
        return this.getTabById(id);
    },
    getTabByPath(path) {
        return this.getTabs().find(it => it.path === path);
    },
    getTabById(id) {
        return this.getTabs().find(it => it.id === id);
    },
    isActiveByPath(path) {
        const tab = this.getTab(path);
        const act = this.getActiveTab();
        //当前激活  KEY
        if (tab && act === tab.id) {
            return true;
        }
        return false;
    },
    openTab(path) {
        this.changeTab(path);
    },
    changeTab(path, menuList) {
        if (this.isActiveByPath(path)) {
            return false;
        }
        let tab = this.getTab(path);
        if (!tab) {
            tab = this.findTab(path, (menuList || store.state.menu.list || []));
            if (!tab) {
                return false;
            }
            this.addTab(tab);
        }
        this.setActiveTab(tab.id);
        return true;
    },
    closeTab(id, $router) {
        const tabs = this.getTabs();
        const idx = tabs.findIndex(it => it.id === id);
        let focusIdx = 0;

        //标签组中去掉指定标签
        tabs.splice(idx, 1);

        //关闭标签后默认标签索引
        if (this.getActiveTab() === id) {
            if (idx >= 0) {
                focusIdx = idx > 0 ? idx - 1 : 0;
            }
            this.setActiveTab(tabs[focusIdx].id)
            $router.push(tabs[focusIdx].path)
        }

    }

};

