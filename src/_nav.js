import {getMessage} from "./utils/Tools";

export default {
    items: [
        {
            name: getMessage("NAV.DASHBOARD"),
            url: '/dashboard',
            icon: 'icon-speedometer'
        },
        {
            name: getMessage("NAV.CONFIGS"),
            url: '/showconfig',
            icon: 'icon-note'
        },
        {
            name: getMessage("NAV.EXPLORER"),
            url: '/remoteExplorer',
            icon: 'icon-screen-desktop'
        },
        {
            name: getMessage("NAV.BACKEND"),
            url: '/rcloneBackend',
            icon: 'icon-star',
        },
        {
            name: getMessage("NAV.MOUNTS"),
            url: '/mountDashboard',
            icon: 'fa fa-hdd-o'
        },
        {
            name: getMessage("NAV.LOGOUT"),
            url: '/login',
            icon: 'icon-logout',
        },

    ],
};
