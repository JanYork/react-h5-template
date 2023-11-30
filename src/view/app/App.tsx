import './App.css'
import {RenderRoutes} from "@/route/render-routes.tsx";
import {axiosInstance} from "@/http/axios-instance.ts";
import {configure} from 'axios-hooks'
import enUS from "antd-mobile/es/locales/en-US";
import {ConfigProvider} from "antd-mobile";
import {useI18nStore} from "@/store/i18n.ts";
import zhCN from "antd-mobile/es/locales/zh-CN";

function App() {
    configure({
        axios: axiosInstance
    })
    const i18nStore = useI18nStore()
    return (
        <>
            <ConfigProvider locale={
                i18nStore.lang === 'en_US' ? enUS : zhCN
            }>
                <RenderRoutes/>
            </ConfigProvider>
        </>
    )
}

export default App
