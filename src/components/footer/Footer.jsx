import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer class="text-center text-lg-start bg-body-tertiary text-muted">
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div class="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href="" class="me-4 text-reset">
                            <i class="bi bi-facebook-f"></i>
                        </a>
                        <a href="" class="me-4 text-reset">
                            <i class="bi bi-twitter"></i>
                        </a>
                        <a href="" class="me-4 text-reset">
                            <i class="bi bi-google"></i>
                        </a>
                        <a href="" class="me-4 text-reset">
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href="" class="me-4 text-reset">
                            <i class="bi bi-linkedin"></i>
                        </a>
                        <a href="" class="me-4 text-reset">
                            <i class="bi bi-github"></i>
                        </a>
                    </div>
                </section>

                <section class="">
                    <div class="container text-center text-md-start mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    DataSphere
                                </h6>
                                <p>
                                Your ultimate partner in streamlined and efficient database management.
                                </p>
                            </div>

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" class="text-reset">Features</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">About</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Contact</a>
                                </p>
                                <p>
                                    <a href="#!" class="text-reset">Login</a>
                                </p>
                            </div>

                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i class="bi bi-geo-alt-fill"></i> Ahmedabad, Gujarat, India 380026</p>
                                <p>
                                    <i class="bi bi-envelope me-3"></i>
                                    udaykumardhokia@gmail.com
                                </p>
                                <p><i class="bi bi-phone me-3"></i>+91 9537527143</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="text-center p-4" style={{backgroundColor: "#009e99", color:"white"}}>
                    © 2024 Copyright:
                    <a class="text-reset fw-bold" href="">DataSphere</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer