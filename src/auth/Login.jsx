import { useEffect, useState } from "react";
import slidesData from "../data/slides.json";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [slides, setSlides] = useState([]);

	useEffect(() => {
		setSlides(slidesData);
	}, []);

	const LoginAuth = () => {
		if (username === "user") {
			if (password === "admin") {
				localStorage.setItem("user", username);
				window.location.href = "/";
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		} else {
			setIsLoggedIn(true);
		}
	};

	const handleLogin = (event) => {
		event.preventDefault();
		LoginAuth();
	};

	return (
		<>
            {/* <div className="nk-app-root">
        <div className="nk-main ">
            
            <div className="nk-wrap nk-wrap-nosidebar">
                
                <div className="nk-content ">
                    <div className="nk-split nk-split-page nk-split-lg">
                        <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                            <div className="absolute-top-right d-lg-none p-3 p-sm-5">
                                <a href="#" className="toggle btn-white btn btn-icon btn-light" data-target="athPromo"><em className="icon ni ni-info"></em></a>
                            </div>
                            <div className="nk-block nk-block-middle nk-auth-body">
                                <div className="brand-logo pb-5">
                                    <a href="html/index.html" className="logo-link">
                                        <img className="logo-light logo-img logo-img-lg" src="./images/logo.png"  alt="logo"/>
                                        <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png"  alt="logo-dark"/>
                                    </a>
                                </div>
                                <div className="nk-block-head">
                                    <div className="nk-block-head-content">
                                        <h5 className="nk-block-title">Sign-In</h5>
                                        <div className="nk-block-des">
                                            <p>Access the DashLite panel using your email and passcode.</p>
                                        </div>
                                    </div>
                                </div>
                                <form action="#" className="form-validate is-alter" >
                                    <div className="form-group">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="email-address">Email or Username</label>
                                            <a className="link link-primary link-sm"  href="#">Need Help?</a>
                                        </div>
                                        <div className="form-control-wrap">
                                            <input  type="text" className="form-control form-control-lg" required id="email-address" placeholder="Enter your email address or username"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="password">Passcode</label>
                                            <a className="link link-primary link-sm"  href="html/pages/auths/auth-reset.html">Forgot Code?</a>
                                        </div>
                                        <div className="form-control-wrap">
                                            <a  href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input autocomplete="new-password" type="password" className="form-control form-control-lg" required id="password" placeholder="Enter your passcode"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-lg btn-primary btn-block">Sign in</button>
                                    </div>
                                </form>
                                <div className="form-note-s2 pt-4"> New on our platform? <a href="html/pages/auths/auth-register.html">Create an account</a>
                                </div>
                                <div className="text-center pt-4 pb-3">
                                    <h6 className="overline-title overline-title-sap"><span>OR</span></h6>
                                </div>
                                <ul className="nav justify-center gx-4">
                                    <li className="nav-item"><a className="nav-link" href="#">Facebook</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#">Google</a></li>
                                </ul>
                                <div className="text-center mt-5">
                                    <span className="fw-500">I dont have an account? <a href="#">Try 15 days free</a></span>
                                </div>
                            </div>
                            <div className="nk-block nk-auth-footer">
                                <div className="nk-block-between">
                                    <ul className="nav nav-sm">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Terms & Condition</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Privacy Policy</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Help</a>
                                        </li>
                                        <li className="nav-item dropup">
                                            <a className="dropdown-toggle dropdown-indicator has-indicator nav-link" data-bs-toggle="dropdown" data-offset="0,10"><small>English</small></a>
                                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                                <ul className="language-list">
                                                    <li>
                                                        <a href="#" className="language-item">
                                                            <img src="./images/flags/english.png" alt="" className="language-flag"/>
                                                            <span className="language-name">English</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="language-item">
                                                            <img src="./images/flags/spanish.png" alt="" className="language-flag"/>
                                                            <span className="language-name">Español</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="language-item">
                                                            <img src="./images/flags/french.png" alt="" className="language-flag"/>
                                                            <span className="language-name">Français</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="language-item">
                                                            <img src="./images/flags/turkey.png" alt="" className="language-flag"/>
                                                            <span className="language-name">Türkçe</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-3">
                                    <p>&copy; 2022 DashLite. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                        <div className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right" data-toggle-body="true" data-content="athPromo" data-toggle-screen="lg" data-toggle-overlay="true">
                            <div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
                                <div className="slider-init" data-slick='{"dots":true, "arrows":false}'>
                                    <div className="slider-item">
                                        <div className="nk-feature nk-feature-center">
                                            <div className="nk-feature-img">
                                                <img className="round" src="public/images/case/1.jpg"  alt=""/>
                                            </div>
                                            <div className="nk-feature-content py-4 p-sm-5">
                                                <h4>Dashlite</h4>
                                                <p>You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item">
                                        <div className="nk-feature nk-feature-center">
                                            <div className="nk-feature-img">
                                                <img className="round" src="public/images/case/1.jpg"  alt=""/>
                                            </div>
                                            <div className="nk-feature-content py-4 p-sm-5">
                                                <h4>Dashlite</h4>
                                                <p>You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item">
                                        <div className="nk-feature nk-feature-center">
                                            <div className="nk-feature-img">
                                                <img className="round" src="public/images/case/1.jpg" alt=""/>
                                            </div>
                                            <div className="nk-feature-content py-4 p-sm-5">
                                                <h4>Dashlite</h4>
                                                <p>You can start to create your products easily with its user-friendly design & most completed responsive layout.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="slider-dots"></div>
                                <div className="slider-arrows"></div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
           
        </div>
        
    </div> */}
			<div className="nk-app-root">
				<div className="nk-main">
					<div className="nk-wrap nk-wrap-nosidebar">
						<div className="nk-content">
							<div className="nk-split nk-split-page nk-split-lg">
								<div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
									<div className="absolute-top-right d-lg-none p-3 p-sm-5">
										<a
											href="#"
											className="toggle btn-white btn btn-icon btn-light"
											data-target="athPromo"
										>
											<em className="icon ni ni-info"></em>
										</a>
									</div>
									<div className="nk-block nk-block-middle nk-auth-body">
										<div className="brand-logo pb-5">
											<img
												className="logo-dark logo-img logo-img-lg"
												src="./public/mainlogo.png"
												alt="Logo"
												width="200"
												height="100"
											/>
										</div>
										<div className="nk-block-head">
											<div className="nk-block-head-content">
												<h5 className="nk-block-title">Sign-In</h5>
												<div className="nk-block-des">
													<p>
														Mog everyone in LookMaxxing, using your email and
														passcode.
													</p>
												</div>
											</div>
										</div>

										{isLoggedIn && (
											<div className="alert alert-danger">
												<b>Invalid = MOGGED</b>. Please Try Again
											</div>
										)}

										<form onSubmit={handleLogin}>
											<div className="form-group">
												<div className="form-label-group">
													<label className="form-label" htmlFor="email-address">
														Email or Username
													</label>
													<a className="link link-primary link-sm" href="#">
														Need Help?
													</a>
												</div>
												<div className="form-control-wrap">
													<input
														type="text"
														className="form-control form-control-lg"
														required
														id="email-address"
														placeholder="Enter your email address or username"
														onChange={(e) => setUsername(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="form-label-group">
													<label className="form-label" htmlFor="password">
														Passcode
													</label>
													<a
														className="link link-primary link-sm"
														href="html/pages/auths/auth-reset.html"
													>
														Forgot Code?
													</a>
												</div>
												<div className="form-control-wrap">
													<a
														href="#"
														className="form-icon form-icon-right passcode-switch lg"
														data-target="password"
													>
														<em className="passcode-icon icon-show icon ni ni-eye"></em>
														<em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
													</a>
													<input
														type="password"
														className="form-control form-control-lg"
														required
														id="password"
														placeholder="Enter your passcode"
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<button className="btn btn-lg btn-primary btn-block">
													Sign in
												</button>
											</div>
										</form>
									</div>
									<div className="nk-block nk-auth-footer">
										<div className="nk-block-between">
											<ul className="nav nav-sm">
												<li className="nav-item">
													<a className="nav-link" href="#">
														Terms & Condition
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="#">
														Privacy Policy
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="#">
														Help
													</a>
												</li>
												<li className="nav-item dropup">
													<a
														className="dropdown-toggle dropdown-indicator has-indicator nav-link"
														data-bs-toggle="dropdown"
														data-offset="0,10"
													>
														<small>English</small>
													</a>
													<div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
														<ul className="language-list">
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/english.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">English</span>
																</a>
															</li>
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/spanish.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">Español</span>
																</a>
															</li>
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/french.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">
																		Français
																	</span>
																</a>
															</li>
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/turkey.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">Türkçe</span>
																</a>
															</li>
														</ul>
													</div>
												</li>
											</ul>
										</div>
										<div className="mt-3">
											<p>&copy; 2022 LookMaxxing. All Rights Reserved.</p>
										</div>
									</div>
								</div>
								<div
									className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right"
									data-toggle-body="true"
									data-content="athPromo"
									data-toggle-screen="lg"
									data-toggle-overlay="true"
								>
									<div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
										<div
											className="slider-init"
											data-slick='{"dots":true, "arrows":false, "autoplay":true, "autoplaySpeed":2000}'
										>
                                            {
                                                slides.map((slide, index) => (     
											<div key={index} className="slider-item">
												<div className="nk-feature nk-feature-center">
													<div className="nk-feature-center-img">
														<img
															className="logo-dark"
															src={slide.image}
															alt={slide.name}
															width="500"
															height="500"
														/>
													</div>
													<div className="nk-feature-content py-4 p-sm-5">
														<h4>{slide.name}</h4>
														<p></p>
													</div>
												</div>
											</div>
                                            ))
                                        }
										</div>
										<div className="slider-dots"></div>
										<div className="slider-arrows"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
