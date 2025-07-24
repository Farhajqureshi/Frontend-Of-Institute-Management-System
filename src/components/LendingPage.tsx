"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from "lucide-react"
import LendingImg from "../assets/Animation.webp"

function LandingPage() {
  const imgRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const tl = gsap.timeline()

  useGSAP(() => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        y: -80,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }

    if (textRef.current) {
      tl.from(textRef.current, {
        opacity: 0,
        duration: 2,
        y: -100,
        delay: 1,
        stagger: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.out",
      })
    }
  })

  const features = [
    { icon: CheckCircle, text: "Professional Certification" },
    { icon: Users, text: "Expert Guidance" },
    { icon: Award, text: "Industry Recognition" },
    { icon: TrendingUp, text: "Career Growth" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                ref={textRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent leading-tight"
              >
                EminenceTally
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
                Computerised Accounting Solution
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed tracking-wide max-w-2xl">
              If you are looking to find job opportunities, make an impact in the job market and know its nuances - then
              we assist you in your journey right from certification to specialization and later with various job
              opportunities.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 py-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white border border-gray-600"
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-700 hover:bg-gray-100 bg-transparent hover:text-gray-900"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Animated Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                ref={imgRef}
                src={LendingImg}
                alt="EminenceTally Animation"
                className="relative z-10 w-80 h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100/80 backdrop-blur-sm border-y border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-800">10+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
