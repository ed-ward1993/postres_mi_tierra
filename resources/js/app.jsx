import './bootstrap';
import 'react-dropdown-tree-select/dist/styles.css';
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { InertiaProgress } from '@inertiajs/progress';
import Guest from "./Layouts/GuestLayout";
import Authenticated from "./Layouts/AuthenticatedLayout";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
InertiaProgress.init({
    color: '#ffffff',
    showSpinner: true
  });



const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = name.startsWith('Auth/') || name.startsWith('Public/') ? page => <Guest children={page} /> : name.startsWith('Inicio') ? undefined : page => <Authenticated children={page} />
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
