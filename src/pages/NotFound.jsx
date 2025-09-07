import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div style={{ padding: 24 }}>
            <h1>404 — Not Found</h1>
            <Link to="/" prefetch="intent">
                Back to Home
            </Link>
        </div>
    );
}
