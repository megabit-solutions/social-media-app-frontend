import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export default function RouteErrorBoundary() {
    const err = useRouteError();
    const status = isRouteErrorResponse(err) ? err.status : 500;
    const message = isRouteErrorResponse(err) ? err.statusText : (err?.message || 'Something went wrong');
    return (
        <div style={{ padding: 24 }}>
            <h2>Oops ({status})</h2>
            <p>{message}</p>
            <Link to="/" prefetch="intent">Go home</Link>
        </div>
    );
}
