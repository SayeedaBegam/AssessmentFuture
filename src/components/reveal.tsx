"use client";
import { motion } from "framer-motion";
export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="motion-surface"
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
