"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Phone, Mail, Globe } from "lucide-react"

const faqs = [
  {
    question: "What type of harassment are you experiencing?",
    answer:
      "Harassment can take many forms, including sexual harassment in newsrooms, online abuse (TFGBV), cyberstalking, hate speech, and harassment through anonymous accounts. In AMWIK studies, over 60% of journalists reported sexual harassment at some point, while online harassment is widespread on platforms like Facebook and WhatsApp. Identifying the form of harassment helps you know the right reporting and support pathway.",
  },
  {
    question: "What do I do if the harassment is anonymous?",
    answer:
      "Anonymous harassment is common online. First, document the abuse (screenshots, URLs, dates). Restrict who can see your content, and use platform-level reporting tools. If it escalates, report to the Media Council of Kenya (MCK) or cybercrime units. Remember that anonymity doesn’t prevent accountability—law enforcement can request data from platforms.",
  },
  {
    question: "What if race and/or gender is a factor in the harassment?",
    answer:
      "Intersectional harassment—targeting your race, gender, or both—amplifies the harm. Acknowledge it as both gender-based violence and discrimination. AMWIK recommends accessing psychosocial support, leaning on peer networks, and reporting both to your media organisation and independent bodies like FIDA Kenya for legal aid.",
  },
  {
    question: "What do I do if the harassment is committed by someone located in another country?",
    answer:
      "Cross-border harassment is increasingly common. Start by documenting evidence and using platform-level reporting tools. If the harassment involves threats or reputational damage, contact organisations like ARTICLE 19 and international digital safety coalitions. Kenyan cybercrime units can liaise with Interpol and foreign platforms, though enforcement may take longer.",
  },
  {
    question:
      "What do I do as a media organisation, or an employee of a media organisation, experiencing online harassment?",
    answer:
      "Media houses should adopt confidential reporting procedures, provide in-house counselling, train staff on digital safety, and create social media policies. As an employee, report through official HR or editorial channels. Freelancers who lack such structures can reach out to AMWIK or MCK, which are working to extend protection and psychosocial support to independent journalists.",
  },
  {
    question: "Where else can I find help?",
    answer:
      "Support is available through: AMWIK (awareness, reporting pathways, psychosocial support), Media Council of Kenya, FIDA Kenya (legal aid), ARTICLE 19, and counselling hotlines. For urgent digital threats, contact Kenya’s National Computer Incident Response Team (KE-CIRT). Peer networks and women journalist coalitions are also vital for solidarity and resilience.",
  },
]

const quickLinks = [
  {
    title: "AMWIK",
    phone: "+254 722 201958",
    email: "info@amwik.org",
    url: "https://amwik.org",
  },
  {
    title: "Media Council of Kenya (MCK)",
    phone: "+254 720 222111",
    email: "info@mediacouncil.or.ke",
    url: "https://mediacouncil.or.ke",
  },
  {
    title: "FIDA Kenya (Legal Aid)",
    phone: "+254 709 943000",
    email: "info@fidakenya.org",
    url: "https://fidakenya.org",
  },
  {
    title: "KE-CIRT (Cybersecurity Hotline)",
    phone: "+254 703 042700",
    email: "incidents@ke-cirt.go.ke",
    url: "https://ke-cirt.go.ke",
  },
  {
    title: "ARTICLE 19 Eastern Africa",
    phone: "+254 20 386 2280",
    email: "eafrica@article19.org",
    url: "https://www.article19.org",
  },
]

export default function GuidancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white py-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-[var(--amwik-purple)] opacity-80 z-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <h1 className="text-5xl font-bold mb-4 text-white">Guidance for Female Journalists</h1>
          <p className="text-xl text-white">
            Practical advice on how to respond to sexual harassment and
            technology-facilitated gender-based violence (TFGBV), tailored for the Kenyan media context.
          </p>
        </div>
      </section>

      {/* FAQ + Sidebar */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-8">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="hover:shadow-lg transition-shadow border border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-[var(--amwik-purple)]">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar Quick Links */}
          <aside className="space-y-6">
            <h2 className="text-2xl font-semibold text-[var(--amwik-purple)] mb-4">
              Quick Help
            </h2>
            {quickLinks.map((link, idx) => (
              <Card key={idx} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-[var(--amwik-purple)]" />
                    {link.phone}
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[var(--amwik-purple)]" />
                    {link.email}
                  </p>
                  <p className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-[var(--amwik-purple)]" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {link.url}
                    </a>
                  </p>
                </CardContent>
              </Card>
            ))}
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  )
}
