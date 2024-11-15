import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
    {
        path: '/',
        component: LoginView,
        name: 'Log in',
        meta: {
            transition: 'fade',
            order: 0,
            viewLoaded: false,
        },
    },
    {
        path: '/account',
        component: () => import('@/views/SignupView.vue'),
        name: 'Account View',
        meta: {},
        children: [
            {
                path: '',
                name: 'Sign Up',
                component: () => import('@/components/profile/NewUser.vue'),
            },
            {
                path: ':id',
                name: 'Account Details',
                component: () => import('@/components/user/SettingsForm.vue'),
            },
        ],
    },
    {
        path: '/dashboard',
        component: HomeView,
        name: 'Dashboard',
        meta: {
            transition: 'fade',
            order: 0,
            viewLoaded: false,
        },
    },
    {
        path: '/invoice',
        component: () => import('@/views/InvoiceView.vue'),
        name: 'invoice',
        meta: {
            transition: 'fade',
            order: 1,
            viewLoaded: false,
        },
        children: [
            {
                path: '',
                name: 'Invoice List',
                component: () => import('@/components/invoice/InvoiceList.vue'),
            },
            {
                path: 'create',
                name: 'Create New Invoice',
                component: () =>
                    import('@/components/invoice/CreateNewInvoice.vue'),
            },
            {
                path: 'details/:id',
                name: 'Invoice Details',
                component: () =>
                    import('@/components/invoice/InvoiceDetails.vue'),
            },
        ],
    },
    {
        path: '/send-invoice/:id',
        component: import('@/components/invoice/PreviewInvoice.vue'),
        name: 'send invoice',
    },
    {
        path: '/orders',
        component: () => import('@/views/OrdersView.vue'),
        name: 'Orders',
        children: [
            {
                path: '',
                name: 'Manage Orders',
                component: () => import('@/demo/orders/OrdersList.vue'),
            },
            {
                path: 'details/:id',
                name: 'Order Details',
                component: () => import('@/demo/orders/OrderDetails.vue'),
            },
        ],
    },
    {
        path: '/settings',
        component: () => import('@/views/SettingsView.vue'),
        name: 'Settings',
        children: [
            {
                path: 'admin',
                name: 'Admin Settings',
                component: () => import('@/components/user/SettingsForm.vue'),
            },
        ],
        meta: {},
    },
    {
        path: '/profiles',
        component: () => import('@/views/ProfilesView.vue'),
        name: 'Profiles',
        children: [
            {
                path: '',
                name: 'Manage Profiles',
                component: () => import('@/components/profile/ProfileList.vue'),
            },
            {
                path: 'new',
                name: 'New Profile',
                component: () => import('@/components/profile/NewUser.vue'),
            },
            {
                path: 'details/:id',
                name: 'Profile Details',
                component: () =>
                    import('@/components/profile/ProfileDetails.vue'),
            },
        ],
        meta: {
            transition: 'fade',
            order: 3,
            viewLoaded: false,
        },
    },
]

const router = createRouter({
    linkActiveClass:
        'font-bold  bg-primary-400 rounded-lg text-white dark:bg-secondary-400 shadow-md',
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from) => {
    if (!from.name) {
        // If there is no name, the page has loaded for the first time.
        // return nothing so default transition plays.
        to.meta.viewLoaded = true
        return
    }
    from.meta.viewLoaded = false

    let transition
    if (to.meta.order > from.meta.order) {
        transition = 'slide-left'
    } else {
        transition = 'slide-right'
    }
    to.meta.viewLoaded = true
    to.meta.transition = transition
})

router.onError((error) => {
    console.error('Navigation failure:', error)
})

export default router
