import { Link } from "@inertiajs/react";

const Layout = ({ auth }) => {
    return (
        <>
            <div className="py-4 bg-slate-300">
                <nav className="flex px-4">
                    <Link
                        className="ml-2 mr-auto hover:shadow-lg rounded-md p-1"
                        href="/"
                    >
                        Posts
                    </Link>
                    {auth.user ? (
                        <Link
                            className="mx-2 hover:shadow-lg rounded-md p-1"
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                className="mx-2 hover:shadow-lg rounded-md p-1"
                                href="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="mx-2 hover:shadow-lg rounded-md p-1"
                                href="/register"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Layout;
