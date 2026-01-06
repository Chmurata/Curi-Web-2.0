import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import CircularCycleDiagram from './CircularCycleDiagram';
import { RoundedArrowButton } from "./ui/RoundedArrowButton";
import { assets } from "./Imports";

// Re-implementing the FlywheelSection to wrap the new Diagram
export function FlywheelSection() {

  return (
    <section className="relative">
      {/* The New Circular Diagram Component */}
      <CircularCycleDiagram />

    </section>
  );
}
