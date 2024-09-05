import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

function University() {
    const url = 'https://www.backend.lvoverseas.com/';
    const [universities, setUniversities] = useState([]);
    const [appliedUniversityIds, setAppliedUniversityIds] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { universitySlug } = useParams();
    const [userID, setUserID] = useState(localStorage.getItem('userID'));

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch(`${url}api/universities`);
                if (!response.ok) {
                    throw new Error('Failed to fetch universities');
                }
                const data = await response.json();
                setUniversities(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching universities:', error);
                setError('Failed to fetch universities');
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

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
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error applying to the university:', error);
            setError('Failed to apply to the university');
        }
    };

    useEffect(() => {
        const fetchUniversityData = async () => {
            try {
                const response = await fetch(`${url}api/university/${universitySlug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch university data');
                }
                const data = await response.json();
                if (userID && data.id) {
                    const checkResponse = await fetch(`${url}api/student/check-applied-college/${data.id}/${userID}`);
                    if (!checkResponse.ok) {
                        throw new Error('Failed to fetch application status');
                    }
                    const checkData = await checkResponse.json();
                    if (checkData.status === 'Success') {
                        setAppliedUniversityIds(prevIds => [...prevIds, data.id]);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUniversityData();
    }, [universitySlug, userID]);

    return (
        <section className="blog-area bg-color pt-40 pb-30">
            <div className="container-fluid">
                <h2 className="text-center  mb-4">Universities</h2>

                {loading ? (
                    <p className="text-center">Loading universities...</p>
                ) : (
                    <div className="row justify-content-center section-title">
                        {universities.map((university) => (
                            <div className="col-lg-3 mb-10" key={university.id}>
                                <div className="blog-single-item">
                                    <div className="thumbnail university">
                                        <img src={`${url}${university.image_path}`} alt="University Thumbnail" />
                                    </div>
                                    <div className="content">
                                        <h3 className="mb-2">{university.name}</h3>
                                        <p className="mb-15">{university.slug}</p>
                                        <div className="button-container">
                                            <Link className="button-1" to={`/university/${university.slug}`}>
                                                Learn More
                                            </Link>
                                            {appliedUniversityIds.includes(university.id) ? (
                                                <button className='button-1 ml-auto' disabled>Applied</button>
                                            ) : (
                                                <button className='button-1 ml-auto' onClick={() => singleApply(university.id)}>Apply Now</button>
                                            )}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <style jsx>{`
                    .university {
                        width: 100%; 
                        height: 200px; 
                        overflow: hidden;
                        display: flex; 
                        align-items: center;
                        justify-content: center;
                        
                }

                .university img {
                    width: 100%;
                    height: auto; 
                    object-fit: cover;
                }
             `}</style>
            </div>
        </section>
    );
}

export default University;
