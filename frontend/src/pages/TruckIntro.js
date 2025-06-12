import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import truckImg from "../assets/HomeTruck.png";
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const TruckIntro = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: 0.5 } // At least 50% of the section must be visible
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation timing
  const truckDuration = 4;
  const cloudDuration = truckDuration;
  const cloudDelay = 1.2; // Cloud appears after truck starts moving

  return (
    <>
      <style>{`
        .truck-section {
          position: relative;
          width: 100%;
          min-height: 400px;
          background-color: #ffffff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
        }

        .truck-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          width: 0vw;
          background: linear-gradient(90deg, #e3f0fb 60%, #ffffff00 100%);
          z-index: 0;
          pointer-events: none;
          transition: background 0.3s;
        }

        .cloud-container {
          position: absolute;
          bottom: 90px;
          left: 0;
          width: 220px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        .cloud-shape {
          width: 220px;
          height: 90px;
          background: #fff;
          border-radius: 50% 50% 60% 60% / 60% 60% 80% 80%;
          box-shadow: 0 8px 32px 0 rgba(36,41,54,0.10);
          position: absolute;
        }

        .logo-in-cloud {
          position: relative;
          z-index: 2;
          font-size: 2rem;
          font-weight: 600;
          color: #1976d2;
          letter-spacing: 2px;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
        }

        .truck {
          position: absolute;
          bottom: 40px;
          width: 120px;
          z-index: 3;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.10));
        }

        .text-container {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-top: 2rem;
        }
      `}</style>

      <div className="truck-section" ref={sectionRef}>
        {/* Animated blue background that grows with the truck */}
        <motion.div
          className="truck-bg"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "100%",
            width: "0vw",
            background: "linear-gradient(90deg, #e3f0fb 60%, #ffffff00 100%)",
            zIndex: 0,
            pointerEvents: "none",
            transition: "background 0.3s"
          }}
          initial={{ width: "0vw" }}
          animate={
            inView
              ? { width: "100vw" }
              : { width: "0vw" }
          }
          transition={{
            width: { duration: truckDuration, ease: "easeInOut" }
          }}
        />

        {/* Truck animation from left to right, smooth and professional */}
        <motion.img
          src={truckImg}
          alt="Truck"
          className="truck"
          initial={{ x: "-220px", opacity: 0 }}
          animate={
            inView
              ? { x: "calc(100vw - 120px)", opacity: 1 }
              : { x: "-220px", opacity: 0 }
          }
          transition={{ duration: truckDuration, ease: "easeInOut" }}
        />

        {/* Animated text fades in after truck and cloud finish */}
        <motion.div
          className="text-container"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: 2,
            duration: 2.5,
            ease: "easeOut",
          }}
        >
          <SplitText
            text="Sledje"
            className="text-7xl md:text-7xl py-2 font-light text-black md:tracking-tight text-center"
            delay={80}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <SplitText
            text="Software Solutions"
            className="text-xl md:text-3xl font-light text-black md:tracking-tight text-center"
            delay={80}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </motion.div>
      </div>
    </>
  );
};

export default TruckIntro;
