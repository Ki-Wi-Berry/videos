import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default({ command, mode }) => {
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1:3001',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: false,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/dev-api': {
                    target: mode==='development'?loadEnv(mode, process.cwd()).VITE_APP_DEV_URL:loadEnv(mode, process.cwd()).VITE_APP_PROD_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/dev-api/, '')
                }
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src'),
                '~script': path.resolve(__dirname,'./src/script'),
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })
} 