import {
    isRouteErrorResponse,
    Links,
    Meta, NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import React, {useState, useEffect, useReducer} from "react";
import type {Route} from "./+types/root";
import '../public/app.css';
import Home from "./routes/home";
import {Login} from "./modal/login";
import {Register} from "./modal/register";

export const links: Route.LinksFunction = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({children}: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });

    const handleLogin = () => {
        setShowLoginModal(true);
    };

    const handleRegister = () => {
        setShowRegisterModal(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <header>
            <nav className="flex flex-row justify-between m-3">
                <div className="flex flex-row justify-center">
                    <NavLink to="/" className={({isActive}) => (isActive ? "btn--active btn" : "btn")}>
                        Domov
                    </NavLink>
                    <NavLink to="/about" className={({isActive}) => (isActive ? "btn--active btn" : "btn")}>
                        O nás
                    </NavLink>
                    <NavLink to="/content" className={({isActive}) => (isActive ? "btn--active btn" : "btn")}>
                        Content
                    </NavLink>
                </div>

                <button
                    className="p-2 rounded-md border dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? "🌞 Light" : "🌙 Dark"}
                </button>

                <div className="flex flex-row justify-center">
                    {!isLoggedIn ? (
                        <>
                            <button className="btn" onClick={handleLogin}>
                                Prihlásenie
                            </button>
                            <button className="btn" onClick={handleRegister}>
                                Registrácia
                            </button>
                        </>
                    ) : (
                        <button className="btn" onClick={handleLogout}>
                            Odhlásenie
                        </button>
                    )}
                </div>
            </nav>
        </header>

        {/* Conditionally render the modals */}
        {showLoginModal && (
            <Login
                isOpen={showLoginModal}
                onClose={closeLoginModal}
            />
        )}

        {showRegisterModal && (
            <Register
                isOpen={showRegisterModal}
                onClose={closeRegisterModal}
            />
        )}

        {/*<main>{children}</main>*/}

        {children}
        <ScrollRestoration/>
        <Scripts/>

        <footer>
        </footer>

        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
