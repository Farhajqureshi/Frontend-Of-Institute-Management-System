"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Star, Heart, Clock, DollarSign, MapPin, Loader2, ArrowRight } from "lucide-react"
import { cardObject } from "@/utils/cardObj"
import { Link } from "react-router-dom"


function Courses() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading

    return () => clearTimeout(timer)
  }, [])

  // Loading Screen
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Loader2 className="w-16 h-16 text-gray-600 animate-spin" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">Loading Our Courses</h3>
                  <p className="text-gray-600">Preparing our popular course offerings...</p>
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Popular Courses</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most sought-after courses designed to boost your career in accounting and finance
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardObject.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-gray-200 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.cardImg || "/placeholder.svg"}
                    alt={item.cardName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gray-900 text-white">Popular</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {/* Course Title */}
                <h5 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {item.cardName}
                </h5>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-600">{item.review}</span>
                </div>

                {/* Course Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{item.User}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{item.Like}</span>
                  </div>
                </div>

                {/* Duration and Fees */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{item.Duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{item.Fees}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Mode: Offline</span>
                  </div>
                </div>

                {/* Enroll Button */}
                {/* <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white mt-4">Enroll Now</Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Find More Courses Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-gray-700 text-gray-700 hover:bg-gray-900 hover:text-white px-8 py-3 bg-transparent"
          >
            <Link to="/contact" className="flex items-center space-x-2">
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
          </Button>
        </div>
      </div>

      <style >{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

export default Courses
