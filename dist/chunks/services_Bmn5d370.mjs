import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { c as cn, A as AnimatedBackground, B as Button } from './DefaultLayout_j4zz56nC.mjs';
import { P as ProjectCard, a as Logo9, b as Logo8, c as Logo7, d as Logo6, e as Logo5, f as Logo4, g as Logo3, h as Logo2, L as Logo1 } from './project-card_Bl_JALpe.mjs';
import * as React from 'react';
import React__default, { useRef, useMemo, Children, useState, useEffect, useId, forwardRef, Suspense, useCallback, createElement } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'motion/react';
import { FileText, Bell, Share2, Globe, DollarSign, CreditCard, Wallet, ArrowLeft, ArrowRight } from 'lucide-react';
import { IconBrandGoogleDrive, IconBrandGoogle, IconBrandWhatsapp, IconBrandMessenger, IconBrandNotion, IconBrandOpenai, IconUser } from '@tabler/icons-react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import useEmblaCarousel from 'embla-carousel-react';
import { M as Marquee$1 } from './marquee_O8doPJqf.mjs';
import { L as LogoDesignIcon, B as BrandIdentityIcon, a as DropletIcon, D as DiamondShapesIcon } from './service-icons_CpIEULE4.mjs';
import { C as Card$1, a as CardHeader, b as CardContent, c as CardTitle, d as CardDescription, e as CardFooter } from './card_CaDkButo.mjs';

const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const onSelect = React.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}

function Hero({ projects }) {
  const heroProjects = projects;
  return /* @__PURE__ */ jsx("div", { className: "section-padding pt-0!", children: /* @__PURE__ */ jsxs(
    "section",
    {
      className: cn(
        "max relative m-5 mb-0! flex min-h-[min(100dvh,702px)] flex-col items-center justify-center overflow-hidden p-5 md:m-6 md:min-h-[min(100dvh,1032px)] md:p-6",
        "bg-foreground text-background"
      ),
      children: [
        /* @__PURE__ */ jsx(
          AnimatedBackground,
          {
            className: "absolute inset-0 h-full w-full object-cover opacity-50 dark:opacity-100 dark:invert",
            projectId: "0LAbEmh570lz56FzSfFp"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-1 flex-col items-center justify-center py-10 text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl lg:text-9xl", children: "We are Velour®" }) }),
        /* @__PURE__ */ jsx("div", { className: "hidden gap-6 p-6 [@media(min-width:1920px)]:grid [@media(min-width:1920px)]:grid-cols-4", children: heroProjects.map((project) => /* @__PURE__ */ jsx(
          ProjectCard,
          {
            project,
            showName: false,
            className: "h-[290px] w-[438px]"
          },
          project.id
        )) }),
        /* @__PURE__ */ jsx(
          Carousel,
          {
            opts: {
              align: "start"
            },
            className: "flex w-full cursor-grab justify-center [@media(min-width:1920px)]:hidden",
            children: /* @__PURE__ */ jsx(CarouselContent, { className: "", children: heroProjects.map((project) => /* @__PURE__ */ jsx(
              CarouselItem,
              {
                className: "basis-[1/4] pl-5 first:pl-0 md:pl-6",
                children: /* @__PURE__ */ jsx(
                  ProjectCard,
                  {
                    project,
                    showName: false,
                    className: "h-[292px] w-[397px] md:h-[290px] md:w-[438px]"
                  }
                )
              },
              project.id
            )) })
          }
        )
      ]
    }
  ) });
}

const aboutDescription = "Somos Velour® la agencia de representación exclusiva que lleva tu carrera al 1% de los creadores..";
const AboutIntro = () => {
  return /* @__PURE__ */ jsxs("section", { className: "pb-18.75 pt-0 md:pb-26 md:pt-0 lg:pb-31.25 lg:pt-0 bigger-container space-y-16 md:space-y-18", children: [
    /* @__PURE__ */ jsx("div", { className: "container max-w-4xl", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground md:text-lg lg:text-xl", children: aboutDescription }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          width: 924,
          height: 664,
          src: "/images/homepage/about-team.webp",
          alt: "Hive team members",
          className: "size-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          width: 924,
          height: 664,
          src: "/images/homepage/about-award.webp",
          alt: "Award badge",
          className: "size-full object-cover dark:invert"
        }
      )
    ] })
  ] });
};

const ContainerScroll = ({
  titleComponent,
  children
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  const [isMobile, setIsMobile] = React__default.useState(false);
  React__default.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-[60rem] md:h-[80rem] flex items-start justify-center relative px-2 md:px-20",
      ref: containerRef,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "pt-0 pb-10 md:pt-0 md:pb-40 w-full relative",
          style: {
            perspective: "1000px"
          },
          children: [
            /* @__PURE__ */ jsx(Header, { translate, titleComponent }),
            /* @__PURE__ */ jsx(Card, { rotate, translate, scale, children })
          ]
        }
      )
    }
  );
};
const Header = ({ translate, titleComponent }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        translateY: translate
      },
      className: "div max-w-5xl mx-auto text-center",
      children: titleComponent
    }
  );
};
const Card = ({
  rotate,
  scale,
  children
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: {
        rotateX: rotate,
        scale,
        boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003"
      },
      className: "max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl",
      children: /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden rounded-2xl bg-black md:rounded-2xl", children })
    }
  );
};

function HeroScrollDemo() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsx(
    ContainerScroll,
    {
      titleComponent: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-semibold text-black dark:text-white", children: [
        "Decisiones basadas en datos",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "mt-1 text-4xl font-bold leading-none md:text-[6rem]", children: "Transparencia total" })
      ] }) }),
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `/images/scrollimage.webp`,
          alt: "hero",
          height: 720,
          width: 1400,
          className: "size-full rounded-2xl object-cover object-center",
          draggable: false
        }
      )
    }
  ) });
}

function AnimatedList({
  children,
  className,
  delay = 1400
}) {
  const items = useMemo(
    () => Children.toArray(children).map((node, id) => ({
      id,
      node
    })),
    [children]
  );
  const [queue, setQueue] = useState(items);
  useEffect(() => {
    setQueue(items);
  }, [items]);
  useEffect(() => {
    if (queue.length <= 1) return;
    const timer = window.setInterval(() => {
      setQueue((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, delay);
    return () => window.clearInterval(timer);
  }, [delay, queue.length]);
  return /* @__PURE__ */ jsx("div", { className: cn("flex w-full flex-col gap-3", className), children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: queue.map((item) => /* @__PURE__ */ jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 14, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -14, scale: 0.98 },
      transition: {
        type: "spring",
        stiffness: 240,
        damping: 22,
        mass: 0.55
      },
      children: item.node
    },
    item.id
  )) }) });
}

function getElementCenter(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}
function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  curvature = 0,
  reverse = false,
  duration = 4,
  delay = 0,
  pathColor = "#64748b",
  pathWidth = 2,
  pathOpacity = 0.25,
  gradientStartColor = "#38bdf8",
  gradientStopColor = "#0ea5e9",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0
}) {
  const gradientId = useId().replace(/:/g, "");
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const gradientCoordinates = reverse ? {
    x1: ["90%", "-10%"],
    x2: ["100%", "0%"],
    y1: ["0%", "0%"],
    y2: ["0%", "0%"]
  } : {
    x1: ["10%", "110%"],
    x2: ["0%", "100%"],
    y1: ["0%", "0%"],
    y2: ["0%", "0%"]
  };
  useEffect(() => {
    const updatePath = () => {
      const containerEl = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!containerEl || !fromEl || !toEl) return;
      const containerRect = containerEl.getBoundingClientRect();
      const fromCenter = getElementCenter(fromEl);
      const toCenter = getElementCenter(toEl);
      const startX = fromCenter.x - containerRect.left + startXOffset;
      const startY = fromCenter.y - containerRect.top + startYOffset;
      const endX = toCenter.x - containerRect.left + endXOffset;
      const endY = toCenter.y - containerRect.top + endYOffset;
      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;
      const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
      setPathD(d);
      setSvgSize({ width: containerRect.width, height: containerRect.height });
    };
    updatePath();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updatePath) : null;
    if (containerRef.current && observer) observer.observe(containerRef.current);
    if (fromRef.current && observer) observer.observe(fromRef.current);
    if (toRef.current && observer) observer.observe(toRef.current);
    window.addEventListener("resize", updatePath);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset
  ]);
  if (!pathD || !svgSize.width || !svgSize.height) return null;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: svgSize.width,
      height: svgSize.height,
      viewBox: `0 0 ${svgSize.width} ${svgSize.height}`,
      className: cn("pointer-events-none absolute left-0 top-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: pathD,
            stroke: pathColor,
            strokeOpacity: pathOpacity,
            strokeWidth: pathWidth,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: pathD,
            stroke: `url(#beam-gradient-${gradientId})`,
            strokeWidth: pathWidth + 0.6,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          motion.linearGradient,
          {
            id: `beam-gradient-${gradientId}`,
            gradientUnits: "userSpaceOnUse",
            initial: { x1: "0%", y1: "0%", x2: "0%", y2: "0%" },
            animate: gradientCoordinates,
            transition: {
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0
            },
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: gradientStartColor, stopOpacity: "0" }),
              /* @__PURE__ */ jsx("stop", { offset: "25%", stopColor: gradientStartColor, stopOpacity: "1" }),
              /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: gradientStopColor, stopOpacity: "1" }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: gradientStartColor, stopOpacity: "0" })
            ]
          }
        ) })
      ]
    }
  );
}

const Circle = forwardRef(({ className, children }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "border-border z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:bg-neutral-950",
        className
      ),
      children
    }
  );
});
Circle.displayName = "Circle";
function AnimatedBeamMultipleOutputDemo({
  className
}) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      ),
      ref: containerRef,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex size-full max-w-lg flex-row items-stretch justify-between gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-2", children: [
            /* @__PURE__ */ jsx(Circle, { ref: div1Ref, children: /* @__PURE__ */ jsx(IconBrandGoogleDrive, { className: "size-5" }) }),
            /* @__PURE__ */ jsx(Circle, { ref: div2Ref, children: /* @__PURE__ */ jsx(IconBrandGoogle, { className: "size-5" }) }),
            /* @__PURE__ */ jsx(Circle, { ref: div3Ref, children: /* @__PURE__ */ jsx(IconBrandWhatsapp, { className: "size-5 text-green-500" }) }),
            /* @__PURE__ */ jsx(Circle, { ref: div4Ref, children: /* @__PURE__ */ jsx(IconBrandMessenger, { className: "size-5 text-sky-500" }) }),
            /* @__PURE__ */ jsx(Circle, { ref: div5Ref, children: /* @__PURE__ */ jsx(IconBrandNotion, { className: "size-5" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center", children: /* @__PURE__ */ jsx(Circle, { ref: div6Ref, className: "size-16", children: /* @__PURE__ */ jsx(IconBrandOpenai, { className: "size-8" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center", children: /* @__PURE__ */ jsx(Circle, { ref: div7Ref, children: /* @__PURE__ */ jsx(IconUser, { className: "size-5" }) }) })
        ] }),
        /* @__PURE__ */ jsx(AnimatedBeam, { containerRef, fromRef: div1Ref, toRef: div6Ref }),
        /* @__PURE__ */ jsx(AnimatedBeam, { containerRef, fromRef: div2Ref, toRef: div6Ref }),
        /* @__PURE__ */ jsx(AnimatedBeam, { containerRef, fromRef: div3Ref, toRef: div6Ref }),
        /* @__PURE__ */ jsx(AnimatedBeam, { containerRef, fromRef: div4Ref, toRef: div6Ref }),
        /* @__PURE__ */ jsx(AnimatedBeam, { containerRef, fromRef: div5Ref, toRef: div6Ref }),
        /* @__PURE__ */ jsx(AnimatedBeam, { containerRef, fromRef: div6Ref, toRef: div7Ref })
      ]
    }
  );
}

const DEFAULT_EARTH_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE = "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}
function Marker({
  marker,
  radius,
  defaultSize,
  onClick,
  onHover
}) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const groupRef = useRef(null);
  const imageGroupRef = useRef(null);
  const { camera } = useThree();
  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
  }, [marker.lat, marker.lng, radius]);
  const topPosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.12);
  }, [marker.lat, marker.lng, radius]);
  const lineHeight = topPosition.distanceTo(surfacePosition);
  const markerPixelSize = useMemo(() => {
    const base = (marker.size ?? defaultSize) * 180;
    return Math.max(8, Math.min(14, base));
  }, [defaultSize, marker.size]);
  useFrame(() => {
    if (!imageGroupRef.current) return;
    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);
    const markerDirection = worldPos.clone().normalize();
    const cameraDirection = camera.position.clone().normalize();
    const dot = markerDirection.dot(cameraDirection);
    setIsVisible(dot > 0.05);
  });
  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);
  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);
  const handleClick = useCallback(() => {
    onClick?.(marker);
  }, [marker, onClick]);
  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);
  return /* @__PURE__ */ jsxs("group", { ref: groupRef, visible: isVisible, children: [
    /* @__PURE__ */ jsxs("mesh", { position: lineCenter, quaternion: lineQuaternion, children: [
      /* @__PURE__ */ jsx("cylinderGeometry", { args: [22e-4, 22e-4, lineHeight, 8] }),
      /* @__PURE__ */ jsx(
        "meshBasicMaterial",
        {
          color: hovered ? "#ffffff" : "#94a3b8",
          transparent: true,
          opacity: hovered ? 0.75 : 0.45
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("mesh", { position: surfacePosition, quaternion: lineQuaternion, children: [
      /* @__PURE__ */ jsx("coneGeometry", { args: [0.011, 0.03, 8] }),
      /* @__PURE__ */ jsx("meshBasicMaterial", { color: hovered ? "#f97316" : "#ef4444" })
    ] }),
    /* @__PURE__ */ jsx("group", { ref: imageGroupRef, position: topPosition, children: /* @__PURE__ */ jsx(
      Html,
      {
        transform: true,
        center: true,
        sprite: true,
        distanceFactor: 9,
        style: {
          pointerEvents: isVisible ? "auto" : "none",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease-out"
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "cursor-pointer overflow-hidden rounded-full bg-neutral-900 shadow-md ring-1 ring-white/25 transition-transform duration-200",
              hovered && "scale-110 shadow-lg ring-white/35"
            ),
            style: {
              width: `${markerPixelSize}px`,
              height: `${markerPixelSize}px`
            },
            onMouseEnter: handlePointerEnter,
            onMouseLeave: handlePointerLeave,
            onClick: handleClick,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: marker.src,
                alt: marker.label || "Marker",
                className: "h-full w-full object-cover",
                draggable: false
              }
            )
          }
        )
      }
    ) })
  ] });
}
function RotatingGlobe({
  config,
  markers,
  onMarkerClick,
  onMarkerHover
}) {
  const groupRef = useRef(null);
  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl
  ]);
  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = 16;
    }
    if (bumpTexture) {
      bumpTexture.anisotropy = 8;
    }
  }, [earthTexture, bumpTexture]);
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 64, 64);
  }, [config.radius]);
  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 32, 16);
  }, [config.radius]);
  return /* @__PURE__ */ jsxs(
    "group",
    {
      ref: groupRef,
      rotation: [config.initialRotation.x, config.initialRotation.y, 0],
      children: [
        /* @__PURE__ */ jsx("mesh", { geometry, children: /* @__PURE__ */ jsx(
          "meshStandardMaterial",
          {
            map: earthTexture,
            bumpMap: bumpTexture,
            bumpScale: config.bumpScale * 0.05,
            roughness: 0.7,
            metalness: 0
          }
        ) }),
        config.showWireframe && /* @__PURE__ */ jsx("mesh", { geometry: wireframeGeometry, children: /* @__PURE__ */ jsx(
          "meshBasicMaterial",
          {
            color: config.wireframeColor,
            wireframe: true,
            transparent: true,
            opacity: 0.08
          }
        ) }),
        markers.map((marker, index) => /* @__PURE__ */ jsx(
          Marker,
          {
            marker,
            radius: config.radius,
            defaultSize: config.markerSize,
            onClick: onMarkerClick,
            onHover: onMarkerHover
          },
          `marker-${index}-${marker.lat}-${marker.lng}`
        ))
      ]
    }
  );
}
function Atmosphere({ radius, color, intensity, blur }) {
  const fresnelPower = Math.max(0.5, 5 - blur);
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
  }, [color, intensity, fresnelPower]);
  return /* @__PURE__ */ jsxs("mesh", { scale: [1.12, 1.12, 1.12], children: [
    /* @__PURE__ */ jsx("sphereGeometry", { args: [radius, 64, 32] }),
    /* @__PURE__ */ jsx("primitive", { object: atmosphereMaterial, attach: "material" })
  ] });
}
function Scene({ markers, config, onMarkerClick, onMarkerHover }) {
  const { camera } = useThree();
  React__default.useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: config.ambientIntensity }),
    /* @__PURE__ */ jsx(
      "directionalLight",
      {
        position: [config.radius * 5, config.radius * 2, config.radius * 5],
        intensity: config.pointLightIntensity,
        color: "#ffffff"
      }
    ),
    /* @__PURE__ */ jsx(
      "directionalLight",
      {
        position: [-config.radius * 3, config.radius, -config.radius * 2],
        intensity: config.pointLightIntensity * 0.3,
        color: "#88ccff"
      }
    ),
    /* @__PURE__ */ jsx(
      RotatingGlobe,
      {
        config,
        markers,
        onMarkerClick,
        onMarkerHover
      }
    ),
    config.showAtmosphere && /* @__PURE__ */ jsx(
      Atmosphere,
      {
        radius: config.radius,
        color: config.atmosphereColor,
        intensity: config.atmosphereIntensity,
        blur: config.atmosphereBlur
      }
    ),
    /* @__PURE__ */ jsx(
      OrbitControls,
      {
        makeDefault: true,
        enablePan: config.enablePan,
        enableZoom: config.enableZoom,
        minDistance: config.minDistance,
        maxDistance: config.maxDistance,
        rotateSpeed: 0.4,
        autoRotate: config.autoRotateSpeed > 0,
        autoRotateSpeed: config.autoRotateSpeed,
        enableDamping: true,
        dampingFactor: 0.1
      }
    )
  ] });
}
function LoadingFallback() {
  return /* @__PURE__ */ jsx(Html, { center: true, children: /* @__PURE__ */ jsx("div", { className: "flex shrink-0 flex-col items-center gap-3", children: /* @__PURE__ */ jsx("span", { className: "inline-block shrink-0 text-sm text-neutral-400", children: "Loading globe..." }) }) });
}
const defaultConfig = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null
};
function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover
}) {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config]
  );
  return /* @__PURE__ */ jsx("div", { className: cn("relative h-[500px] w-full", className), children: /* @__PURE__ */ jsx(
    Canvas,
    {
      gl: {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      },
      dpr: [1, 2],
      camera: {
        fov: 45,
        near: 0.1,
        far: 1e3,
        position: [0, 0, mergedConfig.radius * 3.5]
      },
      style: {
        background: mergedConfig.backgroundColor || "transparent"
      },
      children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingFallback, {}), children: /* @__PURE__ */ jsx(
        Scene,
        {
          markers,
          config: mergedConfig,
          onMarkerClick,
          onMarkerHover
        }
      ) })
    }
  ) });
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical
        },
        className
      ),
      children: Array(repeat).fill(0).map((_, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse
          }),
          children
        },
        i
      ))
    }
  );
}

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto."
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data."
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation."
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages."
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain."
  }
];
const sampleMarkers = [
  { lat: 41.8781, lng: -87.6298, src: "https://assets.aceternity.com/avatars/1.webp", label: "Chicago" },
  { lat: 32.7767, lng: -96.797, src: "https://assets.aceternity.com/avatars/2.webp", label: "Dallas" },
  { lat: 29.7604, lng: -95.3698, src: "https://assets.aceternity.com/avatars/3.webp", label: "Houston" },
  { lat: 39.7392, lng: -104.9903, src: "https://assets.aceternity.com/avatars/4.webp", label: "Denver" },
  { lat: 39.0997, lng: -94.5786, src: "https://assets.aceternity.com/avatars/5.webp", label: "Kansas City" },
  { lat: 38.627, lng: -90.1994, src: "https://assets.aceternity.com/avatars/6.webp", label: "St. Louis" },
  { lat: 44.9778, lng: -93.265, src: "https://assets.aceternity.com/avatars/7.webp", label: "Minneapolis" },
  { lat: 40.4168, lng: -3.7038, src: "https://assets.aceternity.com/avatars/8.webp", label: "Madrid" },
  { lat: 41.3851, lng: 2.1734, src: "https://assets.aceternity.com/avatars/9.webp", label: "Barcelona" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/10.webp", label: "Paris" },
  { lat: 52.52, lng: 13.405, src: "https://assets.aceternity.com/avatars/11.webp", label: "Berlin" },
  { lat: 41.9028, lng: 12.4964, src: "https://assets.aceternity.com/avatars/12.webp", label: "Rome" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/13.webp", label: "London" },
  { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/6.webp", label: "Moscow" },
  { lat: 4.711, lng: -74.0721, src: "https://assets.aceternity.com/avatars/3.webp", label: "Bogota" },
  { lat: -23.5505, lng: -46.6333, src: "https://assets.aceternity.com/avatars/9.webp", label: "Sao Paulo" },
  { lat: -34.6037, lng: -58.3816, src: "https://assets.aceternity.com/avatars/12.webp", label: "Buenos Aires" }
];
const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: /* @__PURE__ */ jsx(
      Marquee,
      {
        pauseOnHover: true,
        className: "absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]",
        children: files.map((file, idx) => /* @__PURE__ */ jsxs(
          "figure",
          {
            className: cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            ),
            children: [
              /* @__PURE__ */ jsx("figcaption", { className: "text-sm font-medium dark:text-white", children: file.name }),
              /* @__PURE__ */ jsx("blockquote", { className: "mt-2 text-xs", children: file.body })
            ]
          },
          idx
        ))
      }
    )
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: /* @__PURE__ */ jsx(AnimatedListPreview, { className: "absolute top-4 right-2 h-[300px] w-full scale-[0.82] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-[0.94]" })
  },
  {
    Icon: Share2,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: /* @__PURE__ */ jsx(IntegrationBackgroundBoundary, { children: /* @__PURE__ */ jsx(AnimatedBeamMultipleOutputDemo, { className: "absolute top-4 right-2 h-[300px] w-full border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" }) })
  },
  {
    Icon: Globe,
    name: "All over the world",
    description: "Meet our distributed team of experts working across 6 continents.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    hideMeta: true,
    overlayClassName: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-background/5 to-transparent",
    background: /* @__PURE__ */ jsx(Globe3DPreview, { className: "absolute inset-0 transition-all duration-300 ease-out group-hover:scale-[1.02]" })
  }
];
function BentoDemo() {
  return /* @__PURE__ */ jsx("section", { className: "container pt-8 pb-20 md:pt-10", children: /* @__PURE__ */ jsx(BentoGrid, { children: features.map((feature, idx) => /* @__PURE__ */ jsx(BentoCard, { ...feature }, idx)) }) });
}
function BentoGrid({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("grid auto-rows-[22rem] grid-cols-1 gap-4 lg:grid-cols-3", className), children });
}
function BentoCard({
  Icon,
  name,
  description,
  href,
  cta,
  className,
  overlayClassName,
  hideMeta,
  background
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", children: background }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20",
              overlayClassName
            )
          }
        ),
        !hideMeta && /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-auto", children: [
          /* @__PURE__ */ jsx(Icon, { className: "mb-3 size-5 text-muted-foreground" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-lg text-sm text-muted-foreground", children: description }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href,
              className: "mt-4 inline-flex text-sm font-medium text-primary transition-opacity hover:opacity-80",
              children: cta
            }
          )
        ] })
      ]
    }
  );
}
function AnimatedListPreview({ className }) {
  let notifications = [
    {
      name: "+$46.00 Propina privada",
      description: "Chat premium · Fan verificado",
      time: "hace 38s",
      icon: DollarSign,
      colorFrom: "#33D6FF",
      colorTo: "#00A9FF"
    },
    {
      name: "+$19.99 Renovación mensual",
      description: "Suscripción activa · Cobro automático",
      time: "hace 2 min",
      icon: CreditCard,
      colorFrom: "#5AE0FF",
      colorTo: "#21B8FF"
    },
    {
      name: "+$120.00 Compra PPV",
      description: "Contenido exclusivo · Pago confirmado",
      time: "hace 5 min",
      icon: Wallet,
      colorFrom: "#36CCFF",
      colorTo: "#0EA5E9"
    },
    {
      name: "+$8.50 Desbloqueo extra",
      description: "Mensaje directo · Entrega instantánea",
      time: "hace 7 min",
      icon: DollarSign,
      colorFrom: "#7BE7FF",
      colorTo: "#22B6FF"
    }
  ];
  notifications = Array.from({ length: 10 }, () => notifications).flat();
  const Notification = ({ name, description, icon: Icon, colorFrom, colorTo, time }) => {
    return /* @__PURE__ */ jsx(
      "figure",
      {
        className: cn(
          "relative mx-auto min-h-fit w-full max-w-[430px] cursor-pointer overflow-hidden rounded-2xl p-[1.05rem]",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "border border-[#d7efff] bg-white [box-shadow:0_0_0_1px_rgba(14,165,233,.04),0_8px_20px_rgba(14,165,233,.12)]",
          "transform-gpu dark:border-cyan-300/25 dark:bg-[#0f1826] dark:[box-shadow:0_-20px_80px_-20px_#22d3ee20_inset]"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-3", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative flex size-12 items-center justify-center rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.34)_inset,0_8px_22px_rgba(0,169,255,0.35)]",
              style: {
                backgroundImage: `linear-gradient(180deg, ${colorFrom} 0%, ${colorTo} 100%)`
              },
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "size-5 text-white" }),
                /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/95" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxs("figcaption", { className: "flex flex-row items-center text-lg font-semibold whitespace-pre text-slate-900 dark:text-white", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-lg", children: name }),
              /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-sky-700/70 dark:text-cyan-200/70", children: time })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-slate-500 dark:text-white/60", children: description })
          ] })
        ] })
      }
    );
  };
  return /* @__PURE__ */ jsx("div", { className: cn("overflow-hidden p-2", className), children: /* @__PURE__ */ jsxs("div", { className: cn("relative flex h-[500px] w-full flex-col overflow-hidden p-2"), children: [
    /* @__PURE__ */ jsx(AnimatedList, { children: notifications.map((item, idx) => /* @__PURE__ */ createElement(Notification, { ...item, key: idx })) }),
    /* @__PURE__ */ jsx("div", { className: "from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" })
  ] }) });
}
function Globe3DPreview({ className }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative h-[400px] w-full max-w-lg overflow-hidden rounded-xl bg-white p-10 shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-bold text-neutral-900 dark:text-white", children: "All over the world" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-lg text-balance text-neutral-600 dark:text-neutral-400", children: "Meet our distributed team of experts working across 6 continents." }),
        /* @__PURE__ */ jsx(
          Globe3D,
          {
            className: "absolute -bottom-96 -left-0 h-[700px]",
            markers: sampleMarkers,
            config: {
              atmosphereColor: "#4da6ff",
              atmosphereIntensity: 20,
              bumpScale: 5,
              autoRotateSpeed: 0.3,
              initialRotation: { x: 0, y: -0.7 }
            },
            onMarkerClick: (marker) => {
              console.log("Clicked marker:", marker.label);
            },
            onMarkerHover: (marker) => {
              if (marker) {
                console.log("Hovering:", marker.label);
              }
            }
          }
        )
      ]
    }
  );
}
class IntegrationBackgroundBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("Integrations background failed:", error);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-sky-400/10 via-cyan-400/5 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-60 [background:radial-gradient(circle_at_20%_20%,rgba(56,189,248,.22),transparent_40%),radial-gradient(circle_at_80%_65%,rgba(14,165,233,.2),transparent_40%)]" })
      ] });
    }
    return this.props.children;
  }
}

const logoMap$1 = {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9
};
function CaseStudyCarousel({
  project,
  useIcon,
  hidePrevItem
}) {
  const [api, setApi] = React__default.useState();
  const [current, setCurrent] = React__default.useState(0);
  const [isMoving, setIsMoving] = React__default.useState(false);
  const ProjectLogo = logoMap$1[project.logo] || Logo1;
  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  const scrollTo = (index) => api?.scrollTo(index);
  React__default.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    const onScroll = () => {
      setIsMoving(true);
    };
    const onSettle = () => {
      setIsMoving(false);
    };
    onSelect();
    api.on("select", onSelect);
    api.on("scroll", onScroll);
    api.on("settle", onSettle);
    return () => {
      api.off("select", onSelect);
      api.off("scroll", onScroll);
      api.off("settle", onSettle);
    };
  }, [api]);
  return /* @__PURE__ */ jsxs(
    Carousel,
    {
      setApi,
      opts: {
        align: "center",
        loop: true
      },
      className: "section-padding w-full select-none",
      children: [
        /* @__PURE__ */ jsx(
          CarouselContent,
          {
            className: cn("relative ml-0! cursor-grab", isMoving ? "z-10" : ""),
            children: project.images.map((image, index) => {
              const nextIndex = (current + 1) % project.images.length;
              const prevIndex = (current - 1 + project.images.length) % project.images.length;
              const isReversed = index === nextIndex;
              return /* @__PURE__ */ jsx(
                CarouselItem,
                {
                  className: "3xl:basis-[80%] 5xl:basis-[65%] 4xl:basis-[78%] justify-start pl-0! 2xl:basis-[86%]",
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "container flex flex-col gap-16 transition-all duration-300",
                        isReversed ? "md:flex-row-reverse" : "md:flex-row",
                        prevIndex === index && hidePrevItem ? "2xl:opacity-0" : ""
                      ),
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "space-y-10 sm:max-w-md", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-4xl leading-tight", children: project.title }),
                          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: project.description })
                        ] }) }),
                        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square h-[335px] flex-1 overflow-hidden md:h-[500px] 2xl:h-[608px]", children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: image.src,
                              alt: image.alt,
                              className: "size-full object-cover",
                              sizes: "(max-width: 1024px) 100vw, 608px",
                              fetchPriority: "high"
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: useIcon ? /* @__PURE__ */ jsx(
                            ProjectLogo,
                            {
                              className: "flex h-24 text-white",
                              wordmarkClassName: "hidden"
                            }
                          ) : /* @__PURE__ */ jsx("h3", { className: "font-instrument-serif text-7xl text-white md:text-8xl 2xl:text-9xl", children: project.name }) })
                        ] })
                      ]
                    }
                  )
                },
                index
              );
            })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative container flex translate-y-6 items-center gap-12 md:-translate-y-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "secondary",
                size: "icon",
                className: "rounded-full",
                onClick: scrollPrev,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "secondary",
                size: "icon",
                className: "rounded-full",
                onClick: scrollNext,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: project.images.map((_, idx) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollTo(idx),
              "aria-label": `Go to slide ${idx + 1}`,
              className: cn(
                'relative cursor-pointer after:absolute after:-inset-2 after:content-[""]',
                "h-[6px] w-8 rounded-full transition-all",
                idx === current ? "bg-foreground" : "bg-muted hover:bg-muted-foreground/50"
              )
            },
            idx
          )) })
        ] })
      ]
    }
  );
}

const CaseStudies = ({ projects }) => {
  const caseStudyProjects = projects;
  return /* @__PURE__ */ jsxs("section", { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsx(CaseStudyCarousel, { project: caseStudyProjects[0], useIcon: false }),
    /* @__PURE__ */ jsx(
      CaseStudyCarousel,
      {
        project: caseStudyProjects[1],
        useIcon: true,
        hidePrevItem: true
      }
    ),
    /* @__PURE__ */ jsx(
      CaseStudyCarousel,
      {
        project: caseStudyProjects[2],
        useIcon: true,
        hidePrevItem: true
      }
    )
  ] });
};

const logoMap = {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9
};
const Logos = ({ projects }) => {
  const logoProjects = projects;
  const logos = logoProjects.map((project, index) => ({
    component: logoMap[project.logo],
    href: project.url,
    label: project.name,
    logoOnly: index % 2 === 0
    // Alternate: even indices show logo only, odd show logo + wordmark
  }));
  return /* @__PURE__ */ jsx("section", { className: "section-padding mask-r-from-40% mask-r-to-100% mask-l-from-40% mask-l-to-100%", children: /* @__PURE__ */ jsx(Marquee$1, { pauseOnHover: true, className: "[--duration:20s] [--gap:14rem]", children: logos.map(({ component: LogoComp, href, label, logoOnly }, idx) => /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      className: "flex items-center opacity-50 transition-opacity duration-300 hover:opacity-100",
      children: /* @__PURE__ */ jsx(
        LogoComp,
        {
          className: cn("h-10"),
          wordmarkClassName: logoOnly ? "hidden" : ""
        }
      )
    },
    idx
  )) }) });
};

const services = [
  {
    slug: "logo-design",
    icon: LogoDesignIcon,
    title: "Logo Design",
    description: "We create logos that are simple, memorable, and versatile. Each design is crafted to reflect your brand's values and connect with your audience."
  },
  {
    slug: "brand-identity",
    icon: BrandIdentityIcon,
    title: "Brand Identity",
    description: "A logo is just the beginning. We build complete brand identity systems — including colors, typography, and style guides — so your brand looks consistent everywhere."
  },
  {
    slug: "rebranding",
    icon: DropletIcon,
    title: "Rebranding",
    description: "Is your current logo outdated? We help businesses refresh their look with a modern identity that stays true to their story while appealing to today's audience."
  },
  {
    slug: "icon-design",
    icon: DiamondShapesIcon,
    title: "Icon Design",
    description: "We design custom icons and visual marks that work alongside your logo, making your brand easier to recognize across digital platforms, print, and everyday applications."
  }
];
const Services = () => {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: cn(
        "section-padding container",
        "grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-9"
      ),
      children: services.map((service, index) => {
        const Icon = service.icon;
        return /* @__PURE__ */ jsxs(Card$1, { className: "bg-muted border-none", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(Icon, { className: "size-9" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: service.title }),
            /* @__PURE__ */ jsx(CardDescription, { className: "max-w-lg", children: service.description })
          ] }),
          /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx("a", { href: `/services/${service.slug}`, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "lg", children: "Learn more" }) }) })
        ] }, index);
      })
    }
  );
};

export { AboutIntro as A, BentoDemo as B, CaseStudies as C, Hero as H, Logos as L, Services as S, HeroScrollDemo as a };
