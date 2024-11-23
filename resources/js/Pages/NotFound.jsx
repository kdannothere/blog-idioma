import { Head } from "@inertiajs/react";

const NotFound = () => {
  return (
    <>
      <Head title={"Page not found"} />

      <h1 className="text-xl text-center mt-4 font-semibold leading-tight text-gray-800">
			Page not found
      </h1>
    </>
  );
};

export default NotFound;
