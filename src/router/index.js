import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

const routes = [
    {
        path: '/',
        component: LoginView,
        name: 'Log In',
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
                component: () => import('@/components/user/AccountPage.vue'),
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
            requiresAuth: true,
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
            requiresAuth: true,
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
        path: '/profiles',
        component: () => import('@/views/ProfilesView.vue'),
        name: 'Profiles',
        meta: {
            requiresAuth: true,
        },
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

router.beforeEach(async (to, from, next) => {
    const { isAuthenticated } = storeToRefs(useAuthStore())

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        // If the route requires authentication and the user is not authenticated
        // Store the target route in local storage

        localStorage.setItem('targetRoute', to.fullPath)
        // Redirect the user to the sign-in page
        next('/')
    } else if (to.name === 'Log In' && isAuthenticated.value) {
        // If the user is already authenticated and the target route is 'Login', redirect to 'Search'
        next({ name: 'Dashboard' })
    } else {
        next() // go to the next route
    }
})

router.afterEach((to, from) => {
    // if (!from.name) {
    //     // If there is no name, the page has loaded for the first time.
    //     // return nothing so default transition plays.
    //     to.meta.viewLoaded = true
    //     return
    // }
    // from.meta.viewLoaded = false

    // let transition
    // if (to.meta.order > from.meta.order) {
    //     transition = 'slide-left'
    // } else {
    //     transition = 'slide-right'
    // }
    // to.meta.viewLoaded = true
    // to.meta.transition = transition
    window.scrollTo(0, 0)
})

router.onError((error) => {
    console.error('Navigation failure:', error)
})

export default router
