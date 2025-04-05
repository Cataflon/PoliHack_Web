"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Search, User, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Function to scroll to services section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", searchQuery)
    // Implement search functionality here
  }

  // Set up intersection observer to detect when services section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          observer.disconnect() // Only trigger once
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    )

    if (servicesRef.current) {
      observer.observe(servicesRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Service card data
  const services = [
    { color: "#5dd0b8", title: "Medic de familie" },
    { color: "#f0c53d", title: "Dentist" },
    { color: "#ff3e8e", title: "Psiholog" },
    { color: "#e67e22", title: "Fitness" },
    { color: "#1e40af", title: "Nutritionist" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen bg-[#2a7ea4] flex flex-col items-center">
        {/* Logo and Navigation */}
        <div className="w-full max-w-7xl px-4 pt-6">
          <div className="flex flex-col items-center">
            {/* Logo and Search Bar Container */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="h-14 w-14 rounded-full bg-[#5dd0b8] flex items-center justify-center"></div>

              <form
                onSubmit={handleSearchSubmit}
                className="bg-white rounded-full py-2 px-4 flex items-center shadow-md w-full max-w-xl mx-4"
              >
                <Search className="h-5 w-5 text-[#5dd0b8] mr-2" />
                <input
                  type="text"
                  placeholder="search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-300"
                />
              </form>

              <div className="flex items-center space-x-6">
                <Link
                  href="#faqs"
                  className="text-[#5dd0b8] font-medium bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  href="#harta"
                  className="text-[#5dd0b8] font-medium bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  Harta
                </Link>
                <Link
                  href="#contact"
                  className="text-[#5dd0b8] font-medium bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  Contact
                </Link>
                <Link href="#profile">
                  <User className="h-6 w-6 text-[#5dd0b8] hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 -mt-10">
          <div>
            <h1 className="text-white text-7xl md:text-8xl font-bold tracking-tighter mb-6">KlausenHealth</h1>

            <div className="max-w-2xl mx-auto text-white space-y-2">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley o
              </p>
            </div>

            <div className="mt-10">
              <button
                onClick={scrollToServices}
                className="bg-white text-[#5dd0b8] font-bold px-12 py-3 rounded-full inline-block uppercase tracking-wide"
              >
                Pula Mea
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="min-h-screen bg-white relative py-16">
        {/* Background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L20 80 L80 80 Z' stroke='%23a2b3a2' fill='none' strokeWidth='1'/%3E%3Cpath d='M50 50 L80 20 L20 20 Z' stroke='%23a2b3a2' fill='none' strokeWidth='1'/%3E%3Cpath d='M30 50 L30 30 L50 30 Z' stroke='%23a2b3a2' fill='none' strokeWidth='1'/%3E%3Cpath d='M70 50 L70 70 L50 70 Z' stroke='%23a2b3a2' fill='none' strokeWidth='1'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Services grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isServicesVisible ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
                {/* Colored circle with icon */}
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: service.color }}
                >
                  <div className="relative">
                    <Briefcase className="w-16 h-16 text-white" />
                    {/* Add a plus sign to make it look like a medical kit */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">+</div>
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div
                  className="text-center bg-gray-100 hover:shadow-xl rounded-3xl shadow-md px-4 py-6 w-full transition-all duration-300 ease-in-out hover:scale-105 group"
                  style={
                    {
                      "--hover-color": service.color,
                    } as React.CSSProperties
                  }
                >
                  <h3 className="font-bold text-xl mb-2 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm group-hover:text-white/90 transition-colors duration-300">
                    is simply
                    <br />
                    dummy text
                    <br />
                    of the
                    <br />
                    printing
                    <br />
                    and typesetti
                  </p>
                  <style jsx>{`
                    .group:hover {
                      background-color: var(--hover-color);
                    }
                  `}</style>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

