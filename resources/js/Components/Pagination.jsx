import { Link } from "@inertiajs/react";

const Pagination = ({ items }) => {
  return (
    <>
      {items.links.length > 3 && (
        <nav className="my-4 flex flex-wrap col-span-full md:mx-8">
          {items.links.map((link) =>
            link.url && !link.active ? (
              <Link
                key={link.label}
                dangerouslySetInnerHTML={{ __html: link.label }}
                href={link.url}
                disabled={link.active}
                className={`mx-1 mb-2 px-3 py-2 w-fit h-fit bg-slate-300 hover:bg-slate-200 rounded-full`}
              />
            ) : (
              <span
                key={link.label}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`mx-1 mb-2 px-3 py-2 w-fit h-fit bg-slate-300 hover:bg-slate-200 rounded-full cursor-default ${
                  link.active ? "bg-slate-400" : "opacity-60"
                }`}
              ></span>
            )
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
