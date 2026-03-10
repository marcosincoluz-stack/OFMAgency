import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_BA17lvzU.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/marcos/Desktop/OFMAgency-main/","cacheDir":"file:///Users/marcos/Desktop/OFMAgency-main/node_modules/.astro/","outDir":"file:///Users/marcos/Desktop/OFMAgency-main/dist/","srcDir":"file:///Users/marcos/Desktop/OFMAgency-main/src/","publicDir":"file:///Users/marcos/Desktop/OFMAgency-main/public/","buildClientDir":"file:///Users/marcos/Desktop/OFMAgency-main/dist/client/","buildServerDir":"file:///Users/marcos/Desktop/OFMAgency-main/dist/server/","adapterName":"","routes":[{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/bloques/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/bloques","isIndex":false,"type":"page","pattern":"^\\/bloques\\/?$","segments":[[{"content":"bloques","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bloques.astro","pathname":"/bloques","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/careers/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/careers","isIndex":false,"type":"page","pattern":"^\\/careers\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/careers.astro","pathname":"/careers","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services","isIndex":true,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/index.astro","pathname":"/services","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/marcos/Desktop/OFMAgency-main/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://hive-astro-template.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/marcos/Desktop/OFMAgency-main/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/bloques.astro",{"propagation":"in-tree","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/careers.astro",{"propagation":"none","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/projects/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/services/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/services/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/marcos/Desktop/OFMAgency-main/src/lib/projects.ts",{"propagation":"in-tree","containsHead":false}],["/Users/marcos/Desktop/OFMAgency-main/src/lib/services.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/bloques@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/services/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/services/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/marcos/Desktop/OFMAgency-main/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/bloques@_@astro":"pages/bloques.astro.mjs","\u0000@astro-page:src/pages/careers@_@astro":"pages/careers.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/projects/[slug]@_@astro":"pages/projects/_slug_.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/services/[slug]@_@astro":"pages/services/_slug_.astro.mjs","\u0000@astro-page:src/pages/services/index@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_By_n1wpL.mjs","/Users/marcos/Desktop/OFMAgency-main/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/marcos/Desktop/OFMAgency-main/.astro/content-modules.mjs":"chunks/content-modules_CCkbTCOE.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DDX5ax79.mjs","/Users/marcos/Desktop/OFMAgency-main/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_LXCdF3dg.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/bloom.mdx?astroPropagatedAssets":"chunks/bloom_Do6TN1Co.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/charter.mdx?astroPropagatedAssets":"chunks/charter_Cxj_opo9.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/design-icons.mdx?astroPropagatedAssets":"chunks/design-icons_Ta-GT2tp.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/nextdock.mdx?astroPropagatedAssets":"chunks/nextdock_GeRbfqBH.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/development-icons.mdx?astroPropagatedAssets":"chunks/development-icons_C8XkzmmT.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/echo.mdx?astroPropagatedAssets":"chunks/echo_D0xwYQwI.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/relative.mdx?astroPropagatedAssets":"chunks/relative_CMb1WBDB.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/plasma.mdx?astroPropagatedAssets":"chunks/plasma_CL5a342Z.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/scalar.mdx?astroPropagatedAssets":"chunks/scalar_DvCUzSZ6.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/neobase.mdx?astroPropagatedAssets":"chunks/neobase_B0Umd3jW.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/icon-design.mdx?astroPropagatedAssets":"chunks/icon-design_BVSQAlT8.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/logo-design.mdx?astroPropagatedAssets":"chunks/logo-design_35tot_KE.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/brand-identity.mdx?astroPropagatedAssets":"chunks/brand-identity_Ci4AxzhH.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/rebranding.mdx?astroPropagatedAssets":"chunks/rebranding_BK58FKcw.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/sonic.mdx?astroPropagatedAssets":"chunks/sonic_DqX2djDk.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/streamline.mdx?astroPropagatedAssets":"chunks/streamline_RODMYEz5.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/bloom.mdx":"chunks/bloom_BbJrkeR-.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/charter.mdx":"chunks/charter_CSjI0A54.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/design-icons.mdx":"chunks/design-icons_DjiDvJ7e.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/nextdock.mdx":"chunks/nextdock_BXuB1X0T.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/development-icons.mdx":"chunks/development-icons_a_ReSfkZ.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/echo.mdx":"chunks/echo_BDot8WcE.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/relative.mdx":"chunks/relative_BHu3NZ-J.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/plasma.mdx":"chunks/plasma_B4lE9ru7.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/scalar.mdx":"chunks/scalar_vqPOkzv6.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/neobase.mdx":"chunks/neobase_D1dlaj3w.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/icon-design.mdx":"chunks/icon-design_DiaQoXBJ.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/logo-design.mdx":"chunks/logo-design_CqyG7JIO.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/brand-identity.mdx":"chunks/brand-identity_DJE-k_1-.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/services/rebranding.mdx":"chunks/rebranding_D-6Xfde5.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/sonic.mdx":"chunks/sonic_49Q9ITW3.mjs","/Users/marcos/Desktop/OFMAgency-main/src/content/projects/streamline.mdx":"chunks/streamline_Ds06Qorz.mjs","@/components/sections/not-found":"_astro/not-found.CAH5pXeH.js","@/components/sections/process":"_astro/process.DtTwsfJx.js","@/components/sections/hero":"_astro/hero.DyOV6kDP.js","@/components/sections/features":"_astro/features.DGy2eWf8.js","@/components/sections/bento-demo":"_astro/bento-demo.DGeG0YoT.js","@/components/sections/hero-scroll":"_astro/hero-scroll.YCFbSuZe.js","@/components/sections/case-studies":"_astro/case-studies.C_CcFR8U.js","@/components/sections/logos":"_astro/logos.DK6rdBRk.js","@/components/sections/contact-form":"_astro/contact-form.DhbLIExE.js","@/components/sections/projects-grid":"_astro/projects-grid.CNXb5ttM.js","@/components/sections/services-section":"_astro/services-section.BVJNODWM.js","@/components/elements/navigation-provider":"_astro/navigation-provider.K4UQvd2K.js","@/components/layout/navbar":"_astro/navbar.tKY7ehld.js","@/components/layout/footer":"_astro/footer.B6COLRNw.js","@astrojs/react/client.js":"_astro/client.BR21N-Ro.js","/Users/marcos/Desktop/OFMAgency-main/node_modules/unicornstudio-react/dist/index.mjs":"_astro/index.zVn45WsJ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///Users/marcos/Desktop/OFMAgency-main/dist/404.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/about/index.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/bloques/index.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/careers/index.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/contact/index.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/projects/index.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/rss.xml","/file:///Users/marcos/Desktop/OFMAgency-main/dist/services/index.html","/file:///Users/marcos/Desktop/OFMAgency-main/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"DrFU3VsijyXmJpWGmNwURa7N4ENM+Pl/jaI2tDom8gs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
