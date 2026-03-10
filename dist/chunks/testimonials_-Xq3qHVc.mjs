import { a as getCollection } from './_astro_content_Cj0tcYxz.mjs';
import { b as getProjectsByCategoryFrontmatter, c as getProjectsBySlugsFrontmatter } from './projects_DLNMgWVQ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { C as Card, b as CardContent, e as CardFooter } from './card_CaDkButo.mjs';
import { c as cn } from './DefaultLayout_j4zz56nC.mjs';
import { M as Marquee } from './marquee_O8doPJqf.mjs';

async function getServiceSlugs() {
  try {
    const services = await getCollection("services");
    return services.map((service) => service.id);
  } catch (error) {
    console.error("Error reading services directory:", error);
    return [];
  }
}
async function getAllServices() {
  try {
    const services = await getCollection("services");
    return services.map((service) => ({
      ...service.data
    }));
  } catch (error) {
    console.error("Error reading all services:", error);
    return [];
  }
}
async function resolveFeaturedWork(service) {
  const { slug, featuredWork } = service;
  if (!featuredWork || featuredWork.length === 0) {
    return await getProjectsByCategoryFrontmatter(slug);
  }
  return await getProjectsBySlugsFrontmatter(featuredWork);
}

const testimonials = [
  {
    quote: "Hive gave us a logo that feels bold and confident. It's simple, memorable, and works perfectly across all our platforms",
    author: "Robert Evans",
    role: "Founder of BankPro",
    image: "/images/testimonials/robert-evans.webp"
  },
  {
    quote: "Hive took our rough ideas and turned them into a clean, timeless logo. The process was smooth, and the result is something we're proud to put everywhere.",
    author: "Anna Peterson",
    role: "Founder of Nextdock",
    image: "/images/testimonials/anna-peterson.webp"
  },
  {
    quote: "The team really listened to our story and captured it perfectly in the design. Our new identity feels professional and has already impressed our clients",
    author: "David Kim",
    role: "Director at Scalar",
    image: "/images/testimonials/david-kim.webp"
  },
  {
    quote: "We needed a rebrand that felt fresh but stayed true to our roots. Hive delivered exactly that — modern, simple, and versatile",
    author: "Sofia Martinez",
    role: "Marketing Lead at Neobase",
    image: "/images/testimonials/sofia-martinez.webp"
  },
  {
    quote: "Professional, fast, and creative. The new logo has already made a difference in how our customers see our brand",
    author: "James Carter",
    role: "CEO at Northwind Finance",
    image: "/images/testimonials/james-carter.webp"
  }
];
const Testimonials = () => {
  return /* @__PURE__ */ jsxs("section", { className: cn("section-padding space-y-16 md:space-y-18"), children: [
    /* @__PURE__ */ jsx("h2", { className: "container text-4xl", children: "Testimonials" }),
    /* @__PURE__ */ jsx(Marquee, { pauseOnHover: true, className: "[--gap:1.25rem] md:[--gap:1.5rem]", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "group/card w-[310px] justify-between sm:w-[450px]",
        children: [
          /* @__PURE__ */ jsx(CardContent, { className: "text-muted-foreground text-lg", children: testimonial.quote }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: testimonial.image,
                alt: testimonial.author,
                width: 48,
                height: 48,
                className: "object-cover grayscale transition-all duration-300 group-hover/card:grayscale-0"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0", children: [
              /* @__PURE__ */ jsx("p", { className: "", children: testimonial.author }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: testimonial.role })
            ] })
          ] })
        ]
      },
      index
    )) })
  ] });
};

export { Testimonials as T, getServiceSlugs as a, getAllServices as g, resolveFeaturedWork as r };
