import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const { fullname, email, phone, message } = formData;
    const sendAt = new Date().toISOString().split('T')[0]; // Format for `timestamp`

    try {
      const { data, error } = await supabase.from('contact').insert([
        { fullName: fullname,email: email,phone: phone, message: message,sendAt: sendAt },
      ]);

      if (error) throw error;
      setSuccess(true);
      setFormData({ fullname: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="contact py-3 py-md-5 d-flex align-items-center flex-column flex-lg-row">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-4 display-5 text-light"><strong>Contact</strong></h2>
              <p className="text-secondary mb-5 text-light">The best way to contact us is to use our contact form below. Please fill out all of the required fields and we will get back to you as soon as possible.</p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9">
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                    <div className="col-12">
                      <label htmlFor="fullname" className="form-label">Full Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text">
                        <i class="bi bi-envelope"></i>
                        </span>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message <span className="text-danger">*</span></label>
                      <textarea className="form-control" id="message" name="message" rows="3" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn explore btn-lg" type="submit" disabled={loading}>
                          {loading ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {success && <p className="text-success text-center">Form submitted successfully!</p>}
                {error && <p className="text-danger text-center">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
