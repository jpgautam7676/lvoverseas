import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import Applied from "./Applied";

const Alluniversities = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({ id: '', name: '' });
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const isButtonDisabled = selectedCountry.name === "" || selectedUniversity === "";

    useEffect(() => {
        fetch('https://www.backend.lvoverseas.com/api/destinations/')
            .then(response => response.json())
            .then(data => setCountries(data));
    }, []);

    useEffect(() => {
        if (selectedCountry.id !== '') {
            fetchUniversities(selectedCountry.id);
        } else {
            setUniversities([]);
        }
    }, [selectedCountry]);

    const fetchUniversities = (countryId) => {
        fetch(`https://www.backend.lvoverseas.com/api/universities-by-destination/${countryId}`)
            .then(response => response.json())
            .then(data => setUniversities(data));
    };

    const handleCountryChange = (event) => {
        const countryId = event.target.value;
        const countryName = event.target.options[event.target.selectedIndex].text;
        setSelectedCountry(countryId === "0" ? { id: '', name: '' } : { id: countryId, name: countryName });
    };

    const handleUniversityChange = (event) => {
        const value = event.target.value;
        setSelectedUniversity(value === "0" ? "" : value);
    };

    return (
        <>
            <Menu />
           
            <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
                <div className="container">
                    <h2>All Universities</h2>
                    <ul>
                        <li><Link to="#">Home</Link></li>
                        <li>All Universities</li>
                    </ul>
                </div>
            </section>
            <section className="univer-sec">
                <div className="pt-40 pb-40" id="myDIV">
                    <div className="container margin_60_35">
                        <h4 className="text-center">Need Visa for your Medical trip?</h4>
                        <p className="text-center pt-0 pb-0">Please select the country you want to travel from and your destination country</p>
                        <div className="row">
                            <div className="col-md-12">
                                <form>
                                    <div className="row justify-content-end align-items-center">
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>Country</label>
                                                <select className="form-select" onChange={handleCountryChange}>
                                                    <option value="0">Select a country</option>
                                                    {countries.map((country, index) => (
                                                        <option key={index} value={country.id}>{country.country}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>University</label>
                                                <select className="form-select" onChange={handleUniversityChange}>
                                                    <option value="0">Select a university</option>
                                                    {universities.map((universitie, index) => (
                                                        <option key={index} value={universitie.slug}>{universitie.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 mt-4">
                                            <div className="form-group">
                                                <button type="button" className={`search-btn btn_1 btn-2 ${isButtonDisabled ? 'disabled' : ''}`} disabled={isButtonDisabled}>
                                                    <Link to={`/${selectedCountry.name}/${selectedUniversity}`} className={`button-1 ${isButtonDisabled ? 'disabled' : ''}`}>
                                                        See Details <i class="fa-solid fa-arrow-right"></i>
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Alluniversities;
