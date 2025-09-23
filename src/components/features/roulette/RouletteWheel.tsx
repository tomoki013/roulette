"use client";

import { motion } from "framer-motion";
import { Item } from "@/types";

interface RouletteWheelProps {
  items: Item[];
  rotation: number;
  isSpinning: boolean;
}

const RouletteWheel = ({ items, rotation, isSpinning }: RouletteWheelProps) => {
  const generateWheelSections = () => {
    const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);
    let currentAngle = 0;

    return items.map((item, index) => {
      const sectionAngle = (item.ratio / totalRatio) * 360;
      const startAngle = currentAngle;
      currentAngle += sectionAngle;

      const x1 = Math.cos((startAngle * Math.PI) / 180) * 150;
      const y1 = Math.sin((startAngle * Math.PI) / 180) * 150;
      const x2 = Math.cos((currentAngle * Math.PI) / 180) * 150;
      const y2 = Math.sin((currentAngle * Math.PI) / 180) * 150;

      const largeArcFlag = sectionAngle > 180 ? 1 : 0;
      const pathData = `M 0 0 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      const textAngle = startAngle + sectionAngle / 2;
      const textX = Math.cos((textAngle * Math.PI) / 180) * 100;
      const textY = Math.sin((textAngle * Math.PI) / 180) * 100;

      return (
        <g key={index}>
          <path
            d={pathData}
            fill={item.color}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          <text
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-bold text-sm"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            {item.name}
          </text>
        </g>
      );
    });
  };

  const renderPointer = () => (
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 drop-shadow-lg">
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "15px solid #fef08a",
        }}
      />
      <div
        className="absolute -top-px"
        style={{
          left: "-5px",
          width: 0,
          height: 0,
          borderLeft: "11px solid transparent",
          borderRight: "11px solid transparent",
          borderTop: "17px solid white",
          zIndex: -1,
        }}
      />
    </div>
  );

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={{ rotate: rotation }}
        transition={{
          duration: isSpinning ? 3 : 0,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <svg width="320" height="320" viewBox="-160 -160 320 320">
          {generateWheelSections()}
        </svg>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-lg" />
      </div>

      {renderPointer()}
    </div>
  );
};

export default RouletteWheel;
