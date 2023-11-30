import React from "react";
import Home from "@/view/home";

export interface AppRoute {
    path: string;
    element: React.ReactNode;
    auth?: boolean;
    children?: AppRoute[];
}

export const routes: AppRoute[] = [
    {path: '/', element: <Home/>, auth: false},
    {path: '*', element: <Home/>, auth: false}
];