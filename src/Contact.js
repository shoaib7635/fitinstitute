import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message
    };

    emailjs
      .send(
        'service_j6anm83',    // 🔁 Replace with your actual Service ID
        'template_2jnp26n',   // 🔁 Replace with your actual Template ID
        templateParams,
        'TAEw-GfJioSge_4o3'     // 🔁 Replace with your actual Public Key
      )
      .then(
        (response) => {
          alert(`Thank you ${form.name}, your message has been sent!`);
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('EmailJS Error:', error);
          alert('Something went wrong. Please try again later.');
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Contact Us</h2>
        <p className="text-gray-600 mb-6 text-center">Have any questions? Fill out the form and we’ll get back to you shortly.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-4 py-2"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-4 py-2"
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-4 py-2"
              placeholder="Your message"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
