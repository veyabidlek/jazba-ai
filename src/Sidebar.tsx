import { useEffect, useState } from "react";

// NavLink component
const NavLink = ({ ...props }) => {
  const { children, href = "", className = "", active = "" } = props;

  const [pathname, setPathname] = useState("/");

  const isActive = pathname == href;
  const activeClass = isActive ? active : "";

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [props]);

  return (
    <a href={href} {...props} className={`${activeClass} ${className}`}>
      {children}
    </a>
  );
};

// Title component
const Title = ({ children }) => (
  <h3 className="pb-3 px-4 font-medium text-gray-800 md:px-8">{children}</h3>
);

// Sections List
const SectionsList = ({ items }) => (
  <div className="text-gray-600 px-4 md:px-8">
    <ul>
      {items?.map((item, idx) => (
        <li key={idx}>
          <NavLink
            href={item?.href}
            active="text-gray-900 border-indigo-600"
            className="block w-full py-2 px-4 border-l hover:border-red-600 hover:text-red-600 duration-150"
          >
            {item?.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

// Search Box component
const SearchBox = ({ ...props }) => (
  <div className="relative w-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 absolute left-3 inset-y-0 my-auto"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>

    <input
      {...props}
      type="email"
      className="w-full pl-12 pr-3 py-2 bg-white text-sm text-gray-500 bg-transparent outline-none border ring-blue-600 focus:ring-2 shadow-sm rounded-lg duration-200"
    />
  </div>
);

const Sidebar = () => {
  const lessons = [
    { name: "Calculus 1", href: "#" },
    { name: "Python Fundamentals", href: "#" },
    { name: "Football Basics", href: "#" },
    { name: "Cristiano Ronaldo Book", href: "#" },
  ];

  return (
    <>
      <nav className="fixed z-40 top-0 left-0 w-full h-full border-r bg-white space-y-8 overflow-auto sm:w-80 shadow-md">
        <div className="sticky top-0 space-y-8 bg-white">
          <h1 className="h-20 flex items-center px-7 text-[1.5rem] border-b md:px-8 text-gray-500 font-bold">
            Screen Note AI
          </h1>
          <div className="px-4 md:px-8">
            <SearchBox placeholder="Search..." />
          </div>
        </div>
        <div className="text-[0.9rem] space-y-6">
          <h1 className="text-[1rem] pl-10 font-bold text-red-500">My Notes</h1>
          <SectionsList items={lessons} />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
