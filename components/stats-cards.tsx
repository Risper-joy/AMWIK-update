import { Users, GraduationCap, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Members",
    color: "amwik-red",
  },
  {
    icon: GraduationCap,
    number: "10,000+",
    label: "Women Trained",
    color: "amwik-orange",
  },
  {
    icon: Award,
    number: "50+",
    label: "Scholarships",
    color: "amwik-yellow",
  },
]

export default function StatsCards() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} text-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform`}
            >
              <stat.icon className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
