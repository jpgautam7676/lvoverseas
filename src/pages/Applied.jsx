import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";


const Applied = () => {
    const url = "https://www.backend.lvoverseas.com/api/";
    const baseurl = 'http://localhost:3000/';
    const [appliedUniversity, setAppliedUniversity] = useState([]);
    const [deleteApi, setDeleteApi] = useState('');
    const [application,setApplication] = useState('');
    const userId = localStorage.getItem('userID');
    const navigate = useNavigate();
    const id = 'id'
    const token = 'token'
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}student/applied-colleges/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppliedUniversity(data);
                
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [userId]);
  

  

    useEffect(()=>{
        const fetchApplication = async () =>{
            try{
              const response = await fetch (`${url}student/application-details/${id}/${token}`)
              if(!response.ok){
                throw('')
              }
              const  data = await response.json();
              setApplication(data)
         
            }catch(error){
                 console.error('addddd')
            }
        }
        fetchApplication()
    },[id,token])
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this application?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${url}student/delete-applied-college/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            setDeleteApi(data);
            setAppliedUniversity(appliedUniversity.filter(university => university.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }

    };
    

    const handleLogout = () => {
        localStorage.removeItem('userID');
        navigate('/');
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userID');
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const [activeComponent, setActiveComponent] = useState('applied');

    const handleNavigation = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <Menu />
            <section className="gray pt-5 pb-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="dashboard-navbar">
                                <div className="d-user-avater">
                                    <div className="profile-image">
                                        <img src="/assets/img/user.jpg" className="img-fluid avater" alt="User" />
                                    </div>
                                    <Link to="#" id="upload">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="1" y="1" width="28" height="28" rx="14" fill="#FFE9D3"></rect>
                                            <path d="M8 19.084V22h2.916l8.601-8.601-2.916-2.916L8 19.083Zm13.773-7.94a.773.773 0 0 0 0-1.097l-1.82-1.82a.774.774 0 0 0-1.097 0l-1.423 1.424 2.916 2.916 1.424-1.423Z" fill="#da0b4e"></path>
                                            <rect x="1" y="1" width="28" height="28" rx="14" stroke="#fff" strokeWidth="2"></rect>
                                        </svg>
                                    </Link>
                                    <input id="upload-file" type="file" />
                                  
                                </div>
                                <div className="d-navigation">
                                    <ul id="side-menu">
                                        <li className={activeComponent === 'profile' ? 'active' : ''}>
                                            <Link to={baseurl + "student"} onClick={() => handleNavigation('profile')}>
                                                <i className="ti-user"></i>My Profile
                                            </Link>
                                        </li>
                                        <li className={activeComponent === 'applied' ? 'active' : ''}>
                                            <Link to={baseurl + "student/applied"} onClick={() => handleNavigation('applied')}>
                                                <i className="ti-comment-alt"></i>Applied University
                                            </Link>
                                        </li>

                                        <li className={activeComponent === 'settings' ? 'active' : ''}>
                                            <Link to="#" onClick={() => handleNavigation('settings')}>
                                                <i className="ti-settings"></i>Account settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" onClick={handleLogout}>
                                                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="dashboard_container_body bg-white">
                                {appliedUniversity.map((university, index) => (
                                    <div className="dashboard_single_course_caption" key={index}>
                                        <div className="dashboard_single_course_head">
                                            <div className="dashboard_single_course_head_flex university_img">
                                                <div className="row">
                                                    <div className="col-lg-5">
                                                        <img src="/assets/img/oxford-university.jpg" className="img-fluid avater" alt="University" />
                                                    </div>
                                                    <div className="col-lg-7 mt-4">
                                                        <h4 className="dashboard_course_title"><span>University Name :</span> {university.college.name}</h4>
                                                        <h4 className="dashboard_course_title"><span>Country Name :</span> {university.college.country}</h4>
                                                        <div class="col-md-12 p-4">
                                                            <button type="submit" className="saveBtn">
                                                          
                                                                <Link
                                                                    className="text-white"
                                                                    to={"application-details/" + university.id + "/" + university.token }
                                                                    onClick={() => handleNavigation('applied')}
                                                                >
                                                                    View Details
                                                                </Link></button> 
                                                            <button className="cancelBtn" onClick={() => handleDelete(university.id)}> <i className="fa-solid fa-trash ml-2"></i> Delete </button>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Applied;
