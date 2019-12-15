import formatPagesData from './functions/formatPagesData';

/* ############################## PAGES ############################### */

import Home from './pages/Home';

import Sitemap from './pages/Sitemap';

import Error404 from './pages/Error404';

import Monitoring from './pages/Monitoring';
import Investment from './pages/Investment';
import Malfunction from './pages/Malfunction';

/* #################### FORMAT & EXPORT PAGES DATA #################### */

export default formatPagesData('home', {
    home: {
        title: 'Αρχική',
        component: Home,
        exact: true
    },
    investment: {
        title: 'Διερεύνηση επένδυσης',
        path: '/investment',
        component: Investment,
        exact: true
    },
    monitoring: {
        title: 'Παρακολούθηση μονάδας',
        path: '/monitoring',
        component: Monitoring,
        exact: true
    },
    malfunction: {
        title: 'Παραδείγματα κακής λειτουργίας',
        path: '/malfunction',
        component: Malfunction,
        exact: true
    },
    sitemap: {
        title: 'Sitemap',
        component: Sitemap,
        exact: true
    },
    error_404: { // @note: Error 404 page must been set last, and use "*" in path.
        title: 'Σφάλμα 404',
        path: '/*',
        component: Error404,
    },
});
