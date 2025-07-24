import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Award, Users, Headphones, Lightbulb, Loader2 } from "lucide-react";
import AboutImg from "../assets/about2.png.webp";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function AboutPage() {


  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading

    return () => clearTimeout(timer)
  }, [])

  





  const imgRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      scale: 3,
      duration: 2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1.1,
      duration: 2,
      ease: "power2.out",
    });
  };

  const features = [
    {
      icon: Lightbulb,
      title: "Creative ideas base",
      description: "Innovative solutions for your business needs",
    },
    {
      icon: Users,
      title: "Experienced Trainers",
      description: "Learn from industry experts",
    },
    {
      icon: Award,
      title: "Certification",
      description: "Get certified and boost your career",
    },
    {
      icon: Headphones,
      title: "Job Support",
      description: "Complete placement assistance",
    },
  ];


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
                  <h3 className="text-2xl font-bold text-gray-800">Loading About Details</h3>
                  <p className="text-gray-600">Preparing our about details offerings...</p>
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
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-gray-600 font-medium tracking-wide">
                More About Our Institute
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Want to know more
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              Eminence Tally Computerized accounting Solutions is committed to
              the growth of computerized accounting awareness among the people
              and is an effective solution provider to various small and middle
              enterprises, to suit their changing needs in computerized
              accounting. Featuring.... Master Tally Partner Tally Service
              Partner (TSP) Authorized Distributors Tally Authorized Service
              center Authorized Tally Academies Authorized Sales and Promotion
              Tally Customization Authorized Tally Accounts Training and Support
              Tally Placement Counseling Accounting Solutions Provider.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-l-4 border-l-gray-700 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3"
              >
                <Link to="/contact">Contact Now</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute cursor-pointer overflow-hidden inset-0 bg-gradient-to-r from-gray-200 to-gray-400 rounded-2xl blur-2xl opacity-20 transform rotate-6"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></div>
              <img
                ref={imgRef}
                src={AboutImg}
                alt="About Company"
                className="relative z-10 w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
