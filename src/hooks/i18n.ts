import zhCN from '@/locales/zh_CN.json'
import enUS from '@/locales/en_US.json'
import {useI18nStore} from '@/store/i18n';

export default function useI18n() {
    const {lang} = useI18nStore();
    const locales = lang === 'en_US' ? enUS : zhCN;

    return (name: string) => {
        return locales[name as keyof typeof locales] || name;
    }
}
