import { useState } from 'react';
import Layout from "../components/Layout";
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send to backend contact endpoint (optional)
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      if (!apiBaseUrl) {
        throw new Error('Missing NEXT_PUBLIC_API_URL');
      }

      await axios.post(`${apiBaseUrl}/contact`, formData, {
        withCredentials: true
      });

      setMessage('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage('Failed to send message. Please try WhatsApp instead.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/2347000000000';
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/kingsbalfx';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/kingsbalfx';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/kingsbalfx';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/kingsbalfx';
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/kingsbal';

  return (
    <Layout>
      <div className="container" style={{ maxWidth: '900px', margin: '40px auto', paddingBottom: '60px' }}>
        <h1 style={{ marginBottom: '10px', color: '#0066ff' }}>Contact Us</h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>We'd love to hear from you. Get in touch with us today!</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
          {/* Contact Information */}
          <div>
            <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Get in Touch</h3>
            
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0066ff', marginBottom: '10px' }}>WhatsApp</h4>
              <p style={{ color: '#64748b', marginBottom: '10px' }}>
                Chat with us directly for instant support
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-block' }}
              >
                Message on WhatsApp
              </a>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0066ff', marginBottom: '10px' }}>Follow Us</h4>
              <p style={{ color: '#64748b', marginBottom: '15px' }}>Connect with us on social media</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" title="Twitter" style={{ display: 'inline-flex' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.77v.57A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" title="Facebook" style={{ display: 'inline-flex' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.54 17.52 2 12 2S2 6.54 2 12.07c0 4.99 3.66 9.12 8.44 9.93v-7.03H8.07v-2.9h2.37V9.41c0-2.34 1.39-3.63 3.52-3.63.99 0 2.03.18 2.03.18v2.23h-1.14c-1.13 0-1.48.7-1.48 1.42v1.71h2.52l-.4 2.9h-2.12v7.03C18.34 21.19 22 17.06 22 12.07z"/></svg>
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" title="Instagram" style={{ display: 'inline-flex' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#E4405F" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zM18.4 6.3a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z"/></svg>
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ display: 'inline-flex' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5a2.5 2.5 0 1 1 .02 0zM3 8.98h4v12H3zM8.5 8.98h3.84v1.63h.05c.54-1 1.86-2.07 3.83-2.07 4.1 0 4.86 2.7 4.86 6.2v7.24h-4v-6.41c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38v6.53h-4z"/></svg>
                </a>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" title="Telegram" style={{ display: 'inline-flex' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#26A5E4" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 3.2 2.9 10.8c-1 .4-.9 1.8.2 2.1l4.7 1.5 1.8 5.8c.2.7 1.1.9 1.6.4l2.6-2.6 4.8 3.5c.6.4 1.4.1 1.6-.6l3.5-16.2c.2-.8-.6-1.5-1.2-1.2zM9.6 13.9l8.9-6.9-6.7 8.2-.3 3.1-1.8-5.7z"/></svg>
                </a>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#0066ff', marginBottom: '10px' }}>Email</h4>
              <p style={{ color: '#64748b' }}>support@kingsbal.com</p>
            </div>

            <div>
              <h4 style={{ color: '#0066ff', marginBottom: '10px' }}>Hours</h4>
              <p style={{ color: '#64748b' }}>
                Monday - Friday: 9:00 AM - 6:00 PM (WAT)<br />
                Saturday: 10:00 AM - 2:00 PM (WAT)<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Send us a Message</h3>
            
            {message && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '8px',
                backgroundColor: message.startsWith('Message sent') ? '#d1fae5' : '#fee2e2',
                color: message.startsWith('Message sent') ? '#065f46' : '#991b1b',
                fontSize: '14px'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: '500' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  placeholder="Your full name"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: '500' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: '500' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif',
                    resize: 'vertical'
                  }}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Need Help?</h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            Check out our Terms of Service and Privacy Policy to learn more about how we operate.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/terms" className="btn btn-secondary">Terms of Service</a>
            <a href="/privacy" className="btn btn-secondary">Privacy Policy</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
