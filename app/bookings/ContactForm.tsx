// components/ContactForm.tsx
'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    subject: '',
    message: '',
    dropdown: '', // Added dropdown to formData state
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can add form submission logic here (e.g., API call)
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 m-11" id='contactus'>
      <form className="w-full max-w-6xl mx-auto bg-red-200 shadow-md rounded-lg p-6 md:p-8 lg:p-10 xl:p-12 mt-11">
        {/* <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name*"
              className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone*"
              className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-full md:w-auto px-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              className="w-full md:w-64 px-4 py-3 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="dropdown" className="block text-black mb-2">How did you hear about us</label>
          <select
            id="dropdown"
            name="dropdown"
            className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
            value={formData.dropdown}
            onChange={handleChange}
            required
          >
            <option value="">Choose a reason</option>
            <option value="option1">Facebook</option>
            <option value="option2">Twitter</option>
            <option value="option3">LinkedIn</option>
          </select>
        </div>
        
        <div className="mb-8">
          <textarea
            id="message"
            name="message"
            placeholder="Message*"
            rows={5}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring focus:border-blue-300"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <p className='text-gray-600 p-4 text-sm'> By submitting this form I accept the <Link href="/" className='underline'>Privacy Policy</Link> of this site.</p>
        
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 md:px-8 md:py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
