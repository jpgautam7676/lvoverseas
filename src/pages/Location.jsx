import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Menu from "./Menu";
import Whychoose from "./Whychoose";



function Location() {

    return (
        <Fragment>
            <Menu />
            <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('assets/img/breadcrumb.png')" }}>
                <div className="container">
                    <h2>Find An Office Near You</h2>
                    <p>We have 6 locations throughout North America to serve our clients. <br />
                        Please find office information below and give us a call if you have any questions.</p>
                    <ul>
                        <li><Link to="/" >MBBS Vietnam</Link></li>
                        <li><Link to="" > Locations</Link></li>

                    </ul>
                </div>
            </section>
            <section className="homepage-project pt-40 pb-40">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-xl-4">
                            <div className="section-title">
                                <h2 className="pb-0">Knowledge Center</h2>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="glenic-tabs">
                                <ul className="nav nav-pills mb-2" id="project-content1" role="tablist">
                                    <li className="nav-item text-font" role="presentation">
                                        <button className="nav-link text-font active" id="glenic-home-tab" data-bs-toggle="pill" data-bs-target="#glenic-home" type="button" role="tab" aria-controls="glenic-home" aria-selected="false" tabindex="-1"><i className="vc_tta-icon fas fa-map-marker-alt"></i> India</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link text-font" id="glenic-neurologists-tab" data-bs-toggle="pill" data-bs-target="#glenic-neurologists" type="button" role="tab" aria-controls="glenic-neurologists" aria-selected="false" tabindex="-1"><i className="vc_tta-icon fas fa-map-marker-alt"></i> Bangladesh</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link text-font" id="glenic-orthopedic-tab" data-bs-toggle="pill" data-bs-target="#glenic-orthopedic" type="button" role="tab" aria-controls="glenic-orthopedic" aria-selected="false" tabindex="-1"><i className="vc_tta-icon fas fa-map-marker-alt"></i> Malaysia</button>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-50">
                        <div className="col-md-12">
                            <div className="tab-content" id="project-content">
                                <div className="tab-pane fade active show" id="glenic-home" role="tabpanel" aria-labelledby="glenic-home-tab" tabindex="0">
                                    <div className="row">
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2 ">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">MAHARASHTRA</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> Office No. 35, PP Chamber, Fathe Ali Road, Dombivli East, Thane,
                                                        Maharashtra, 421201</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+91 -9619-593-689</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i> info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2 ">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">GURGAON</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> B-16 Ground Floor, Mayfield Garden, Sector 50, Gurugram, Haryana, India 122002</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+91 -9818-560-331</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i> info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2 ">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">CHENNAI</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> #1 H, first floor, Vantage Plaza, Door No.1, L.B.Road and MG Road Junction, Thiruvanmiyur-600 041</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+91-9342-914-452</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i>  info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2 ">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">CHITTOOR</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> 2nd floor, opp. to Indian Bank, Bairagi Patteda, Tirupati 517501</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+91-9342-914-454</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i> info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">Hyderabad</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> H.no:-16-2-669 Flat no-116,Jamuna Towers Malakpet 500036 TS</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+91 -7981-121-067</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i> info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="glenic-neurologists" role="tabpanel" aria-labelledby="glenic-neurologists-tab" tabindex="0">
                                    <div className="row">
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">UTTARA DHAKA</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> H-16, Road-09, Sector-01, (Flat-A5/B), Uttara, Dhaka, Bangladesh 1230</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+88-01841-661-344</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i> info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="glenic-orthopedic" role="tabpanel" aria-labelledby="glenic-orthopedic-tab" tabindex="0">
                                    <div className="row">
                                        <div className="col-lg-4 mb-30">
                                            <div className="info-box-2">
                                                <div className="content">
                                                    <h4 className="mt-2 mb-2">KUALA LUMPUR</h4>
                                                    <p className="text-left"><i className="fa-solid fa-location-dot"></i> 8, Jalan Tun Sambanthan, Wilayah Persekutuan Kuala Lumpur Malaysia 50470</p>
                                                    <p className="text-left"><i class="fa-solid fa-phone"></i>+60-11-2382-8704</p>
                                                    <p className="text-left"><i class="fa-solid fa-envelope"></i> info@mbbsinvietnam.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Whychoose />
         
            <Footer />
        </Fragment>
    )
};


export default Location;