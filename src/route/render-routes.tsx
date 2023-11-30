import {Route, Routes} from 'react-router-dom';
import {routes, AppRoute} from './routes';
import AuthRoute from './auth.tsx';

/**
 * 渲染路由
 * @constructor RenderRoutes
 */
export const RenderRoutes = () => {
    const renderRoutes = (routes: AppRoute[]) => {
        return routes.map(route => (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <AuthRoute auth={route.auth}>
                        {route.element}
                    </AuthRoute>
                }
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        ));
    };

    return <Routes>{renderRoutes(routes)}</Routes>;
};
