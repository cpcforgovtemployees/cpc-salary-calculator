"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    feedbackType: "general"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        feedbackType: "general"
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Contact & Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for support, queries, suggestions, or feedback about our government salary calculator tools
          </p>
        </header>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold text-blue-900">Email</h3>
            <p className="text-sm text-blue-700 break-all">cpcforgovtemployees@gmail.com</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-green-900">Response</h3>
            <p className="text-sm text-green-700">Within 24 hours</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-semibold text-purple-900">Location</h3>
            <p className="text-sm text-purple-700">Delhi, India</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-orange-900">Support</h3>
            <p className="text-sm text-orange-700">Mon - Fri (9am - 6pm)</p>
          </div>
        </div>

        {/* Contact Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="lg:col-span-2 bg-white shadow-md rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-800">
                Thank you for your message! We will get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Type</label>
                  <select
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please share your message, query, or feedback in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-6">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-sm text-gray-600 break-all">cpcforgovtemployees@gmail.com</p>
                  <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                  <p className="text-sm text-gray-600">Delhi, India</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-6">
                <Clock className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Support Hours</h3>
                  <p className="text-sm text-gray-600">Monday to Friday</p>
                  <p className="text-sm text-gray-600">9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </Card>

            <Card className="bg-blue-50 shadow-md rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Feedback Categories</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  General Inquiry
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Bug Reports
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Feature Requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Support & Help
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md rounded-xl p-8 border border-indigo-200 hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-gray-800 mb-2">How long does it take to get a response?</h4>
              <p className="text-sm text-gray-700">We respond to all inquiries within 24 hours during business days (Monday-Friday, 9am-6pm IST).</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-gray-800 mb-2">What if I find a bug?</h4>
              <p className="text-sm text-gray-700">Please report bugs with details about what you were doing and which browser you are using. This helps us fix issues quickly.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-gray-800 mb-2">Can I suggest new features?</h4>
              <p className="text-sm text-gray-700">Absolutely! We love feature suggestions. Select Feature Request in the form and describe your idea in detail.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-gray-800 mb-2">Is my information confidential?</h4>
              <p className="text-sm text-gray-700">Yes, all personal information shared through this form is kept confidential and used only for responding to your inquiry.</p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-6 text-lg">Thank you for being part of the Indian Pay Calculator community!</p>
          <Link href="/">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg hover:shadow-xl">
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}