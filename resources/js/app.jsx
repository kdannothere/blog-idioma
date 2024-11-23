import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import Layout from "@/Layouts/Layout";

const appName = import.meta.env.VITE_APP_NAME || "Blog Idioma";

createInertiaApp({
  title: (title) => (title ? `${title} | ${appName}` : appName),
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    page.default.layout =
      page.default.layout || ((page) => <Layout children={page} />);
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#DDaaDD",
    showSpinner: true,
  },
});
