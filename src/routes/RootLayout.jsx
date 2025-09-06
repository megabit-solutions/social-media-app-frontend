import { Link, Outlet, ScrollRestoration } from 'react-router';

export default function RootLayout() {
    return (
        <>
            {/* Where child routes render */}
            <Outlet />

            {/* Restore scroll between navigations */}
            <ScrollRestoration />
        </>
    );
}
