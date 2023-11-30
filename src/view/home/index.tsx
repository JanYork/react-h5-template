import useI18n from "@/hooks/i18n.ts";
import './index.less'
import MainLayout from "@/layout/main/MainLayout.tsx";
import {Button} from "antd-mobile";
import {useI18nStore} from "@/store/i18n.ts";

function Index() {
    const t = useI18n();
    const i18nStore = useI18nStore()

    return (
        <>
            <MainLayout>
                <div className="index-container">
                    <p>{t('index.title')}</p>
                    <Button onClick={
                        () => {
                            i18nStore.changeLanguage('zh_CN')
                        }
                    }>简体中文</Button>
                    <Button onClick={
                        () => {
                            i18nStore.changeLanguage('en_US')
                        }
                    }>English</Button>
                    <p style={
                        {
                            fontSize: '12px',
                        }
                    }>Font size 12px</p>

                    <p style={
                        {
                            fontSize: '14px',
                        }
                    }>Font size 14px</p>

                    <p style={
                        {
                            fontSize: '16px',
                        }
                    }>Font size 16px</p>

                    <p style={
                        {
                            fontSize: '18px',
                        }
                    }>Font size 18px</p>
                </div>
            </MainLayout>
        </>
    );
}

export default Index
