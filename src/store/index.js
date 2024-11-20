import { createStore } from 'vuex';

export default createStore({
    state: {
        isFirstView: true
    },
    getters: {
        // 在 Vue 3 中你可以使用 getters 来访问状态
    },
    mutations: {
        SET_ALREADYVIEW(state, payload) {
            state.isFirstView = payload;
        }
    },
    actions: {
        // 可以使用 actions 来异步处理
    },
    modules: {
        // 如果你有多个模块，可以在这里管理
    }
});
