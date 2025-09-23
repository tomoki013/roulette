"use client";

import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="relative w-24 h-24">
      {/* 背景の円 */}
      <motion.div className="absolute inset-0 border-4 border-white/20 rounded-full" />
      {/* アニメーションする円弧 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "4px solid transparent",
          borderTopColor: "#fff",
          borderLeftColor: "#fff",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
