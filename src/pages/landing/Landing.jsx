import React from 'react'
import LandingNav from '../../components/landingNav/LandingNav'
import landing from "../../assets/database.gif"
import why from "../../assets/why.gif"
import "./Landing.css"
import vision from "../../assets/opportunity.png"
import mission from "../../assets/target.png"
import offer from "../../assets/offer.png"
import Footer from '../../components/footer/Footer'

// DataSphere#123

const Landing = () => {
  return (
    <div>
      <LandingNav />

      <section className='head container my-5'>
        <div className='d-flex justify-content-center align-items-center'>
          <div className="me-2">
            <h1>DataSphere</h1>
            <br />
            <p>Your ultimate partner in streamlined and efficient database management. At DataSphere, we believe that data is the lifeblood of modern organizations, and managing it effectively is the key to driving innovation, productivity, and success. Our platform is designed to empower businesses of all sizes with robust tools for organizing, securing, and analyzing their data. From role-based access control (RBAC) to dynamic permission management, DataSphere offers a comprehensive suite of features that simplify complex database operations while ensuring security and scalability.</p>
            <br />
            <button className='explore btn'>Explore</button>
          </div>
          <img src={landing} alt="" className='animated-img ms-5 d-none d-xl-block' />
        </div>
      </section>

      <section className='offer container-fluid py-5'>
        <div className="container">
          <div className="vision mb-5">
            <div className="">
              <img src={vision} alt="" style={{ width: "30px" }} />
              <h1>Our Vision</h1>
            </div>
            <p>To revolutionize the way businesses manage their data by providing cutting-edge tools that are intuitive, secure, and future-ready.</p>
          </div>
          <div className="mission mb-5">
            <div className="">
              <img src={mission} alt="" style={{ width: "30px" }} />
              <h1>Our Mission</h1>
            </div>
            <p>At DataSphere, our mission is to transform database management into an effortless experience. We aim to bridge the gap between technical complexity and user-friendly functionality, enabling organizations to focus on insights and growth rather than infrastructure challenges.
            </p>
          </div>
          <div className="whatweoffer">
            <div className="">
              <img src={offer} alt="" style={{ width: "30px" }} />
              <h1>What We Offer</h1>
            </div>
            <ul>
              <li><strong>Dynamic Role-Based Access Control (RBAC): </strong>Fine-grained control over who can access what, ensuring secure data governance.  </li>
              <li><strong>Customizable Permissions: </strong>Adapt to unique business needs with flexible permission settings for users and roles.</li>
              <li><strong>Seamless User Management: </strong>Simplify the process of adding, editing, and managing users with an intuitive interface.</li>
              <li><strong>Scalability: </strong> Built to grow with your organization, DataSphere handles data from small teams to enterprise-scale operations.   </li>
              <li><strong>Data Security: </strong>Leverage industry-leading standards to protect your most valuable asset—your data. </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='container my-5 py-5'>
        <div className="d-flex justify-content-between align-items-center">
          <img src={why} alt="" className='w-25 animated-img' />
          <div className="">
            <h1 className='mb-4'>Why Choose DataSphere?</h1>
            <ul>
              <li><strong>Ease of Use:</strong> Simplified workflows designed for both technical and non-technical users.</li>
              <li><strong>Reliability:</strong> Built with enterprise-grade architecture to ensure uptime and performance.</li>
              <li><strong>Innovation:</strong> We stay ahead of the curve with regular updates and cutting-edge features.</li>
              <li><strong>Support:</strong> Our dedicated support team is always ready to assist you.
              </li>
            </ul>
          </div>
        </div>
      </section>


      {/* Contact */}
      <section class="contact py-3 py-md-5 d-flex align-items-center flex-column flex-lg-row">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 class="mb-4 display-5 text-light"><strong>Contact</strong></h2>
              <p class="text-secondary mb-5 text-light">The best way to contact us is to use our contact form below. Please fill out all of the required fields and we will get back to you as soon as possible.</p>
              <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row justify-content-lg-center">
            <div class="col-12 col-lg-9">
              <div class="bg-white border rounded shadow-sm overflow-hidden">

                <form action="#!">
                  <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
                    <div class="col-12">
                      <label for="fullname" class="form-label">Full Name <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" id="fullname" name="fullname" value="" required />
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                          </svg>
                        </span>
                        <input type="email" class="form-control" id="email" name="email" value="" required />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="phone" class="form-label">Phone Number</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                          </svg>
                        </span>
                        <input type="tel" class="form-control" id="phone" name="phone" value="" />
                      </div>
                    </div>
                    <div class="col-12">
                      <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                      <textarea class="form-control" id="message" name="message" rows="3" required></textarea>
                    </div>
                    <div class="col-12">
                      <div class="d-grid">
                        <button class="btn explore btn-lg" type="submit">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing