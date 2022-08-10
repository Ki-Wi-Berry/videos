//1.定义容器
import { defineStore  } from 'pinia'
//参数1：容器的ID，必须唯一，将来Pinia会把所有的容器挂载到根容器
export const useStore = defineStore  ('main',{
    /***
     *类似于组件的 data数据的 ,用来存储全局状态的
     * 1、必须是箭头函数
     */
    state:()=>{
        return {
            islogin:0,
            top_navigation_bar_li_color:"#000000",
            top_navigation_bar_login_background_color:"",
        }
    },
    /***
     *类似于组件的计算属性computed，有缓存的功能
     */
    getters:{
        count10(state){
            console.log('count10 调用了')
            return state.count +10
        },
    },


    /***
     *封装处理数据的函数（业务逻辑)：修改数据
     */
    actions:{
        //aciton中不能使用箭头函数，因为箭头函数绑定外部的 this
        changeState(num){
            this.$patch(state =>{
                state.count+=num
                state.foo='hello'
                state.arr.push(4)
            })
        }
    },
})
