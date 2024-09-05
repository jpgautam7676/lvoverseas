import React, { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Menu(props) {


    const handleLogout = () => {
        // localStorage.removeItem('userID');
        navigate('/');
    };
    const isLoggedIn = localStorage.getItem('userID') || localStorage.getItem('isloggedin');
    const navigate = useNavigate();

    return (
        <Fragment>
            <header className="header">
                <div className="header-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="header-left">
                                    <i className="fa-solid fa-phone-alt"></i> Helpline No <Link to="tel:+919870406867"><strong>(+91) 9870406867</strong></Link>
                                    <span>/</span>
                                    <i className="fa-solid fa-envelope-open-text"></i> <Link to="mailto:info@innayatcro.com"> info@innayatcro.com</Link>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="header-right text-right">
                                    <div className="social-icon">
                                        <span><i className="fa-solid fa-map-marker-alt"></i> Mayfield Garden, B-16 Ground, Sector 50, Gurugram, Haryana 122002</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom sticky-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-6 align-self-center">
                                <div className="logo">
                                  
                                        <Link to="/">
                                            <img src="https://react.lvoverseas.com/assets/img/logo.png" alt="Logo" />
                                        </Link>
                               
                                </div>
                            </div>
                            <div className="col-lg-9 col-6 align-self-center">
                                <div className="menu">
                                    <nav>
                                        <ul>
                                            <li><Link to="/" >Home</Link></li>
                                            <li className="menu-item-has-children">
                                                <Link to="/about" >About</Link>
                                                <ul>
                                                    <li><Link to="/location" >Location</Link></li>
                                                    <li><Link to="/contact" >Contact us</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="/alluniversities">All Universities</Link></li>
                                            <li><Link to="/medical" >Medical</Link></li>
                                            <li><Link to="/destinations">Destinations</Link></li>
                                            <li><Link to="/services">Services</Link></li>
                                            <li><Link to="/blog" >Blog</Link></li>
                                            {isLoggedIn ? (
                                                <li><Link to="/student" className="loginbtn">Profile</Link></li>
                                            ) : (
                                                <li><Link to="/signin" className="loginbtn">Login</Link></li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                                <nav className="befor-mob navbar offcanvas_menu_wrapper">
                                    <div className="container-fluid">
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse text-left " id="navbarNav">
                                            <ul className="navbar-nav offcanvas_main_menu offcanvas_menu_wrapper">
                                                <li><Link to="/" >Home</Link></li>
                                                <li className="menu-item-has-children">
                                                    <span className="menu-expand">
                                                        <i className="fa fa-chevron-down"></i>
                                                    </span>
                                                    <Link to="/about">About</Link>
                                                    <ul className="sub-menu" style={{ display: "none" }}>
                                                        <li><Link to="/location" >Location</Link></li>
                                                        <li><Link to="/contact" >Contact us</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link to="/alluniversities">All Universities</Link></li>
                                                <li><Link to="/medical" >Medical</Link></li>
                                                <li><Link to="/destinations">Destinations</Link></li>
                                                <li><Link to="/services">Services</Link></li>
                                                <li><Link to="/blog" >Blog</Link></li>
                                                {isLoggedIn ? (
                                                <li><Link to="/student" className="loginbtn">Profile</Link></li>
                                            ) : (
                                                <li><Link to="/signin" className="loginbtn">Login</Link></li>
                                            )}
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mobile-menu-area">
                <div className="off_canvars_overlay"></div>
                <div className="offcanvas_menu">
                    <div className="offcanvas_menu_wrapper">
                        <div className="canvas_close">
                            <Link to="#" aria-label="Menu Open">
                                <i className="bi bi-x-lg"></i>
                            </Link>
                        </div>
                        <div className="mobile-logo">
                            <Link to="#">
                                <img src="../assets/img/logo.png" alt="logo" />
                            </Link>
                        </div>
                        <div id="menu" className="text-left ">
                            <ul className="offcanvas_main_menu">
                                <li><Link to="#">Home</Link></li>
                                <li><Link to="#">About us</Link></li>
                                <li className="menu-item-has-children">
                                    <Link to="#">Services</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="#">Pre-clinical Operations</Link></li>
                                        <li><Link to="#">Clinical Operation</Link></li>
                                        <li><Link to="#">Medical Writing</Link></li>
                                        <li><Link to="#">Pharmacovigilance</Link></li>
                                        <li><Link to="#">Quality Assurance</Link></li>
                                        <li><Link to="#">Medical Affairs</Link></li>
                                        <li><Link to="#">Biostatistics & Programming</Link></li>
                                        <li><Link to="#">Regulatory Affairs</Link></li>
                                        <li><Link to="#">Data Management</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="#">Contact us</Link></li>
                                <li><Link to="#">News & Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Menu;
