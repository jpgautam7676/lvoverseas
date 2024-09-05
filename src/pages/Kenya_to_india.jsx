import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import Popupform from './Popupform';
import University from '../University';

const url = 'https://www.backend.lvoverseas.com/';

const UniversityDetails = () => {
    const { countryName, universitySlug } = useParams();
    const [universityData, setUniversityData] = useState({});
    const [userID, setUserID] = useState(localStorage.getItem('userID'));
    const [status, setStatus] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({ id: '', name: '' });
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [appliedUniversityIds, setAppliedUniversityIds] = useState([]);
    const [checkApply, setCheckApply] = useState(false); 
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

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

    useEffect(() => {
        const fetchUniversityData = async () => {
            try {
                const response = await fetch(`https://www.backend.lvoverseas.com/api/university/${universitySlug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch university data');
                }
                const data = await response.json();
                setUniversityData(data);

               
                if (userID && data.id) {
                    const checkResponse = await fetch(`${url}api/student/check-applied-college/${data.id}/${userID}`);
                    if (!checkResponse.ok) {
                        throw new Error('Failed to fetch application status');
                    }
                    const checkData = await checkResponse.json();
                    setCheckApply(checkData.status === 'Success'); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUniversityData();
    }, [universitySlug, userID]);

    const singleApply = async (universityId) => {
        try {
            const response = await fetch(`${url}api/student/apply-college/${universityId}/${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to apply to the university');
            }
            const data = await response.json();
            if (data.status === "Success") {
                setAppliedUniversityIds(prevIds => [...prevIds, universityId]);
                setCheckApply(true); 
                setError(null);
                navigate('/student');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error applying to the university:', error);
            setError('Failed to apply to the university');
        }
    };

    return (
        <Fragment>
            <Menu />
            <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
                <div className="container">
                    <h2>{countryName} to {universityData?.name}</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>{countryName} to {universityData?.name}</li>
                    </ul>
                </div>
            </section>
            <section className="table-second-sec m-auto">
                <div className="pt-40 pb-40" id="myDIV">
                    <div className="container margin_60_35">
                        <h4 className="text-center">Need for your Medical trip?</h4>
                        <p className="text-center pt-0 pb-0">Please select the country you want to travel from and your destination country</p>
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    status ?
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
                                                            {universities.map((university, index) => (
                                                                <option key={index} value={university.slug}>{university.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 mt-4">
                                                    <div className="form-group">
                                                        <Link to={`/${selectedCountry.name}/${selectedUniversity}`} className={`button-1 ml-auto ${isButtonDisabled ? 'disabled' : ''}`} disabled={isButtonDisabled}>
                                                            See Details <i className="fa-solid fa-arrow-right"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </form> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg_color_4">
                    <div className="container d-flex flex-column align-items-center justify-content-center position-relative">
                        <button onClick={() => setStatus(!status)} className="button-1 ml-auto">Modify Search</button>
                        <div className="row w-100">
                            <div className="col-md-12 d-flex flex-column align-items-center">
                                <div className="popup-form-overlay">
                                    <Popupform />
                                </div>
                                <div>
                                    <p className='mt-30' style={userID ? { fontSize: '15px', WebkitFilter: 'none' } : { fontSize: '15px', WebkitFilter: 'blur(2px)' }} dangerouslySetInnerHTML={{ __html: universityData?.top_description }} />
                                </div>
                                <div>
                                    <p className='mt-30' style={userID ? { fontSize: '15px', WebkitFilter: 'none' } : { fontSize: '15px', WebkitFilter: 'blur(2px)' }} dangerouslySetInnerHTML={{ __html: universityData?.bottom_description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="col-lg-12 mt-2 mb-4 text-center">
                <div className="form-group">
                    {!userID ? (
                        <Link to="/student" className="button-1 ml-auto">
                            Process for application
                        </Link>
                    ) : checkApply ? (
                        <button className='button-1 ml-auto' disabled>Applied</button>
                    ) : (
                        <button className='button-1 ml-auto' onClick={() => singleApply(universityData.id)}>Apply Now</button>
                    )}
                    
                </div>
            </div>
            {userID && (
                <section className="content-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {userID && (
                <University />
            )}
            <Footer />
        </Fragment>
    );
};

export default UniversityDetails;
