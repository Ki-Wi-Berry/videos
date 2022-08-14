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
            islogin:0,//是否登录
            top_navigation_bar_li_color:"#000000",//导航栏字体颜色
            top_navigation_bar_login_background_color:"",//导航栏背景颜色
            top_navigation_bar_height:"14rem",//导航栏高度
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
        loginIn(){
            this.$patch(state =>{
                state.islogin=1;
            })
        },
        loginOut(){
            this.$patch(state =>{
                console.log('loginOut');
                state.islogin=0;
                localStorage.removeItem('token');
                location.reload();
            })
        }
    },
})
