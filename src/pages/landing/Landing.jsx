import React from 'react'
import LandingNav from '../../components/landingNav/LandingNav'
import landing from "../../assets/database.gif"
import why from "../../assets/why.gif"
import "./Landing.css"
import vision from "../../assets/opportunity.png"
import mission from "../../assets/target.png"
import offer from "../../assets/offer.png"
import Footer from '../../components/footer/Footer'
import Contact from '../../components/contact/Contact'

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

      <Contact/>
     

      <Footer />
    </div>
  )
}

export default Landing