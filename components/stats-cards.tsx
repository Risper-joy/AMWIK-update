"use client"

import { Users, GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Members",
    color: "#E6326E", // Accent Pink/Magenta
    textColor: "white",
  },
  {
    icon: GraduationCap,
    number: "10,000+",
    label: "Women Trained",
    color: "#78B43C", // Accent Green
    textColor: "white",
  },
  {
    icon: Award,
    number: "50+",
    label: "Scholarships",
    color: "#F0C83C", // Accent Yellow/Gold
    textColor: "black", // better contrast on yellow
  },
]

export default function StatsCards() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              style={{ backgroundColor: stat.color, color: stat.textColor }}
              className="p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform"
            >
              <stat.icon className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
