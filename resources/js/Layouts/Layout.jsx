import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

const Layout = ({ children }) => {
  const user = usePage().props.auth.user;
  const [showingUserDropdown, setShowingUserDropdown] = useState(false);

  return (
    <>
      <header className="py-4 bg-slate-300">
        <nav className="flex px-12">
          <Link
            className="ml-2 w-fit h-fit mr-4 hover:shadow-lg rounded-md p-1"
            href={route("home")}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                className="ml-auto w-fit h-fit mr-4 hover:shadow-lg rounded-md p-1"
                href={route("posts.create")}
              >
                Create
              </Link>

              <div
                className="cursor-pointer flex flex-nowrap relative"
                onClick={() => setShowingUserDropdown(!showingUserDropdown)}
              >
                <p className="flex flex-nowrap hover:shadow-lg rounded-md p-1">
                  <span>{user.name}</span>
                  <span className="ml-1 text-gray-700">&#11167;</span>
                </p>
                <div
                  className={
                    "flex flex-col w-28 absolute translate-x-[-3.5rem] translate-y-10 bg-slate-100 rounded-sm " +
                    (showingUserDropdown ? "" : "hidden")
                  }
                >
                  <Link
                    className="px-2 py-1 text-start hover:bg-slate-200"
                    href={route("dashboard")}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="px-2 py-1 text-start hover:bg-slate-200"
                    href={route("profile.edit")}
                  >
                    Profile
                  </Link>
                  <Link
                    className="px-2 py-1 text-start hover:bg-slate-200"
                    method="POST"
                    as="button"
                    href={route("logout")}
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                className="w-fit h-fit ml-auto mx-2 hover:shadow-lg rounded-md p-1"
                href={route("login")}
              >
                Login
              </Link>
              <Link
                className="mx-2 hover:shadow-lg rounded-md p-1"
                href={route("register")}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
