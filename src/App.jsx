import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    // Letters flicker in one by one
    tl.fromTo(".letter-m", { opacity: 0 }, {
      opacity: 1,
      duration: 0.15,
      repeat: 3,
      yoyo: true,
      ease: "steps(1)",
    })
      .to(".letter-m", { opacity: 1, duration: 0.1 })
      .fromTo(".letter-q", { opacity: 0 }, {
        opacity: 1,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
        ease: "steps(1)",
      }, "-=0.1")
      .to(".letter-q", { opacity: 1, duration: 0.1 })
      .fromTo(".letter-t", { opacity: 0 }, {
        opacity: 1,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
        ease: "steps(1)",
      }, "-=0.1")
      .to(".letter-t", { opacity: 1, duration: 0.1 })
      // Pause to let it sit
      .to(".vi-mask-group", {
        duration: 0.6,
      })
      // Shake
      .to(".vi-mask-group", {
        x: -10, duration: 0.05, ease: "power2.inOut",
      })
      .to(".vi-mask-group", {
        x: 10, duration: 0.05, ease: "power2.inOut",
      })
      .to(".vi-mask-group", {
        x: -5, duration: 0.05, ease: "power2.inOut",
      })
      .to(".vi-mask-group", {
        x: 0, duration: 0.05, ease: "power2.inOut",
      })
      // White flash
      .to(".intro-flash", {
        opacity: 1,
        duration: 0.15,
        ease: "power4.in",
      })
      // Zoom out with rotation
      .to(".vi-mask-group", {
        scale: 10,
        rotate: 10,
        duration: 1.5,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
      }, "-=0.1")
      .to(".intro-flash", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            document.querySelector(".svg")?.remove();
            setShowContent(true);
            this.kill();
          }
        },
      }, "-=1");
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const isMobile = window.innerWidth <= 768;

    gsap.to(".character", {
      scale: isMobile ? 0.35 : 0.5,
      x: "-50%",
      bottom: isMobile ? "-90%" : "-96%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: isMobile ? 0.3 : 0.5,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    // Only enable parallax on desktop
    if (window.innerWidth > 768) {
      main?.addEventListener("mousemove", function (e) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to(".main .text", {
          x: `${xMove * 0.4}%`,
        });
        gsap.to(".sky", {
          x: xMove,
        });
        gsap.to(".bg", {
          x: xMove * 1.7,
        });
        gsap.to(".character", {
          x: "-50%",
          y: yMove * 0.3,
          rotateY: xMove * 0.3,
          rotateX: -yMove * 0.2,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <div className="intro-flash fixed inset-0 bg-white z-[200] opacity-0 pointer-events-none"></div>
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  className="letter-m"
                  x="280"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  opacity="0"
                >
                  M
                </text>
                <text
                  className="letter-q"
                  x="420"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  opacity="0"
                >
                  Q
                </text>
                <text
                  className="letter-t"
                  x="560"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  opacity="0"
                >
                  T
                </text>
              </g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#f0c040" mask="url(#viMask)" />
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
            opacity="0.7"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-3 px-3 sm:py-5 sm:px-5">
              <div className="logo flex gap-2 sm:gap-3">
                <div className="lines flex flex-col gap-[2px]">
                  <div className="line w-6 sm:w-8 h-1 bg-white"></div>
                  <div className="line w-4 sm:w-5 h-1 bg-white"></div>
                  <div className="line w-2 sm:w-3 h-1 bg-white"></div>
                </div>
                <h3 className="text-xl sm:text-2xl -mt-[4px] leading-none text-white">
                  MQT
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-1 absolute top-[-90px] sm:top-[-90px] left-1/2 -translate-x-1/2 scale-[0.7] rotate-[-10deg]">
                <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] leading-none -ml-20 sm:-ml-40">Muqeet</h1>
                <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] leading-none ml-10 sm:ml-20">Sofware</h1>
                <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] leading-none -ml-20 sm:-ml-40">Engineer</h1>
              </div>
              <img
                className="absolute character -bottom-[75%] left-1/2 -translate-x-1/2  scale-[1.5] rotate-[-20deg]"
                src="./bg-boy-.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-4 sm:py-8 px-3 sm:px-5 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-2 items-center">
                <i className="text-xl sm:text-2xl ri-arrow-down-line"></i>
                <h3 className="text-xs sm:text-sm font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>

            </div>
          </div>
          <div className="w-full min-h-screen flex items-center justify-center bg-black py-10 sm:py-0">
            <div className="cntnr flex flex-col md:flex-row text-white w-full md:h-[80%] px-5 sm:px-0">
              <div className="limg relative w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-full mb-8 md:mb-0">
                <img
                  className="absolute w-40 sm:w-50 md:w-70 top-58 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./three.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-15">
                <h1 className="text-4xl">I am who solves a problem, you didn’t know you had, </h1>
                <h1 className="text-4xl"> in a way that you didn’t understand.</h1>
                <p className="mt-5 text-sm font-[Helvetica_Now_Display]">
                  I break things down to understand them.
                </p>
                <p className="mt-2 text-sm font-[Helvetica_Now_Display]">
                  I build them back better with code and curiosity.
                </p>
                <p className="mt-5 text-sm font-[Helvetica_Now_Display]">
                  The goal isn’t to write software. The goal is to create what doesn’t exist yet.
                </p>
                <button className="bg-yellow-500 px-5 py-5 text-black mt-5 text-2xl">
                  <a href="https://github.com/muqeet1001">Curious About Me? →</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;