import {useState, useEffect} from 'react';
import useI18n from "@/hooks/i18n";

// 定义位置坐标的类型
export interface Coordinates {
    lat: number;
    lng: number;
}

// 定义返回的位置状态的类型
export interface LocationState {
    loaded: boolean;
    coordinates: Coordinates | null;
}

// 定义错误状态的类型
export type ErrorState = string | null;

export const useLocation = (): { location: LocationState; error: ErrorState } => {
    const t = useI18n();

    // 用于存储位置信息和加载状态的状态
    const [location, setLocation] = useState<LocationState>({
        loaded: false,
        coordinates: null,
    });

    // 用于存储任何错误消息的状态
    const [error, setError] = useState<ErrorState>(null);

    // 地理位置成功处理函数
    const onSuccess = (location: GeolocationPosition) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    // 地理位置错误处理函数
    const onError = (error: GeolocationPositionError) => {
        setError(error.message);
    };

    // 使用 useEffect 在组件挂载时执行地理位置请求
    useEffect(() => {
        // 检查浏览器是否支持地理位置
        if (!navigator.geolocation) {
            setError(t('hooks.location.unsupported'));
            return;
        }

        // 请求用户的当前位置
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return {location, error};
};
