import type MarkdownIt from "markdown-it";
//import MarkdownItFootnote from "markdown-it-footnote";
import { include } from "@mdit/plugin-include";

// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "How much is 13 billion euros?",
  style: "/layout-styles.css",

  //pages: [],
  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],
  head: '<meta property="og:url" content="https://howmuchis13billion.com"/><meta property="og:image" content="https://cdn.jsdelivr.net/gh/declann/howmuchis13billioneuros.com@main/preview.png"/><meta property="twitter:image" content="https://cdn.jsdelivr.net/gh/declann/howmuchis13billioneuros.com@main/preview.png"/><meta property="og:description" content="Various back-of-the-envelope calculations"/><meta property="og:title" content="How much is 13 billion euros?"/><meta name="viewport" content="width=device-width,initial-scale=1">', // removes maximum-scale?
  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer: "",// "Built with Observable.", // what to show in the footer (HTML)
  // toc: true, // whether to show the table of contents
   pager: false, // whether to show previous & next links in the footer
  // root: "docs", // path to the source root for preview
  // output: "dist", // path to the output root for build
  // search: true, // activate search

  markdownIt: (md: MarkdownIt) => md/*.use(MarkdownItFootnote)*/.use(include, {
    // your options, currentPath is required
    currentPath: (env) => env.filePath,
    /*resolvePath: (path, cwd) => {
      if (path.startsWith("@src")) {
        return path.replace("@src", "path/to/src/folder");
      }
  
      //return path.join(cwd, path);
    },*/
    })

};
