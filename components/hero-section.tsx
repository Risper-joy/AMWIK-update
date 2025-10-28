interface HeroSectionProps {
  title: string
  description: string
  backgroundImage: string
  height?: string
}

export default function HeroSection({
  title,
  description,
  backgroundImage,
  height = "py-16", // Default height
}: HeroSectionProps) {
  return (
    <section className={`relative text-white ${height}`}>
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <h1 className="text-5xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-xl max-w-3xl mx-auto text-white">{description}</p>
      </div>
    </section>
  )
}
