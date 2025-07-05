import { Link } from "react-router-dom"
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

function ModernFooter() {
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/eminencetally/",
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/eminence-tally-411019239/?originalSubdomain=in",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/eminence_tally/",
      icon: Instagram,
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {navigationLinks.map((link) => (
              <div key={link.name} className="text-center">
                <h6 className="text-sm font-semibold uppercase tracking-wider">
                  <Link to={link.path} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </h6>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8"></div>

          {/* Company Description */}
          <div className="mb-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-300 leading-relaxed">
                Eminence Tally Services has on offer one of the finest environments for career development and
                advancement. We believe in a vibrant, open door approach whilst providing a strong performance driven
                environment where hierarchies are inconsequential. Eminence Tally Services ensures that career
                development programs are harmoniously aligned with organizational objectives so as to accomplish growth
                for both employees and the company.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Email</span>
              </div>
              <p className="text-white">info@eminencetally.com</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Phone className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Phone</span>
              </div>
              <p className="text-white">+91 12345 67890</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Location</span>
              </div>
              <p className="text-white">Sehore (M.P), India</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <IconComponent className="w-6 h-6" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 py-6">
          <div className="text-center text-gray-400">
            <p>
              © 2017 Copyright:{" "}
              <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
                EminenceTally.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ModernFooter
