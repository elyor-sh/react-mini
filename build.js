const { build } = require("esbuild");

build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outfile: "dist/bundle.js",
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
    sourcemap: true,
}).catch(() => process.exit(1));