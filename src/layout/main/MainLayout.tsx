import React from 'react';
import {TabBar} from 'antd-mobile';
import {useNavigate, useLocation} from 'react-router-dom';
import {ShoppingBag, TransactionOrder, User, Wallet} from '@icon-park/react';
import useI18n from "@/hooks/i18n.ts";
import './index.less';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    const navigate = useNavigate();
    const t = useI18n();
    const location = useLocation();
    const {pathname} = location;
    const [activeKey, setActiveKey] = React.useState(pathname);

    const tabs = [
        {
            key: '/', title: t('tabs.home'), icon: activeKey === '/' ?
                <ShoppingBag theme="two-tone" size="24" fill={['#333', '#FFC300']}/> : <ShoppingBag size="24"/>
        },
        {
            key: '/wallet', title: t('tabs.wallet'), icon: activeKey === '/wallet' ?
                <Wallet theme="two-tone" size="24" fill={['#333', '#FFC300']}/> : <Wallet size="24"/>
        },
        {
            key: '/bill', title: t('tabs.bill'), icon: activeKey === '/bill' ?
                <TransactionOrder theme="two-tone" size="24" fill={['#333', '#FFC300']}/> : <TransactionOrder size="24"/>
        },
        {
            key: '/mine', title: t('tabs.mine'), icon: activeKey === '/mine' ?
                <User theme="two-tone" size="24" fill={['#333', '#FFC300']}/> : <User size="24"/>
        },
    ];

    const setRouteActive = (value: string) => {
        setActiveKey(value);
        navigate(value);
    };

    return (
        <div className="main-layout">
            <div className="content layout-content">
                {children}
            </div>

            <div className="footer layout-tab">
                <TabBar activeKey={activeKey} onChange={setRouteActive}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} style={
                            {
                                color: '#333',
                            }
                        }/>
                    ))}
                </TabBar>
            </div>
        </div>
    );
};

export default MainLayout;
