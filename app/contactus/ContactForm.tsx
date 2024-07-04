'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Link from 'next/link';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    phone: '',
    email: '',
    dropdown: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log form data before submission
    
    try {
      await emailjs.sendForm(
        'service_hyeanlk', // encrypt this
        'template_hj7f2ip', // encrypt this
        e.target as HTMLFormElement,
        '9v7frkj4uMmaMblc9' // encrypt this
      );
      alert('Message sent successfully!');
      setFormData({
        userName: '',
        phone: '',
        email: '',
        dropdown: '',
        message: '',
      });
    } catch (error) {
      console.error('OOPS!!! Try submitting form again:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 m-11" id='contactus'>
      <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto bg-red-200 shadow-md rounded-lg p-6 md:p-8 lg:p-10 xl:p-12 mt-11">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Name*"
              className="w-full px-4 py-3 rounded-full border focus:outline-none focus:ring focus:border-blue-300"
              value={formData.userName}
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
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
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
