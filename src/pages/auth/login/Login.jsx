import React, { useState } from 'react'
import LandingNav from '../../../components/landingNav/LandingNav'
import Footer from '../../../components/footer/Footer'
import { supabase } from '../../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs';

const LoadingSpinner = () => (
  <div className="spinner-border" style={{color: "#009e99"}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      if (!user) {
        setError('Invalid email or password.');
        setLoading(false); 
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        setError('Invalid email or password.');
        setLoading(false); 
        return;
      }

      const sessionToken = `${user.id}${Date.now()}`;

      localStorage.setItem(
        'userSession',
        JSON.stringify({ id: user.id, token: sessionToken, email: formData.email })
      );

      setSuccess('Login successful! Redirecting...');
      setError('');
      setTimeout(() => {
        navigate(`/dashboard/${sessionToken}`);
        setLoading(false); 
      }, 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false); 
    }
  };
  
  return (
    <div>

      <LandingNav />
      <section className="my-5 py-5">
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1>Login</h1>
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span style={{ color: '#009e99' }}>for your work</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
                <p>
                  Don't have an account?{' '}
                  <a href="/signup" style={{ color: '#009e99' }}>
                    Signup
                  </a>
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      {error && <p className="text-danger">{error}</p>}
                      {success && <p className="text-success">{success}</p>}

                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          type="submit"
                          className="btn explore btn-block mb-4"
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Login'}
                        </button>
                        {loading && <div className="ms-3"><LoadingSpinner /></div>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Login