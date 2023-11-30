import {setDefaultConfig} from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import zhCN from 'antd-mobile/es/locales/zh-CN';

function changeLanguage(language: string) {
    let locale;
    switch (language) {
        case 'zh_CN':
            locale = enUS;
            break;
        case 'en_US':
            locale = zhCN;
            break;
        default:
            locale = enUS; // 或者是你的默认语言
    }

    setDefaultConfig({locale: locale});
}

export default changeLanguage;
