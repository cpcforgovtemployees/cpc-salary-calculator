import type { SalaryBreakdown } from "@/lib/salary-calculator";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

interface SalaryInsightsProps {
  data7th: SalaryBreakdown;
  data8th: SalaryBreakdown;
}

export default function SalaryInsights({ data7th, data8th }: SalaryInsightsProps) {
  if (!data7th || !data8th || !data7th.grossSalary) return null;

  return (
    <div className="mt-10 space-y-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Add animated insights here */}
      </motion.div>
    </div>
  );
}
