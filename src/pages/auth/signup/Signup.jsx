import React, { useState } from 'react'
import LandingNav from '../../../components/landingNav/LandingNav'
import Footer from '../../../components/footer/Footer'
import { supabase } from '../../../services/supabaseClient';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const LoadingSpinner = () => (
    <div className="spinner-border" style={{ color: "#009e99" }} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
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

        const { firstName, lastName, email, password } = formData;

        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const { data, error } = await supabase
                .from('users')
                .insert({
                    firstName: firstName,
                    lastName: lastName,
                    email,
                    password: hashedPassword,
                });

            if (error) throw error;

            setSuccess('Account created successfully! You can now login.');
            setFormData({ firstName: '', lastName: '', email: '', password: '' });
            setError('');

            setTimeout(() => {
                navigate('/login');
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
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
                                <h1>Sign Up</h1>
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
                                    Already have an account?{' '}
                                    <a href="/login" style={{ color: '#009e99' }}>
                                        Login
                                    </a>
                                </p>
                            </div>

                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <div className="card">
                                    <div className="card-body py-5 px-md-5">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input
                                                            type="text"
                                                            id="form3Example1"
                                                            className="form-control"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example1">
                                                            First name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input
                                                            type="text"
                                                            id="form3Example2"
                                                            className="form-control"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example2">
                                                            Last name
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form3Example3"
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form3Example3">
                                                    Email address
                                                </label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form3Example4">
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
                                                    {loading ? 'Signing in...' : 'Signup'}
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

export default Signup