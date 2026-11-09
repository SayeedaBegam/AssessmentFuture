"use client";
import { motion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="motion-surface"
      initial={{ y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
