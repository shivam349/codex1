'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-makhana-400">
              Mithila Makhana
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Premium quality foxnuts from the fertile lands of Mithila, Bihar. Handpicked, naturally roasted, and delivered fresh to your home.
            </p>
            <div className="flex gap-4 pt-4">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-makhana-400 hover:text-makhana-300 transition-colors text-xl"
                title="Instagram"
              >
                📷
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-makhana-400 hover:text-makhana-300 transition-colors text-xl"
                title="WhatsApp"
              >
                💬
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-makhana-400 hover:text-makhana-300 transition-colors text-xl"
                title="Facebook"
              >
                👥
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="/" className="hover:text-makhana-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-makhana-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-makhana-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-makhana-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Information</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-makhana-400 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-makhana-400 transition-colors">
                  Return & Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-makhana-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-makhana-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:hello@mithilamakhana.com" className="text-gray-400 hover:text-makhana-400 transition-colors">
                      hello@mithilamakhana.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:+919876543210" className="text-gray-400 hover:text-makhana-400 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              © {currentYear} Mithila Makhana. All rights reserved. Made with ❤️ in Bihar
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              <a 
                href="#" 
                className="text-gray-400 hover:text-makhana-400 transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-makhana-400 transition-colors text-sm border-l border-gray-600 pl-6"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
