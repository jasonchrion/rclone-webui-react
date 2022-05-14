import React from 'react';
import intl from 'react-intl-universal';

const MyDashboard = React.lazy(() => import('./views/RemoteManagement/NewDrive'));
const Home = React.lazy(() => import('./views/Home'));
const ShowConfig = React.lazy(() => import('./views/RemoteManagement/ShowConfig'));
const RemoteExplorerLayout = React.lazy(() => import("./views/Explorer/RemoteExplorerLayout"));
const Login = React.lazy(() => import("./views/Pages/Login"));
const RCloneDashboard = React.lazy(() => import("./views/RCloneDashboard"));
const MountDashboard = React.lazy(() => import("./views/MountDashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
// Define the routes as required
const routes = [
    {path: '/', exact: true, name: intl.get("ROUTE.HOME")},
    {path: '/newdrive/edit/:drivePrefix', name: intl.get("ROUTE.EDIT_REMOTE"), component: MyDashboard},
    {path: '/newdrive', exact: true, name: intl.get("ROUTE.NEW_REMOTE"), component: MyDashboard},
    {path: '/login', exact: true, name: intl.get("ROUTE.LOGIN_PAGE"), component: Login},
    {path: '/dashboard', name: intl.get("ROUTE.DASHBOARD"), component: Home},
    {path: '/showconfig', name: intl.get("ROUTE.CONFIGS"), component: ShowConfig},
    {path: '/remoteExplorer/:remoteName/:remotePath', exact: true, name: intl.get("ROUTE.EXPLORER"), component: RemoteExplorerLayout},
    {path: '/remoteExplorer', name: intl.get("ROUTE.EXPLORER"), component: RemoteExplorerLayout},
    {path: '/rcloneBackend', name: intl.get("ROUTE.RCLONE_BACKEND"), component: RCloneDashboard},
    {path: '/mountDashboard', name: intl.get("ROUTE.MOUNT_DASHBOARD"), component: MountDashboard},

];

export default routes;
