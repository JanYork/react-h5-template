<div align="center">

  <h1>Antd Mobile H5 Template</h1>

  <p>
    Vite + React + Antd Mobile 组件库的H5初始化模版(脚手架)
  </p>

</div>

## 功能
1. 使用了`postcss`实现`px to rem`
2. 使用`zustand`作为全局缓存库，并依赖其功能实现了基本的`i18n`国际化
3. 配置了`icon-park`，即字节旗下`ico`库
4. 对`react-router-dom`进行了功能封装
5. 使用`Ant Design Mobile`与`Layout`实现了带有`Tabbar`的公共模版
6. 使用`axios-hooks`库作为请求库，并对`axios`进行少量封装
7. 自定义`hooks`: `useLocation`、`useI18n`、`useSessionStorage`
8. 基于`js-qr`实现了浏览器扫码功能组件`QRScanner`

## 说明
1. 配置`axios`的基地址直接修改`env`配置字段`VITE_BASE_URL`
2. 全局根字体大小断点（`src/index.css`）

```html
   html {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-size: 100%;
    }

    /* 小屏幕设备（如手机）*/
    @media (max-width: 600px) {
        html {
            font-size: 90%; /* 字体稍微小一点 */
        }
    }

    /* 中等屏幕设备（如平板）*/
    @media (min-width: 601px) and (max-width: 1024px) {
        html {
            font-size: 100%; /* 标准大小 */
        }
    }

    /* 大屏幕设备（如桌面）*/
    @media (min-width: 1025px) {
        html {
            font-size: 110%; /* 字体稍微大一点 */
        }
    }
```

3. 组件库全局配色（`src/index.css`）

```html
  :root {
    --primary-color: #FFC300;
  }

  :root:root {
      --adm-color-primary: #FFC300;
      --adm-color-success: #00b578;
      --adm-color-warning: #ff8f1f;
      --adm-color-danger: #ff3141;

      --adm-color-white: #ffffff;
      --adm-color-text: #333333;
      --adm-color-text-secondary: #666666;
      --adm-color-weak: #999999;
      --adm-color-light: #cccccc;
      --adm-color-border: #eeeeee;
      --adm-color-box: #f5f5f5;
      --adm-color-background: #ffffff;

      --adm-font-size-main: var(--adm-font-size-5);

      --adm-font-family: -apple-system, blinkmacsystemfont, 'Helvetica Neue',
      helvetica, segoe ui, arial, roboto, 'PingFang SC', 'miui',
      'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  }
```
4. 修改语言

```js
const i18nStore = useI18nStore()
i18nStore.changeLanguage('en_US')
i18nStore.changeLanguage('zh_CN')
```
其他语言可自行扩展，在`App.tsx`中，使用`useI18nStore`hooks同步修改了组件库的国际化配置
```jsx
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
```
5. 使用i18n

```js
const t = useI18n();

<p>t('index.title"')</p>
```
国际化文字映射在`src/locales`文件夹下

6. 发送请求

首先在`src/api`中新增请求文件`xxx.ts`，并定义返回值与参数的`ts interface`，利用 `axios-hooks`发送对应的`http`请求
```js
import useAxios from 'axios-hooks';
import {Page, Result} from "@/types/http";

export interface MockResult {
    id: number;
}

export interface MockPage {
    id: number;
}

/**
 * fetch the data
 * 详细使用可以查看 useAxios 的文档
 */
export const useFetchXXX = () => {
    // set the url
    const url = `/xxx/xxx`;
    // fetch the data
    const [{data, loading, error}, refetch] = useAxios<Result<MockResult>>(url);
    // to do something
    return {data, loading, error, refetch};
}


/**
 * fetch the data with page
 * 详细使用可以查看 useAxios 的文档
 */
export const useFetchPageXXX = (page: number, size: number) => {
    // set the url
    const url = `/xxx/xxx?page=${page}&size=${size}`;
    // fetch the data
    const [{data, loading, error}, refetch] = useAxios<Page<MockResult>>(url);
    // to do something
    return {data, loading, error, refetch};
}
```
`useAxios`返回值分别为`数据`、`状态`、`错误`、`操作对象`(`refetch`用于中断请求)

7. 路由与缓存配置可直接参考代码

## 补充
简单的封装，方便构建新项目时直接复用，没有复杂的操作，如果你想使用`react`构建一个`h5`或者是`响应式`的`web`项目，可以直接使用这个模版。


```shell
git clone git@github.com:JanYork/react-h5-template.git

cd react-h5-template

pnpm i

pnpm run dev
```