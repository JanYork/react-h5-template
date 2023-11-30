import {useState, useEffect} from 'react';
import isEqual from 'lodash.isequal';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // 初始化状态
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = sessionStorage.getItem(key);
        if (item !== null) {
            // 如果 sessionStorage 中有数据，则使用现有数据
            return JSON.parse(item);
        } else {
            // 当 sessionStorage 中没有相应的键时，使用 initialValue 初始化，并写入 sessionStorage
            sessionStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    });

    // 监听并保存变化到 sessionStorage
    useEffect(() => {
        if (!isEqual(JSON.parse(sessionStorage.getItem(key) || 'null'), storedValue)) {
            sessionStorage.setItem(key, JSON.stringify(storedValue));
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useSessionStorage;
