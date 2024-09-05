import React, { useState, useEffect } from "react"
import Footer from "./Footer"
import Menu from './Menu'
import { Link, useNavigate } from "react-router-dom"
import { saveAs } from 'file-saver'



const Graduation = {
    fill: '#323847',
    position: 'absolute',
    marginLeft: '4px'
};




const Student_profile = () => {

    const baseurl = 'http://localhost:3000/';

    // logout function===================================================================>

    const isLoggedIn = localStorage.getItem('userID') || localStorage.getItem('isloggedin');
    const handleLogout = () => {
        localStorage.removeItem('userID');
        navigate('/');
    };
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userID');
        if (!isLoggedIn) {
            navigate('/');
        }
    }, []);

    // logout function and==============================>

    const userId = JSON.parse(localStorage.getItem("userID"));
    // const handeLogout = () => {
    //     localStorage.removeItem("loggedin");
    //     navigate("/");
    // }


    //   personal-api-state=========================>

    const [students, setStudents] = useState({
        id: '',
        name: '',
        email: '',
        c_code: '',
        dob: '',
        mobile: '',
        nationality: "",
        first_language: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
    });





    //    updateSchool=============================>

    const [editSchoolData, setEditSchoolData] = useState({
        student_id: userId,
        country_of_institution: '',
        attended_institution_to: '',
        name_of_institution: '',
        level_of_education: '',
        primary_language_of_instruction: '',
        attended_institution_from: '',
        degree_name: '',
        graduated_from_this: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    useEffect(() => {
        setEditSchoolData({
            student_id: userId,
            country_of_institution: students.country_of_institution,
            attended_institution_to: students.attended_institution_to,
            name_of_institution: students.name_of_institution,
            level_of_education: students.level_of_education,
            primary_language_of_instruction: students.primary_language_of_instruction,
            attended_institution_from: students.attended_institution_from,
            degree_name: students.degree_name,
            graduated_from_this: students.graduated_from_this,
            address: students.address,
            city: students.city,
            state: students.state,
            zipcode: students.zipcode
        })
    }, [userId, students])

    const [isEditSchool, setIsEditSchool] = useState(false)

    const handleSchoolEdit = (school) => {
        setEditSchoolData(school);
        setIsEditSchool(true);
    };



    //   education-API=========================>




    const [education, setEducation] = useState({
        id: userId,
        highest_level_of_education: '',
        country_of_education: '',
        grading_scheme: '',
        grade_average: ''
    });



    //   Test-Score-API=========================>

    const [testscore, setTestScore] = useState({
        id: userId,
        english_exam_type: '',
        date_of_exam: '',
        listening_score: '',
        reading_score: '',
        writing_score: '',
        speaking_score: '',


    });

    useEffect(() => {
        setTestScore({
            id: userId,
            english_exam_type: students.english_exam_type,
            date_of_exam: students.date_of_exam,
            listening_score: students.listening_score,
            reading_score: students.reading_score,
            writing_score: students.writing_score,
            speaking_score: students.speaking_score,
        })
    }, [userId, students])

    //    Update-background-=============================>
    const [background, setBackground] = useState({
        id: userId,
        refused_visa: '',
        valid_study_permit: '',
        visa_note: ''
    });

    useEffect(() => {
        setBackground({
            id: userId,
            refused_visa: students.refused_visa,
            valid_study_permit: students.valid_study_permit,
            visa_note: students.visa_note

        })
    }, [userId, students])





    useEffect(() => {
        const studentApi = async () => {
            const res = await fetch(
                `https://www.backend.lvoverseas.com/api/student/profile/${userId}`
            );
            const data = await res.json();
            setStudents(data);
        };
        studentApi();

    }, []);



    const [studentSchool, setStudentSchool] = useState('');


    const studentSchoolApi = async (studentId, setStudentSchool) => {
        try {
            const response = await fetch(`https://www.backend.lvoverseas.com/api/student/schools/${studentId}`);
            const data = await response.json();

            setStudentSchool(data);
        } catch (error) {
            console.error('Error fetching student school data:', error);
        }

    };

    useEffect(() => {
        studentSchoolApi(students.id, setStudentSchool);
    }, [students.id]);











    // const location = useLocation();
    // const { id } = location.state || {};


    const [isOpen, setIsOpen] = useState(false);


    const toggleSchoolAttendedForm = () => {
        setEditSchoolData('')
        setIsOpen(!isOpen);
    };

    const handleAddSchool = async (e) => {
        e.preventDefault();
        setEditSchoolData({ ...editSchoolData, student_id: students.id })

        try {
            const addSchoolApi = await fetch('https://www.backend.lvoverseas.com/api/student/add-school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editSchoolData),
            });
            const data = await addSchoolApi.json();

            if (data.error) {
                setEditSchoolData({ message: data.error });
            } else {
                setPisuccess({ success: data.message });
            }

            if (data.error) {
                console.error('Error in add school :', data.error);
            }
            else {
                studentSchoolApi(students.id, setStudentSchool);
                setEditSchoolData('')
                setPisuccess({ success: data.message });
            }
        } catch (error) {
            console.error('Error in add school :', error);
        }

    }




    const handleUpdateSchool = async (e) => {
        e.preventDefault();
        setEditSchoolData({ ...editSchoolData, student_id: students.id })

        try {
            const updateSchool = await fetch('https://www.backend.lvoverseas.com/api/student/update-school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editSchoolData),
            });

            const data = await updateSchool.json();
            if (data.error) {
                console.error('Error in add school :', data.error);
            }
            else {
                studentSchoolApi(students.id, setStudentSchool);
                setEditSchoolData('')
                setIsEditSchool(false)
                setPisuccess({ success: data.message });
            }
        } catch (error) {
            console.error('Error in add school :', error);
        }
    };



    const [pisuccess, setPisuccess] = useState('')
    const [studentsError, setStudentsError] = useState('');
    const personalInfoSubmit = async (e) => {
        e.preventDefault();
        try {
            const personalInfoApi = await fetch('https://www.backend.lvoverseas.com/api/student/personal-information', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(students),
            });

            const data = await personalInfoApi.json();
            if (data.error) {
                setStudentsError({ message: data.error });
            } else {
                setPisuccess({ success: data.message });
                setStudentsError('');
            }
        } catch (error) {
            console.error({ message: 'Error signing in. Please try again later.' });
        }
    };







    // Education Summary ApI Call==========>


    const [educationError, setEducationError] = useState('')


    const educationSubmit = async (e) => {
        e.preventDefault();
        try {
            const educationApi = await fetch('https://www.backend.lvoverseas.com/api/student/education-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(education),
            });

            const data = await educationApi.json();

            if (data.error) {
                setEducationError({ message: data.error });
            } else {
                setPisuccess({ success: data.message });
                setEducationError('');
            }
        } catch (error) {
            console.error({ message: 'Error signing in. Please try again later.' });
        }
    };




    // Test Score Summary ApI Call==========>


    const testScoreSubmit = async (e) => {
        e.preventDefault();
        try {
            const testScoreApi = await fetch('https://www.backend.lvoverseas.com/api/student/update-test-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testscore),
            });

            const data = await testScoreApi.json();
            if (data.error) {
                setTestScore({ message: data.error });
            } else {
                setPisuccess({ success: data.message });
            }
        } catch (error) {
            console.error({ message: 'Error signing in. Please try again later.' });
        }
    };





    //Update-background-info==========>updateBackground 
    const [backendError, setBackgroundError] = useState('')

    const updateBackground = async (e) => {
        e.preventDefault();
        try {
            const backGroundAPI = await fetch('https://www.backend.lvoverseas.com/api/student/update-background-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(background),
            });

            const data = await backGroundAPI.json();
            if (data.error) {
                setBackgroundError({ message: data.error });
            } else {
                setPisuccess({ success: data.message });
                setBackgroundError('');
            }
        } catch (error) {
            console.error({ message: 'Error signing in. Please try again later.' });
        }
    };


    //    Upload-Documents===================================================================>

    const [document_name, setDocumentName] = useState("");
    const [documentFile, setDocumentFile] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");
    const [documents, setDocuments] = useState([]);

    const id = userId;

    const handleDocumentChange = (event) => {
        setDocumentFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("document_name", document_name);
        formData.append("doc", documentFile);
        formData.append("id", id);

        try {
            const response = await fetch("https://www.backend.lvoverseas.com/api/student/upload-documents/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setDocumentName("");
                setDocumentFile("");
                setUploadStatus("");
                fetchDocuments();
            } else {
                const errorData = await response.json();
                throw new Error("Failed to save data: " + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error("Error:", error.message);
            setUploadStatus("");
        }
    };

    const fetchDocuments = async () => {
        try {
            const response = await fetch(`https://www.backend.lvoverseas.com/api/student/documents/${id}`);
            const data = await response.json();
            setDocuments(data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);



    // useEffect(() => {
    //     const documentsApi = async () => {
    //         try {
    //             const response = await fetch(`https://www.backend.lvoverseas.com/api/student/documents/${students.id}`);
    //             const data = await response.json();
    //             setDocuments(data);
    //         } catch (error) {
    //             console.error('Error fetching student school data:', error);
    //         }
    //     };
    //     documentsApi();
    // }, [students.id]);





    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        if (pisuccess.success) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                setPisuccess('');
            }, 3000);
        }
    }, [pisuccess.success]);






    //    deleteApi======================>

    const deleteUser = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://www.backend.lvoverseas.com/api/student/delete-school/${id}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            const data = await response.json();

            if (data.error) {
                console.error('Error deleting user:', data.error);
            } else {
                studentSchoolApi(students.id, setStudentSchool);
                setPisuccess({ success: data.message });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };




    const handleDelete = (id) => {
        deleteUser(id)
            .then(() => {
                try {
                    const response = fetch(`https://www.backend.lvoverseas.com/api/student/schools/${id}`);
                    const data = response.json();
                    setStudentSchool(data);

                } catch (error) {
                    console.error('Error fetching student school data:', error);
                }
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    useEffect(() => {
        setEducation({
            id: userId,
            highest_level_of_education: students.highest_level_of_education,
            country_of_education: students.country_of_education,
            grading_scheme: students.grading_scheme,
            grade_average: students.grade_average
        });
    }, [userId, students]);

    const [activeComponent, setActiveComponent] = useState('profile');

    const handleNavigation = (component) => {
        setActiveComponent(component);
    };

    const downloadImage = (ImageUrl) => {
        saveAs(ImageUrl, 'image.jpg') 
    }


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
                                        <img src="assets/img/user.jpg" className="img-fluid avater" alt="" />
                                    </div>
                                    <Link to="javascript:void(0)" id="upload">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="28" height="28" rx="14" fill="#FFE9D3"></rect><path d="M8 19.084V22h2.916l8.601-8.601-2.916-2.916L8 19.083Zm13.773-7.94a.773.773 0 0 0 0-1.097l-1.82-1.82a.774.774 0 0 0-1.097 0l-1.423 1.424 2.916 2.916 1.424-1.423Z" fill="#da0b4e"></path><rect x="1" y="1" width="28" height="28" rx="14" stroke="#fff" stroke-width="2"></rect></svg></Link>
                                    <input id="upload-file" type="file" />
                                    <h4>{students.name}</h4>
                                    <span>{students.email}</span>
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
                                                <i className="ti-comment-alt"></i>
                                                Applied University
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
                        <div className=" col-lg-9 col-md-9 col-sm-12">
                            <div className="proHead" id="myHeader">
                                <ul className="links scrollTo hor-scrlbar" data-gssticky="1">
                                    <li className="active">
                                        <a href="#PerInfo">General Information <i className="fa fa-check-circle green"></i></a>
                                    </li>
                                    <li className="">
                                        <a href="#EduSummary">Education History <i className="fa fa-check-circle green"></i></a>
                                    </li>
                                    <li className="">
                                        <a href="#TestScores">Test Scores <i className="fa fa-check-circle green"></i></a>
                                    </li>
                                    <li className="">
                                        <a href="#BackInfo">Background Information <i className="fa fa-check-circle green"></i></a>
                                    </li>
                                    <li className="">
                                        <a href="#UploadDoc">Upload Documents <i className="fa fa-check-circle green"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="infoContent mt-3" id="PerInfo" >
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2>Personal <span className="headingsmall"> Information </span></h2>
                                            <div className="slogan">(As indicated on your passport)</div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Full Name <span className="red">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={students.name}
                                                onChange={(e) => setStudents({ ...students, name: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.name && studentsError.message.name[0] && (
                                                <span className="text-danger">{studentsError.message.name[0]}</span>
                                            )}



                                        </div>
                                        <div className="col-md-3">
                                            <label>Email <span className="red">*</span></label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={students.email}
                                                onChange={(e) => setStudents({ ...students, email: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.email && studentsError.message.email[0] && (
                                                <span className="text-danger">{studentsError.message.email[0]}</span>
                                            )}
                                        </div>
                                        <div className="col-md-3">
                                            <label>Country Code <span className="red">*</span></label>
                                            <input
                                                type="text"
                                                name="c_code"
                                                value={students.c_code}
                                                onChange={(e) => setStudents({ ...students, c_code: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.c_code && studentsError.message.c_code[0] && (
                                                <span className="text-danger">{studentsError.message.c_code[0]}</span>
                                            )}

                                        </div>
                                        <div class="col-md-3">
                                            <label>Mobile <span class="red">*</span></label>
                                            <input
                                                type="text"
                                                name="mobile"
                                                value={students.mobile}
                                                onChange={(e) => setStudents({ ...students, mobile: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.mobile && studentsError.message.mobile[0] && (
                                                <span className="text-danger">{studentsError.message.mobile[0]}</span>
                                            )}
                                        </div>
                                        <div class="col-md-3">
                                            <label>Father Name </label>
                                            <input
                                                type="text"
                                                name="father"
                                                placeholder="Father Name"
                                                value={students.father}
                                                onChange={(e) => setStudents({ ...students, father: e.target.value })}
                                            />

                                        </div>
                                        <div class="col-md-3">
                                            <label>Mother Name </label>
                                            <input
                                                type="text"
                                                name="mother"
                                                placeholder="Mother Name"
                                                value={students.mother}
                                                onChange={(e) => setStudents({ ...students, mother: e.target.value })}
                                            />
                                        </div>
                                        <div class="col-md-3">
                                            <label>Date of Birth <span class="red">*</span></label>
                                            <input
                                                type="date"
                                                name="dob"
                                                placeholder="dob"
                                                value={students.dob}
                                                onChange={(e) => setStudents({ ...students, dob: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.dob && studentsError.message.dob[0] && (
                                                <span className="text-danger">{studentsError.message.dob[0]}</span>
                                            )}
                                        </div>
                                        <div class="col-md-3">
                                            <label>First Language <span class="red">*</span></label>
                                            <input
                                                type="text"
                                                name="first_language"
                                                placeholder="First Language"
                                                value={students.first_language}
                                                onChange={(e) => setStudents({ ...students, first_language: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.first_language && studentsError.message.first_language[0] && (
                                                <span className="text-danger">{studentsError.message.first_language[0]}</span>
                                            )}
                                        </div>
                                        <div class="col-md-3">
                                            <label>Country of Citizenship <span class="red">*</span></label>
                                            <input
                                                type="text"
                                                name="nationality"
                                                placeholder="Nationality"
                                                value={students.nationality}
                                                onChange={(e) => setStudents({ ...students, nationality: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.nationality && studentsError.message.nationality[0] && (
                                                <span className="text-danger">{studentsError.message.nationality[0]}</span>
                                            )}
                                     
                                        </div>
                                        <div class="col-md-3">
                                            <label>Passport Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Passport Number"
                                                name="passport_number"
                                                value={students.passport_number}
                                                onChange={(e) => setStudents({ ...students, passport_number: e.target.value })}
                                            />

                                        </div>
                                        <div class="col-md-3">
                                            <label>Passport Expiry Date</label>
                                            <input
                                                type="date"
                                                name="passport_expiry"
                                                placeholder=" Expiry Date"
                                                value={students.passport_expiry}
                                                onChange={(e) => setStudents({ ...students, passport_expiry: e.target.value })}
                                            />                                         </div>

                                        <div class="col-md-3">
                                            <label>Marital Status </label>
                                            <select name="marital_status" value={students.marital_status} onChange={(e) => setStudents({ ...students, marital_status: e.target.value })}>
                                                <option value="" >Select</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label>Gender <i class="fa fa-info-circle"></i> <span class="red">*</span></label>
                                            <select name="gender" value={students.gender} onChange={(e) => setStudents({ ...students, gender: e.target.value })}>
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        
                                        <div class="col-md-12" style={{ marginTop: '40px' }}>
                                            <h2>
                                                Address Detail
                                                    <span>
                                                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z">
                                                            </path>
                                                        </svg>
                                                        Please make sure to enter the student's residential address. Organization address will not be
                                                        accepted.
                                                    </span>
                                            </h2>
                                        </div>
                                        {showPopup && (
                                            <div className="success-popup">
                                                <div className="success-content">
                                                    <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
                                                    <div className="success-message">
                                                        {pisuccess.success && (
                                                            <h6 className="text-success text-center">
                                                                {pisuccess.success} <span role="img" aria-label="thumbs-up">👍</span>
                                                            </h6>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div class="col-md-6">

                                            <label>Address </label>
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                value={students.home_address}
                                                onChange={(e) => setStudents({ ...students, home_address: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.home_address && studentsError.message.home_address[0] && (
                                                <span className="text-danger">{studentsError.message.home_address[0]}</span>
                                            )}


                                        </div>
                                        <div class="col-md-3">
                                            <label>City/Town </label>
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={students.city}
                                                onChange={(e) => setStudents({ ...students, city: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.city && studentsError.message.city[0] && (
                                                <span className="text-danger">{studentsError.message.city[0]}</span>
                                            )}
                                        </div>
                                        <div class="col-md-3">
                                            <label>Province/State </label>
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={students.state}
                                                onChange={(e) => setStudents({ ...students, state: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.state && studentsError.message.state[0] && (
                                                <span className="text-danger">{studentsError.message.state[0]}</span>
                                            )}
                                        </div>
                                        <div class="col-md-4">
                                            <label>Country </label>
                                            <select name="country" value={students.country} onChange={(e) => setStudents({ ...students, country: e.target.value })} >
                                                <option value="" selected="">Select</option>
                                                <option value="AFGHANISTAN">AFGHANISTAN</option>
                                                <option value="ALBANIA">ALBANIA</option>
                                                <option value="ALGERIA">ALGERIA</option>
                                                <option value="AMERICAN SAMOA">AMERICAN SAMOA</option>
                                                <option value="ANDORRA">ANDORRA</option>
                                                <option value="ANGOLA">ANGOLA</option>
                                                <option value="ANGUILLA">ANGUILLA</option>
                                                <option value="ANTARCTICA">ANTARCTICA</option>
                                                <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                                <option value="ARGENTINA">ARGENTINA</option>
                                                <option value="ARMENIA">ARMENIA</option>
                                                <option value="ARUBA">ARUBA</option>
                                                <option value="AUSTRALIA">AUSTRALIA</option>
                                                <option value="AUSTRIA">AUSTRIA</option>
                                                <option value="AZERBAIJAN">AZERBAIJAN</option>
                                                <option value="BAHAMAS">BAHAMAS</option>
                                                <option value="BAHRAIN">BAHRAIN</option>
                                                <option value="BANGLADESH">BANGLADESH</option>
                                                <option value="BARBADOS">BARBADOS</option>
                                                <option value="BELARUS">BELARUS</option>
                                                <option value="BELGIUM">BELGIUM</option>
                                                <option value="BELIZE">BELIZE</option>
                                                <option value="BENIN">BENIN</option>
                                                <option value="BERMUDA">BERMUDA</option>
                                                <option value="BHUTAN">BHUTAN</option>
                                                <option value="BOLIVIA">BOLIVIA</option>
                                                <option value="BOSNIA">BOSNIA</option>
                                                <option value="BOTSWANA">BOTSWANA</option>
                                                <option value="BOUVET ISLAND">BOUVET ISLAND</option>
                                                <option value="BRAZIL">BRAZIL</option>
                                                <option value="BRITISH INDIAN OCEAN TERRITORY">BRITISH INDIAN OCEAN TERRITORY</option>
                                                <option value="BRUNEI DARUSSALAM">BRUNEI DARUSSALAM</option>
                                                <option value="BULGARIA">BULGARIA</option>
                                                <option value="BURKINA FASO">BURKINA FASO</option>
                                                <option value="BURUNDI">BURUNDI</option>
                                                <option value="CAMBODIA">CAMBODIA</option>
                                                <option value="CAMEROON">CAMEROON</option>
                                                <option value="CANADA">CANADA</option>
                                                <option value="CAPE VERDE">CAPE VERDE</option>
                                                <option value="Caribbean Island">Caribbean Island</option>
                                                <option value="CAYMAN ISLANDS">CAYMAN ISLANDS</option>
                                                <option value="CENTRAL AFRICAN REPUBLIC">CENTRAL AFRICAN REPUBLIC</option>
                                                <option value="CHAD">CHAD</option>
                                                <option value="CHILE">CHILE</option>
                                                <option value="CHINA">CHINA</option>
                                                <option value="CHRISTMAS ISLAND">CHRISTMAS ISLAND</option>
                                                <option value="COCOS (KEELING) ISLANDS">COCOS (KEELING) ISLANDS</option>
                                                <option value="COLOMBIA">COLOMBIA</option>
                                                <option value="COMOROS">COMOROS</option>
                                                <option value="CONGO">CONGO</option>
                                                <option value="CONGO, THE DEMOCRATIC REPUBLIC OF THE">CONGO, THE DEMOCRATIC REPUBLIC OF THE</option>
                                                <option value="COOK ISLANDS">COOK ISLANDS</option>
                                                <option value="COSTA RICA">COSTA RICA</option>
                                                <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                                                <option value="CROATIA">CROATIA</option>
                                                <option value="CUBA">CUBA</option>
                                                <option value="CYPRUS">CYPRUS</option>
                                                <option value="CZECH REPUBLIC">CZECH REPUBLIC</option>
                                                <option value="DENMARK">DENMARK</option>
                                                <option value="DJIBOUTI">DJIBOUTI</option>
                                                <option value="DOMINICA">DOMINICA</option>
                                                <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
                                                <option value="ECUADOR">ECUADOR</option>
                                                <option value="EGYPT">EGYPT</option>
                                                <option value="EL SALVADOR">EL SALVADOR</option>
                                                <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
                                                <option value="ERITREA">ERITREA</option>
                                                <option value="ESTONIA">ESTONIA</option>
                                                <option value="ETHIOPIA">ETHIOPIA</option>
                                                <option value="FALKLAND ISLANDS (MALVINAS)">FALKLAND ISLANDS (MALVINAS)</option>
                                                <option value="FAROE ISLANDS">FAROE ISLANDS</option>
                                                <option value="FIJI">FIJI</option>
                                                <option value="FINLAND">FINLAND</option>
                                                <option value="FRANCE">FRANCE</option>
                                                <option value="FRENCH GUIANA">FRENCH GUIANA</option>
                                                <option value="FRENCH POLYNESIA">FRENCH POLYNESIA</option>
                                                <option value="FRENCH SOUTHERN TERRITORIES">FRENCH SOUTHERN TERRITORIES</option>
                                                <option value="GABON">GABON</option>
                                                <option value="GAMBIA">GAMBIA</option>
                                                <option value="GEORGIA">GEORGIA</option>
                                                <option value="GERMANY">GERMANY</option>
                                                <option value="GHANA">GHANA</option>
                                                <option value="GIBRALTAR">GIBRALTAR</option>
                                                <option value="GREECE">GREECE</option>
                                                <option value="GREENLAND">GREENLAND</option>
                                                <option value="GRENADA">GRENADA</option>
                                                <option value="GUADELOUPE">GUADELOUPE</option>
                                                <option value="GUAM">GUAM</option>
                                                <option value="GUATEMALA">GUATEMALA</option>
                                                <option value="GUINEA">GUINEA</option>
                                                <option value="GUINEA-BISSAU">GUINEA-BISSAU</option>
                                                <option value="GUYANA">GUYANA</option>
                                                <option value="HAITI">HAITI</option>
                                                <option value="HEARD ISLAND AND MCDONALD ISLANDS">HEARD ISLAND AND MCDONALD ISLANDS</option>
                                                <option value="HOLY SEE (VATICAN CITY STATE)">HOLY SEE (VATICAN CITY STATE)</option>
                                                <option value="HONDURAS">HONDURAS</option>
                                                <option value="HONG KONG">HONG KONG</option>
                                                <option value="HUNGARY">HUNGARY</option>
                                                <option value="ICELAND">ICELAND</option>
                                                <option value="INDIA">INDIA</option>
                                                <option value="INDONESIA">INDONESIA</option>
                                                <option value="IRAN">IRAN</option>
                                                <option value="IRAQ">IRAQ</option>
                                                <option value="IRELAND">IRELAND</option>
                                                <option value="ISRAEL">ISRAEL</option>
                                                <option value="ITALY">ITALY</option>
                                                <option value="JAMAICA">JAMAICA</option>
                                                <option value="JAPAN">JAPAN</option>
                                                <option value="JORDAN">JORDAN</option>
                                                <option value="KAZAKHSTAN">KAZAKHSTAN</option>
                                                <option value="KENYA">KENYA</option>
                                                <option value="KIRIBATI">KIRIBATI</option>
                                                <option value="KUWAIT">KUWAIT</option>
                                                <option value="KYRGYZSTAN">KYRGYZSTAN</option>
                                                <option value="LAO PEOPLE'S DEMOCRATIC REPUBLIC">LAO PEOPLE'S DEMOCRATIC REPUBLIC</option>
                                                <option value="LATVIA">LATVIA</option>
                                                <option value="LEBANON">LEBANON</option>
                                                <option value="LESOTHO">LESOTHO</option>
                                                <option value="LIBERIA">LIBERIA</option>
                                                <option value="LIBYAN ARAB JAMAHIRIYA">LIBYAN ARAB JAMAHIRIYA</option>
                                                <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                                                <option value="LITHUANIA">LITHUANIA</option>
                                                <option value="LUXEMBOURG">LUXEMBOURG</option>
                                                <option value="MACAO">MACAO</option>
                                                <option value="MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF">MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF</option>
                                                <option value="MADAGASCAR">MADAGASCAR</option>
                                                <option value="MALAWI">MALAWI</option>
                                                <option value="MALAYSIA">MALAYSIA</option>
                                                <option value="MALDIVES">MALDIVES</option>
                                                <option value="MALI">MALI</option>
                                                <option value="MALTA">MALTA</option>
                                                <option value="MARSHALL ISLANDS">MARSHALL ISLANDS</option>
                                                <option value="MARTINIQUE">MARTINIQUE</option>
                                                <option value="MAURITANIA">MAURITANIA</option>
                                                <option value="MAURITIUS">MAURITIUS</option>
                                                <option value="MAYOTTE">MAYOTTE</option>
                                                <option value="MEXICO">MEXICO</option>
                                                <option value="MICRONESIA, FEDERATED STATES OF">MICRONESIA, FEDERATED STATES OF</option>
                                                <option value="MOLDOVA, REPUBLIC OF">MOLDOVA, REPUBLIC OF</option>
                                                <option value="MONACO">MONACO</option>
                                                <option value="MONGOLIA">MONGOLIA</option>
                                                <option value="MONTSERRAT">MONTSERRAT</option>
                                                <option value="MOROCCO">MOROCCO</option>
                                                <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                                                <option value="MYANMAR">MYANMAR</option>
                                                <option value="NAMIBIA">NAMIBIA</option>
                                                <option value="NAURU">NAURU</option>
                                                <option value="NEPAL">NEPAL</option>
                                                <option value="NETHERLANDS">NETHERLANDS</option>
                                                <option value="NETHERLANDS ANTILLES">NETHERLANDS ANTILLES</option>
                                                <option value="NEW CALEDONIA">NEW CALEDONIA</option>
                                                <option value="NEW ZEALAND">NEW ZEALAND</option>
                                                <option value="NICARAGUA">NICARAGUA</option>
                                                <option value="NIGER">NIGER</option>
                                                <option value="NIGERIA">NIGERIA</option>
                                                <option value="NIUE">NIUE</option>
                                                <option value="NORFOLK ISLAND">NORFOLK ISLAND</option>
                                                <option value="North Korea">North Korea</option>
                                                <option value="NORTHERN MARIANA ISLANDS">NORTHERN MARIANA ISLANDS</option>
                                                <option value="NORWAY">NORWAY</option>
                                                <option value="OMAN">OMAN</option>
                                                <option value="PAKISTAN">PAKISTAN</option>
                                                <option value="PALAU">PALAU</option>
                                                <option value="PALESTINIAN TERRITORY, OCCUPIED">PALESTINIAN TERRITORY, OCCUPIED</option>
                                                <option value="PANAMA">PANAMA</option>
                                                <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
                                                <option value="PARAGUAY">PARAGUAY</option>
                                                <option value="PERU">PERU</option>
                                                <option value="PHILIPPINES">PHILIPPINES</option>
                                                <option value="PITCAIRN">PITCAIRN</option>
                                                <option value="POLAND">POLAND</option>
                                                <option value="PORTUGAL">PORTUGAL</option>
                                                <option value="PUERTO RICO">PUERTO RICO</option>
                                                <option value="QATAR">QATAR</option>
                                                <option value="REUNION">REUNION</option>
                                                <option value="ROMANIA">ROMANIA</option>
                                                <option value="RUSSIA">RUSSIA</option>
                                                <option value="RWANDA">RWANDA</option>
                                                <option value="SAINT HELENA">SAINT HELENA</option>
                                                <option value="SAINT KITTS AND NEVIS">SAINT KITTS AND NEVIS</option>
                                                <option value="SAINT LUCIA">SAINT LUCIA</option>
                                                <option value="SAINT PIERRE AND MIQUELON">SAINT PIERRE AND MIQUELON</option>
                                                <option value="SAINT VINCENT AND THE GRENADINES">SAINT VINCENT AND THE GRENADINES</option>
                                                <option value="SAMOA">SAMOA</option>
                                                <option value="SAN MARINO">SAN MARINO</option>
                                                <option value="SAO TOME AND PRINCIPE">SAO TOME AND PRINCIPE</option>
                                                <option value="SAUDI ARABIA">SAUDI ARABIA</option>
                                                <option value="SENEGAL">SENEGAL</option>
                                                <option value="SERBIA AND MONTENEGRO">SERBIA AND MONTENEGRO</option>
                                                <option value="SEYCHELLES">SEYCHELLES</option>
                                                <option value="SIERRA LEONE">SIERRA LEONE</option>
                                                <option value="SINGAPORE">SINGAPORE</option>
                                                <option value="SLOVAKIA">SLOVAKIA</option>
                                                <option value="SLOVENIA">SLOVENIA</option>
                                                <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
                                                <option value="SOMALIA">SOMALIA</option>
                                                <option value="SOUTH AFRICA">SOUTH AFRICA</option>
                                                <option value="SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                                                <option value="South Korea">South Korea</option>
                                                <option value="SOUTH SUDAN">SOUTH SUDAN</option>
                                                <option value="SPAIN">SPAIN</option>
                                                <option value="SRI LANKA">SRI LANKA</option>
                                                <option value="SUDAN">SUDAN</option>
                                                <option value="SURINAME">SURINAME</option>
                                                <option value="SVALBARD AND JAN MAYEN">SVALBARD AND JAN MAYEN</option>
                                                <option value="SWAZILAND">SWAZILAND</option>
                                                <option value="SWEDEN">SWEDEN</option>
                                                <option value="SWITZERLAND">SWITZERLAND</option>
                                                <option value="SYRIAN ARAB REPUBLIC">SYRIAN ARAB REPUBLIC</option>
                                                <option value="TAIWAN, PROVINCE OF CHINA">TAIWAN, PROVINCE OF CHINA</option>
                                                <option value="TAJIKISTAN">TAJIKISTAN</option>
                                                <option value="TANZANIA, UNITED REPUBLIC OF">TANZANIA, UNITED REPUBLIC OF</option>
                                                <option value="THAILAND">THAILAND</option>
                                                <option value="TIMOR-LESTE">TIMOR-LESTE</option>
                                                <option value="TOGO">TOGO</option>
                                                <option value="TOKELAU">TOKELAU</option>
                                                <option value="TONGA">TONGA</option>
                                                <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
                                                <option value="TUNISIA">TUNISIA</option>
                                                <option value="TURKEY">TURKEY</option>
                                                <option value="TURKMENISTAN">TURKMENISTAN</option>
                                                <option value="TURKS AND CAICOS ISLANDS">TURKS AND CAICOS ISLANDS</option>
                                                <option value="TUVALU">TUVALU</option>
                                                <option value="UGANDA">UGANDA</option>
                                                <option value="UKRAINE">UKRAINE</option>
                                                <option value="UNITED ARAB EMIRATES">UNITED ARAB EMIRATES</option>
                                                <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                                                <option value="UNITED STATES">UNITED STATES</option>
                                                <option value="UNITED STATES MINOR OUTLYING ISLANDS">UNITED STATES MINOR OUTLYING ISLANDS</option>
                                                <option value="URUGUAY">URUGUAY</option>
                                                <option value="UZBEKISTAN">UZBEKISTAN</option>
                                                <option value="VANUATU">VANUATU</option>
                                                <option value="VENEZUELA">VENEZUELA</option>
                                                <option value="VIET NAM">VIET NAM</option>
                                                <option value="VIRGIN ISLANDS, BRITISH">VIRGIN ISLANDS, BRITISH</option>
                                                <option value="VIRGIN ISLANDS, U.S.">VIRGIN ISLANDS, U.S.</option>
                                                <option value="WALLIS AND FUTUNA">WALLIS AND FUTUNA</option>
                                                <option value="WESTERN SAHARA">WESTERN SAHARA</option>
                                                <option value="YEMEN">YEMEN</option>
                                                <option value="ZAMBIA">ZAMBIA</option>
                                                <option value="ZIMBABWE">ZIMBABWE</option>
                                            </select>
                                            {studentsError.message && studentsError.message.country && studentsError.message.country[0] && (
                                                <span className="text-danger">{studentsError.message.country[0]}</span>
                                            )}

                                        </div>
                                        <div class="col-md-4">
                                            <label>Postal/Zip Code</label>
                                            <input
                                                type="text"
                                                placeholder="Zip Code"
                                                value={students.zip_code}
                                                onChange={(e) => setStudents({ ...students, zip_code: e.target.value })}
                                            />
                                            {studentsError.message && studentsError.message.zip_code && studentsError.message.zip_code[0] && (
                                                <span className="text-danger">{studentsError.message.zip_code[0]}</span>
                                            )}
                                        </div>
                                        <div class="col-md-4">
                                            <label>Home Contect Number</label>
                                            <input
                                                type="text"
                                                placeholder="Home Contect"
                                                value={students.home_contact_number}
                                                onChange={(e) => setStudents({ ...students, home_contact_number: e.target.value })}
                                            />                                         </div>
                                        <div className="col-md-12">
                                            <input
                                                type="hidden"
                                                placeholder="Passport Expiry Date"
                                                value={students.id}
                                                onChange={(e) => setStudents({ ...students, id: e.target.value })}
                                            />
                                            <button type="submit" onClick={personalInfoSubmit} className="saveBtn">Save</button>
                                            <button className="cancelBtn">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="infoContent" id="EduSummary">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2>Education <span className="headingsmall">Summary</span> </h2>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Country of Education <span className="red">*</span></label>
                                            <select name="" value={education.country_of_education} onChange={(e) => setEducation({ ...education, country_of_education: e.target.value })}>
                                                <option value="" selected="">Select</option>
                                                <option value="AFGHANISTAN">AFGHANISTAN</option>
                                                <option value="ALBANIA">ALBANIA</option>
                                                <option value="ALGERIA">ALGERIA</option>
                                                <option value="AMERICAN SAMOA">AMERICAN SAMOA</option>
                                                <option value="ANDORRA">ANDORRA</option>
                                                <option value="ANGOLA">ANGOLA</option>
                                                <option value="ANGUILLA">ANGUILLA</option>
                                                <option value="ANTARCTICA">ANTARCTICA</option>
                                                <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                                <option value="ARGENTINA">ARGENTINA</option>
                                                <option value="ARMENIA">ARMENIA</option>
                                                <option value="ARUBA">ARUBA</option>
                                                <option value="AUSTRALIA">AUSTRALIA</option>
                                                <option value="AUSTRIA">AUSTRIA</option>
                                                <option value="AZERBAIJAN">AZERBAIJAN</option>
                                                <option value="BAHAMAS">BAHAMAS</option>
                                                <option value="BAHRAIN">BAHRAIN</option>
                                                <option value="BANGLADESH">BANGLADESH</option>
                                                <option value="BARBADOS">BARBADOS</option>
                                                <option value="BELARUS">BELARUS</option>
                                                <option value="BELGIUM">BELGIUM</option>
                                                <option value="BELIZE">BELIZE</option>
                                                <option value="BENIN">BENIN</option>
                                                <option value="BERMUDA">BERMUDA</option>
                                                <option value="BHUTAN">BHUTAN</option>
                                                <option value="BOLIVIA">BOLIVIA</option>
                                                <option value="BOSNIA">BOSNIA</option>
                                                <option value="BOTSWANA">BOTSWANA</option>
                                                <option value="BOUVET ISLAND">BOUVET ISLAND</option>
                                                <option value="BRAZIL">BRAZIL</option>
                                                <option value="BRITISH INDIAN OCEAN TERRITORY">BRITISH INDIAN OCEAN TERRITORY</option>
                                                <option value="BRUNEI DARUSSALAM">BRUNEI DARUSSALAM</option>
                                                <option value="BULGARIA">BULGARIA</option>
                                                <option value="BURKINA FASO">BURKINA FASO</option>
                                                <option value="BURUNDI">BURUNDI</option>
                                                <option value="CAMBODIA">CAMBODIA</option>
                                                <option value="CAMEROON">CAMEROON</option>
                                                <option value="CANADA">CANADA</option>
                                                <option value="CAPE VERDE">CAPE VERDE</option>
                                                <option value="Caribbean Island">Caribbean Island</option>
                                                <option value="CAYMAN ISLANDS">CAYMAN ISLANDS</option>
                                                <option value="CENTRAL AFRICAN REPUBLIC">CENTRAL AFRICAN REPUBLIC</option>
                                                <option value="CHAD">CHAD</option>
                                                <option value="CHILE">CHILE</option>
                                                <option value="CHINA">CHINA</option>
                                                <option value="CHRISTMAS ISLAND">CHRISTMAS ISLAND</option>
                                                <option value="COCOS (KEELING) ISLANDS">COCOS (KEELING) ISLANDS</option>
                                                <option value="COLOMBIA">COLOMBIA</option>
                                                <option value="COMOROS">COMOROS</option>
                                                <option value="CONGO">CONGO</option>
                                                <option value="CONGO, THE DEMOCRATIC REPUBLIC OF THE">CONGO, THE DEMOCRATIC REPUBLIC OF THE</option>
                                                <option value="COOK ISLANDS">COOK ISLANDS</option>
                                                <option value="COSTA RICA">COSTA RICA</option>
                                                <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                                                <option value="CROATIA">CROATIA</option>
                                                <option value="CUBA">CUBA</option>
                                                <option value="CYPRUS">CYPRUS</option>
                                                <option value="CZECH REPUBLIC">CZECH REPUBLIC</option>
                                                <option value="DENMARK">DENMARK</option>
                                                <option value="DJIBOUTI">DJIBOUTI</option>
                                                <option value="DOMINICA">DOMINICA</option>
                                                <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
                                                <option value="ECUADOR">ECUADOR</option>
                                                <option value="EGYPT">EGYPT</option>
                                                <option value="EL SALVADOR">EL SALVADOR</option>
                                                <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
                                                <option value="ERITREA">ERITREA</option>
                                                <option value="ESTONIA">ESTONIA</option>
                                                <option value="ETHIOPIA">ETHIOPIA</option>
                                                <option value="FALKLAND ISLANDS (MALVINAS)">FALKLAND ISLANDS (MALVINAS)</option>
                                                <option value="FAROE ISLANDS">FAROE ISLANDS</option>
                                                <option value="FIJI">FIJI</option>
                                                <option value="FINLAND">FINLAND</option>
                                                <option value="FRANCE">FRANCE</option>
                                                <option value="FRENCH GUIANA">FRENCH GUIANA</option>
                                                <option value="FRENCH POLYNESIA">FRENCH POLYNESIA</option>
                                                <option value="FRENCH SOUTHERN TERRITORIES">FRENCH SOUTHERN TERRITORIES</option>
                                                <option value="GABON">GABON</option>
                                                <option value="GAMBIA">GAMBIA</option>
                                                <option value="GEORGIA">GEORGIA</option>
                                                <option value="GERMANY">GERMANY</option>
                                                <option value="GHANA">GHANA</option>
                                                <option value="GIBRALTAR">GIBRALTAR</option>
                                                <option value="GREECE">GREECE</option>
                                                <option value="GREENLAND">GREENLAND</option>
                                                <option value="GRENADA">GRENADA</option>
                                                <option value="GUADELOUPE">GUADELOUPE</option>
                                                <option value="GUAM">GUAM</option>
                                                <option value="GUATEMALA">GUATEMALA</option>
                                                <option value="GUINEA">GUINEA</option>
                                                <option value="GUINEA-BISSAU">GUINEA-BISSAU</option>
                                                <option value="GUYANA">GUYANA</option>
                                                <option value="HAITI">HAITI</option>
                                                <option value="HEARD ISLAND AND MCDONALD ISLANDS">HEARD ISLAND AND MCDONALD ISLANDS</option>
                                                <option value="HOLY SEE (VATICAN CITY STATE)">HOLY SEE (VATICAN CITY STATE)</option>
                                                <option value="HONDURAS">HONDURAS</option>
                                                <option value="HONG KONG">HONG KONG</option>
                                                <option value="HUNGARY">HUNGARY</option>
                                                <option value="ICELAND">ICELAND</option>
                                                <option value="INDIA">INDIA</option>
                                                <option value="INDONESIA">INDONESIA</option>
                                                <option value="IRAN">IRAN</option>
                                                <option value="IRAQ">IRAQ</option>
                                                <option value="IRELAND">IRELAND</option>
                                                <option value="ISRAEL">ISRAEL</option>
                                                <option value="ITALY">ITALY</option>
                                                <option value="JAMAICA">JAMAICA</option>
                                                <option value="JAPAN">JAPAN</option>
                                                <option value="JORDAN">JORDAN</option>
                                                <option value="KAZAKHSTAN">KAZAKHSTAN</option>
                                                <option value="KENYA">KENYA</option>
                                                <option value="KIRIBATI">KIRIBATI</option>
                                                <option value="KUWAIT">KUWAIT</option>
                                                <option value="KYRGYZSTAN">KYRGYZSTAN</option>
                                                <option value="LAO PEOPLE'S DEMOCRATIC REPUBLIC">LAO PEOPLE'S DEMOCRATIC REPUBLIC</option>
                                                <option value="LATVIA">LATVIA</option>
                                                <option value="LEBANON">LEBANON</option>
                                                <option value="LESOTHO">LESOTHO</option>
                                                <option value="LIBERIA">LIBERIA</option>
                                                <option value="LIBYAN ARAB JAMAHIRIYA">LIBYAN ARAB JAMAHIRIYA</option>
                                                <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                                                <option value="LITHUANIA">LITHUANIA</option>
                                                <option value="LUXEMBOURG">LUXEMBOURG</option>
                                                <option value="MACAO">MACAO</option>
                                                <option value="MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF">MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF</option>
                                                <option value="MADAGASCAR">MADAGASCAR</option>
                                                <option value="MALAWI">MALAWI</option>
                                                <option value="MALAYSIA">MALAYSIA</option>
                                                <option value="MALDIVES">MALDIVES</option>
                                                <option value="MALI">MALI</option>
                                                <option value="MALTA">MALTA</option>
                                                <option value="MARSHALL ISLANDS">MARSHALL ISLANDS</option>
                                                <option value="MARTINIQUE">MARTINIQUE</option>
                                                <option value="MAURITANIA">MAURITANIA</option>
                                                <option value="MAURITIUS">MAURITIUS</option>
                                                <option value="MAYOTTE">MAYOTTE</option>
                                                <option value="MEXICO">MEXICO</option>
                                                <option value="MICRONESIA, FEDERATED STATES OF">MICRONESIA, FEDERATED STATES OF</option>
                                                <option value="MOLDOVA, REPUBLIC OF">MOLDOVA, REPUBLIC OF</option>
                                                <option value="MONACO">MONACO</option>
                                                <option value="MONGOLIA">MONGOLIA</option>
                                                <option value="MONTSERRAT">MONTSERRAT</option>
                                                <option value="MOROCCO">MOROCCO</option>
                                                <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                                                <option value="MYANMAR">MYANMAR</option>
                                                <option value="NAMIBIA">NAMIBIA</option>
                                                <option value="NAURU">NAURU</option>
                                                <option value="NEPAL">NEPAL</option>
                                                <option value="NETHERLANDS">NETHERLANDS</option>
                                                <option value="NETHERLANDS ANTILLES">NETHERLANDS ANTILLES</option>
                                                <option value="NEW CALEDONIA">NEW CALEDONIA</option>
                                                <option value="NEW ZEALAND">NEW ZEALAND</option>
                                                <option value="NICARAGUA">NICARAGUA</option>
                                                <option value="NIGER">NIGER</option>
                                                <option value="NIGERIA">NIGERIA</option>
                                                <option value="NIUE">NIUE</option>
                                                <option value="NORFOLK ISLAND">NORFOLK ISLAND</option>
                                                <option value="North Korea">North Korea</option>
                                                <option value="NORTHERN MARIANA ISLANDS">NORTHERN MARIANA ISLANDS</option>
                                                <option value="NORWAY">NORWAY</option>
                                                <option value="OMAN">OMAN</option>
                                                <option value="PAKISTAN">PAKISTAN</option>
                                                <option value="PALAU">PALAU</option>
                                                <option value="PALESTINIAN TERRITORY, OCCUPIED">PALESTINIAN TERRITORY, OCCUPIED</option>
                                                <option value="PANAMA">PANAMA</option>
                                                <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
                                                <option value="PARAGUAY">PARAGUAY</option>
                                                <option value="PERU">PERU</option>
                                                <option value="PHILIPPINES">PHILIPPINES</option>
                                                <option value="PITCAIRN">PITCAIRN</option>
                                                <option value="POLAND">POLAND</option>
                                                <option value="PORTUGAL">PORTUGAL</option>
                                                <option value="PUERTO RICO">PUERTO RICO</option>
                                                <option value="QATAR">QATAR</option>
                                                <option value="REUNION">REUNION</option>
                                                <option value="ROMANIA">ROMANIA</option>
                                                <option value="RUSSIA">RUSSIA</option>
                                                <option value="RWANDA">RWANDA</option>
                                                <option value="SAINT HELENA">SAINT HELENA</option>
                                                <option value="SAINT KITTS AND NEVIS">SAINT KITTS AND NEVIS</option>
                                                <option value="SAINT LUCIA">SAINT LUCIA</option>
                                                <option value="SAINT PIERRE AND MIQUELON">SAINT PIERRE AND MIQUELON</option>
                                                <option value="SAINT VINCENT AND THE GRENADINES">SAINT VINCENT AND THE GRENADINES</option>
                                                <option value="SAMOA">SAMOA</option>
                                                <option value="SAN MARINO">SAN MARINO</option>
                                                <option value="SAO TOME AND PRINCIPE">SAO TOME AND PRINCIPE</option>
                                                <option value="SAUDI ARABIA">SAUDI ARABIA</option>
                                                <option value="SENEGAL">SENEGAL</option>
                                                <option value="SERBIA AND MONTENEGRO">SERBIA AND MONTENEGRO</option>
                                                <option value="SEYCHELLES">SEYCHELLES</option>
                                                <option value="SIERRA LEONE">SIERRA LEONE</option>
                                                <option value="SINGAPORE">SINGAPORE</option>
                                                <option value="SLOVAKIA">SLOVAKIA</option>
                                                <option value="SLOVENIA">SLOVENIA</option>
                                                <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
                                                <option value="SOMALIA">SOMALIA</option>
                                                <option value="SOUTH AFRICA">SOUTH AFRICA</option>
                                                <option value="SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                                                <option value="South Korea">South Korea</option>
                                                <option value="SOUTH SUDAN">SOUTH SUDAN</option>
                                                <option value="SPAIN">SPAIN</option>
                                                <option value="SRI LANKA">SRI LANKA</option>
                                                <option value="SUDAN">SUDAN</option>
                                                <option value="SURINAME">SURINAME</option>
                                                <option value="SVALBARD AND JAN MAYEN">SVALBARD AND JAN MAYEN</option>
                                                <option value="SWAZILAND">SWAZILAND</option>
                                                <option value="SWEDEN">SWEDEN</option>
                                                <option value="SWITZERLAND">SWITZERLAND</option>
                                                <option value="SYRIAN ARAB REPUBLIC">SYRIAN ARAB REPUBLIC</option>
                                                <option value="TAIWAN, PROVINCE OF CHINA">TAIWAN, PROVINCE OF CHINA</option>
                                                <option value="TAJIKISTAN">TAJIKISTAN</option>
                                                <option value="TANZANIA, UNITED REPUBLIC OF">TANZANIA, UNITED REPUBLIC OF</option>
                                                <option value="THAILAND">THAILAND</option>
                                                <option value="TIMOR-LESTE">TIMOR-LESTE</option>
                                                <option value="TOGO">TOGO</option>
                                                <option value="TOKELAU">TOKELAU</option>
                                                <option value="TONGA">TONGA</option>
                                                <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
                                                <option value="TUNISIA">TUNISIA</option>
                                                <option value="TURKEY">TURKEY</option>
                                                <option value="TURKMENISTAN">TURKMENISTAN</option>
                                                <option value="TURKS AND CAICOS ISLANDS">TURKS AND CAICOS ISLANDS</option>
                                                <option value="TUVALU">TUVALU</option>
                                                <option value="UGANDA">UGANDA</option>
                                                <option value="UKRAINE">UKRAINE</option>
                                                <option value="UNITED ARAB EMIRATES">UNITED ARAB EMIRATES</option>
                                                <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                                                <option value="UNITED STATES">UNITED STATES</option>
                                                <option value="UNITED STATES MINOR OUTLYING ISLANDS">UNITED STATES MINOR OUTLYING ISLANDS</option>
                                                <option value="URUGUAY">URUGUAY</option>
                                                <option value="UZBEKISTAN">UZBEKISTAN</option>
                                                <option value="VANUATU">VANUATU</option>
                                                <option value="VENEZUELA">VENEZUELA</option>
                                                <option value="VIET NAM">VIET NAM</option>
                                                <option value="VIRGIN ISLANDS, BRITISH">VIRGIN ISLANDS, BRITISH</option>
                                                <option value="VIRGIN ISLANDS, U.S.">VIRGIN ISLANDS, U.S.</option>
                                                <option value="WALLIS AND FUTUNA">WALLIS AND FUTUNA</option>
                                                <option value="WESTERN SAHARA">WESTERN SAHARA</option>
                                                <option value="YEMEN">YEMEN</option>
                                                <option value="ZAMBIA">ZAMBIA</option>
                                                <option value="ZIMBABWE">ZIMBABWE</option>
                                            </select>
                                            {educationError.message && educationError.message.country_of_education && educationError.message.country_of_education[0] && (
                                                <span className="text-danger">{educationError.message.country_of_education[0]}</span>
                                            )}

                                        </div>
                                        <div className="col-md-3">
                                            <label>Highest Level of Education <span className="red">*</span></label>
                                            <select name="" value={education.highest_level_of_education} onChange={(e) => setEducation({ ...education, highest_level_of_education: e.target.value })}>
                                                <option value="" selected="">Select
                                                </option>
                                                {
                                                    console.log(education)
                                                }
                                                <option value="PG / Master's Degree">PG / Master's Degree</option>
                                                <option value="Grade 10">Grade 10</option>
                                                <option value="Foundation / Pre-U / A-level">Foundation / Pre-U / A-level</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Post Graduate Certificate / Diploma">Post Graduate Certificate / Diploma</option>
                                                <option value="Under Graduate">Under Graduate</option>
                                                <option value="Integrated Masters">Integrated Masters</option>
                                                <option value="Doctorate / PhD">Doctorate / PhD</option>
                                                <option value="Top-up Degree">Top-up Degree</option>
                                                <option value="UG Certificate">UG Certificate</option>
                                                <option value="Associate Degree">Associate Degree</option>
                                            </select>
                                            {educationError.message && educationError.message.highest_level_of_education && educationError.message.highest_level_of_education[0] && (
                                                <span className="text-danger">{educationError.message.highest_level_of_education[0]}</span>
                                            )}

                                        </div>
                                        <div className="col-md-3">
                                            <label>Grading Scheme <span className="red">*</span></label>
                                            <select name="" value={education.grading_scheme} onChange={(e) => setEducation({ ...education, grading_scheme: e.target.value })} >
                                                <option value="" selected="">Select</option>
                                                <option value="Percentage scale (0-100)">Percentage
                                                    scale (0-100)</option>
                                                <option value="Grade Points (10 scale)">Grade Points
                                                    (10 scale)</option>
                                                <option value="Grade (A to E)">Grade (A to E)</option>
                                            </select>
                                            {educationError.message && educationError.message.grading_scheme && educationError.message.grading_scheme[0] && (
                                                <span className="text-danger">{educationError.message.grading_scheme[0]}</span>
                                            )}
                                        </div>
                                        <div className="col-md-3">
                                            <label>Grade Average <span className="red">*</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter Grade Average..."
                                                value={education.grade_average}
                                                onChange={(e) => setEducation({ ...education, grade_average: e.target.value })}
                                            />
                                            {educationError.message && educationError.message.grade_average && educationError.message.grade_average[0] && (
                                                <span className="text-danger">{educationError.message.grade_average[0]}</span>
                                            )}
                                        </div>

                                        <div className="col-md-12">
                                            <input
                                                type="hidden"
                                                placeholder="Enter Grade Average..."
                                                value={education.id}
                                                onChange={(e) => setEducation({ ...education, id: e.target.value })}
                                            />


                                            <button className="saveBtn" type="submit" onClick={educationSubmit} >Save</button>
                                            <button className="cancelBtn">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="infoContent" id="SchAtd">
                                <div className="row heading_student">
                                    <div className="col-md-6 mt-4">
                                        <h2>Schools <span className="headingsmall">Attended</span> </h2>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <button className="schAtdBtn" onClick={toggleSchoolAttendedForm}>
                                            Add Attended School
                                            <i className="fa fa-plus css-1a2afmv"></i>
                                        </button>
                                    </div>
                                </div>
                                <form>
                                    {isOpen || editSchoolData ? (
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Country of Institution <span className="red">*</span></label>
                                                <select name="country_of_institution" value={editSchoolData.country_of_institution ? editSchoolData.country_of_institution : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, country_of_institution: e.target.value })} >
                                                    <option value="">--- Select ---</option>
                                                    <option value="AFGHANISTAN">AFGHANISTAN</option>
                                                    <option value="ALBANIA">ALBANIA</option>
                                                    <option value="ALGERIA">ALGERIA</option>
                                                    <option value="AMERICAN SAMOA">AMERICAN SAMOA</option>
                                                    <option value="ANDORRA">ANDORRA</option>
                                                    <option value="ANGOLA">ANGOLA</option>
                                                    <option value="ANGUILLA">ANGUILLA</option>
                                                    <option value="ANTARCTICA">ANTARCTICA</option>
                                                    <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                                                    <option value="ARGENTINA">ARGENTINA</option>
                                                    <option value="ARMENIA">ARMENIA</option>
                                                    <option value="ARUBA">ARUBA</option>
                                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                                    <option value="AUSTRIA">AUSTRIA</option>
                                                    <option value="AZERBAIJAN">AZERBAIJAN</option>
                                                    <option value="BAHAMAS">BAHAMAS</option>
                                                    <option value="BAHRAIN">BAHRAIN</option>
                                                    <option value="BANGLADESH">BANGLADESH</option>
                                                    <option value="BARBADOS">BARBADOS</option>
                                                    <option value="BELARUS">BELARUS</option>
                                                    <option value="BELGIUM">BELGIUM</option>
                                                    <option value="BELIZE">BELIZE</option>
                                                    <option value="BENIN">BENIN</option>
                                                    <option value="BERMUDA">BERMUDA</option>
                                                    <option value="BHUTAN">BHUTAN</option>
                                                    <option value="BOLIVIA">BOLIVIA</option>
                                                    <option value="BOSNIA">BOSNIA</option>
                                                    <option value="BOTSWANA">BOTSWANA</option>
                                                    <option value="BOUVET ISLAND">BOUVET ISLAND</option>
                                                    <option value="BRAZIL">BRAZIL</option>
                                                    <option value="BRITISH INDIAN OCEAN TERRITORY">BRITISH INDIAN OCEAN TERRITORY</option>
                                                    <option value="BRUNEI DARUSSALAM">BRUNEI DARUSSALAM</option>
                                                    <option value="BULGARIA">BULGARIA</option>
                                                    <option value="BURKINA FASO">BURKINA FASO</option>
                                                    <option value="BURUNDI">BURUNDI</option>
                                                    <option value="CAMBODIA">CAMBODIA</option>
                                                    <option value="CAMEROON">CAMEROON</option>
                                                    <option value="CANADA">CANADA</option>
                                                    <option value="CAPE VERDE">CAPE VERDE</option>
                                                    <option value="Caribbean Island">Caribbean Island</option>
                                                    <option value="CAYMAN ISLANDS">CAYMAN ISLANDS</option>
                                                    <option value="CENTRAL AFRICAN REPUBLIC">CENTRAL AFRICAN REPUBLIC</option>
                                                    <option value="CHAD">CHAD</option>
                                                    <option value="CHILE">CHILE</option>
                                                    <option value="CHINA">CHINA</option>
                                                    <option value="CHRISTMAS ISLAND">CHRISTMAS ISLAND</option>
                                                    <option value="COCOS (KEELING) ISLANDS">COCOS (KEELING) ISLANDS</option>
                                                    <option value="COLOMBIA">COLOMBIA</option>
                                                    <option value="COMOROS">COMOROS</option>
                                                    <option value="CONGO">CONGO</option>
                                                    <option value="CONGO, THE DEMOCRATIC REPUBLIC OF THE">CONGO, THE DEMOCRATIC REPUBLIC OF THE</option>
                                                    <option value="COOK ISLANDS">COOK ISLANDS</option>
                                                    <option value="COSTA RICA">COSTA RICA</option>
                                                    <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                                                    <option value="CROATIA">CROATIA</option>
                                                    <option value="CUBA">CUBA</option>
                                                    <option value="CYPRUS">CYPRUS</option>
                                                    <option value="CZECH REPUBLIC">CZECH REPUBLIC</option>
                                                    <option value="DENMARK">DENMARK</option>
                                                    <option value="DJIBOUTI">DJIBOUTI</option>
                                                    <option value="DOMINICA">DOMINICA</option>
                                                    <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
                                                    <option value="ECUADOR">ECUADOR</option>
                                                    <option value="EGYPT">EGYPT</option>
                                                    <option value="EL SALVADOR">EL SALVADOR</option>
                                                    <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
                                                    <option value="ERITREA">ERITREA</option>
                                                    <option value="ESTONIA">ESTONIA</option>
                                                    <option value="ETHIOPIA">ETHIOPIA</option>
                                                    <option value="FALKLAND ISLANDS (MALVINAS)">FALKLAND ISLANDS (MALVINAS)</option>
                                                    <option value="FAROE ISLANDS">FAROE ISLANDS</option>
                                                    <option value="FIJI">FIJI</option>
                                                    <option value="FINLAND">FINLAND</option>
                                                    <option value="FRANCE">FRANCE</option>
                                                    <option value="FRENCH GUIANA">FRENCH GUIANA</option>
                                                    <option value="FRENCH POLYNESIA">FRENCH POLYNESIA</option>
                                                    <option value="FRENCH SOUTHERN TERRITORIES">FRENCH SOUTHERN TERRITORIES</option>
                                                    <option value="GABON">GABON</option>
                                                    <option value="GAMBIA">GAMBIA</option>
                                                    <option value="GEORGIA">GEORGIA</option>
                                                    <option value="GERMANY">GERMANY</option>
                                                    <option value="GHANA">GHANA</option>
                                                    <option value="GIBRALTAR">GIBRALTAR</option>
                                                    <option value="GREECE">GREECE</option>
                                                    <option value="GREENLAND">GREENLAND</option>
                                                    <option value="GRENADA">GRENADA</option>
                                                    <option value="GUADELOUPE">GUADELOUPE</option>
                                                    <option value="GUAM">GUAM</option>
                                                    <option value="GUATEMALA">GUATEMALA</option>
                                                    <option value="GUINEA">GUINEA</option>
                                                    <option value="GUINEA-BISSAU">GUINEA-BISSAU</option>
                                                    <option value="GUYANA">GUYANA</option>
                                                    <option value="HAITI">HAITI</option>
                                                    <option value="HEARD ISLAND AND MCDONALD ISLANDS">HEARD ISLAND AND MCDONALD ISLANDS</option>
                                                    <option value="HOLY SEE (VATICAN CITY STATE)">HOLY SEE (VATICAN CITY STATE)</option>
                                                    <option value="HONDURAS">HONDURAS</option>
                                                    <option value="HONG KONG">HONG KONG</option>
                                                    <option value="HUNGARY">HUNGARY</option>
                                                    <option value="ICELAND">ICELAND</option>
                                                    <option value="INDIA">INDIA</option>
                                                    <option value="INDONESIA">INDONESIA</option>
                                                    <option value="IRAN">IRAN</option>
                                                    <option value="IRAQ">IRAQ</option>
                                                    <option value="IRELAND">IRELAND</option>
                                                    <option value="ISRAEL">ISRAEL</option>
                                                    <option value="ITALY">ITALY</option>
                                                    <option value="JAMAICA">JAMAICA</option>
                                                    <option value="JAPAN">JAPAN</option>
                                                    <option value="JORDAN">JORDAN</option>
                                                    <option value="KAZAKHSTAN">KAZAKHSTAN</option>
                                                    <option value="KENYA">KENYA</option>
                                                    <option value="KIRIBATI">KIRIBATI</option>
                                                    <option value="KUWAIT">KUWAIT</option>
                                                    <option value="KYRGYZSTAN">KYRGYZSTAN</option>
                                                    <option value="LAO PEOPLE'S DEMOCRATIC REPUBLIC">LAO PEOPLE'S DEMOCRATIC REPUBLIC</option>
                                                    <option value="LATVIA">LATVIA</option>
                                                    <option value="LEBANON">LEBANON</option>
                                                    <option value="LESOTHO">LESOTHO</option>
                                                    <option value="LIBERIA">LIBERIA</option>
                                                    <option value="LIBYAN ARAB JAMAHIRIYA">LIBYAN ARAB JAMAHIRIYA</option>
                                                    <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                                                    <option value="LITHUANIA">LITHUANIA</option>
                                                    <option value="LUXEMBOURG">LUXEMBOURG</option>
                                                    <option value="MACAO">MACAO</option>
                                                    <option value="MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF">MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF</option>
                                                    <option value="MADAGASCAR">MADAGASCAR</option>
                                                    <option value="MALAWI">MALAWI</option>
                                                    <option value="MALAYSIA">MALAYSIA</option>
                                                    <option value="MALDIVES">MALDIVES</option>
                                                    <option value="MALI">MALI</option>
                                                    <option value="MALTA">MALTA</option>
                                                    <option value="MARSHALL ISLANDS">MARSHALL ISLANDS</option>
                                                    <option value="MARTINIQUE">MARTINIQUE</option>
                                                    <option value="MAURITANIA">MAURITANIA</option>
                                                    <option value="MAURITIUS">MAURITIUS</option>
                                                    <option value="MAYOTTE">MAYOTTE</option>
                                                    <option value="MEXICO">MEXICO</option>
                                                    <option value="MICRONESIA, FEDERATED STATES OF">MICRONESIA, FEDERATED STATES OF</option>
                                                    <option value="MOLDOVA, REPUBLIC OF">MOLDOVA, REPUBLIC OF</option>
                                                    <option value="MONACO">MONACO</option>
                                                    <option value="MONGOLIA">MONGOLIA</option>
                                                    <option value="MONTSERRAT">MONTSERRAT</option>
                                                    <option value="MOROCCO">MOROCCO</option>
                                                    <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                                                    <option value="MYANMAR">MYANMAR</option>
                                                    <option value="NAMIBIA">NAMIBIA</option>
                                                    <option value="NAURU">NAURU</option>
                                                    <option value="NEPAL">NEPAL</option>
                                                    <option value="NETHERLANDS">NETHERLANDS</option>
                                                    <option value="NETHERLANDS ANTILLES">NETHERLANDS ANTILLES</option>
                                                    <option value="NEW CALEDONIA">NEW CALEDONIA</option>
                                                    <option value="NEW ZEALAND">NEW ZEALAND</option>
                                                    <option value="NICARAGUA">NICARAGUA</option>
                                                    <option value="NIGER">NIGER</option>
                                                    <option value="NIGERIA">NIGERIA</option>
                                                    <option value="NIUE">NIUE</option>
                                                    <option value="NORFOLK ISLAND">NORFOLK ISLAND</option>
                                                    <option value="North Korea">North Korea</option>
                                                    <option value="NORTHERN MARIANA ISLANDS">NORTHERN MARIANA ISLANDS</option>
                                                    <option value="NORWAY">NORWAY</option>
                                                    <option value="OMAN">OMAN</option>
                                                    <option value="PAKISTAN">PAKISTAN</option>
                                                    <option value="PALAU">PALAU</option>
                                                    <option value="PALESTINIAN TERRITORY, OCCUPIED">PALESTINIAN TERRITORY, OCCUPIED</option>
                                                    <option value="PANAMA">PANAMA</option>
                                                    <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
                                                    <option value="PARAGUAY">PARAGUAY</option>
                                                    <option value="PERU">PERU</option>
                                                    <option value="PHILIPPINES">PHILIPPINES</option>
                                                    <option value="PITCAIRN">PITCAIRN</option>
                                                    <option value="POLAND">POLAND</option>
                                                    <option value="PORTUGAL">PORTUGAL</option>
                                                    <option value="PUERTO RICO">PUERTO RICO</option>
                                                    <option value="QATAR">QATAR</option>
                                                    <option value="REUNION">REUNION</option>
                                                    <option value="ROMANIA">ROMANIA</option>
                                                    <option value="RUSSIA">RUSSIA</option>
                                                    <option value="RWANDA">RWANDA</option>
                                                    <option value="SAINT HELENA">SAINT HELENA</option>
                                                    <option value="SAINT KITTS AND NEVIS">SAINT KITTS AND NEVIS</option>
                                                    <option value="SAINT LUCIA">SAINT LUCIA</option>
                                                    <option value="SAINT PIERRE AND MIQUELON">SAINT PIERRE AND MIQUELON</option>
                                                    <option value="SAINT VINCENT AND THE GRENADINES">SAINT VINCENT AND THE GRENADINES</option>
                                                    <option value="SAMOA">SAMOA</option>
                                                    <option value="SAN MARINO">SAN MARINO</option>
                                                    <option value="SAO TOME AND PRINCIPE">SAO TOME AND PRINCIPE</option>
                                                    <option value="SAUDI ARABIA">SAUDI ARABIA</option>
                                                    <option value="SENEGAL">SENEGAL</option>
                                                    <option value="SERBIA AND MONTENEGRO">SERBIA AND MONTENEGRO</option>
                                                    <option value="SEYCHELLES">SEYCHELLES</option>
                                                    <option value="SIERRA LEONE">SIERRA LEONE</option>
                                                    <option value="SINGAPORE">SINGAPORE</option>
                                                    <option value="SLOVAKIA">SLOVAKIA</option>
                                                    <option value="SLOVENIA">SLOVENIA</option>
                                                    <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
                                                    <option value="SOMALIA">SOMALIA</option>
                                                    <option value="SOUTH AFRICA">SOUTH AFRICA</option>
                                                    <option value="SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                                                    <option value="South Korea">South Korea</option>
                                                    <option value="SOUTH SUDAN">SOUTH SUDAN</option>
                                                    <option value="SPAIN">SPAIN</option>
                                                    <option value="SRI LANKA">SRI LANKA</option>
                                                    <option value="SUDAN">SUDAN</option>
                                                    <option value="SURINAME">SURINAME</option>
                                                    <option value="SVALBARD AND JAN MAYEN">SVALBARD AND JAN MAYEN</option>
                                                    <option value="SWAZILAND">SWAZILAND</option>
                                                    <option value="SWEDEN">SWEDEN</option>
                                                    <option value="SWITZERLAND">SWITZERLAND</option>
                                                    <option value="SYRIAN ARAB REPUBLIC">SYRIAN ARAB REPUBLIC</option>
                                                    <option value="TAIWAN, PROVINCE OF CHINA">TAIWAN, PROVINCE OF CHINA</option>
                                                    <option value="TAJIKISTAN">TAJIKISTAN</option>
                                                    <option value="TANZANIA, UNITED REPUBLIC OF">TANZANIA, UNITED REPUBLIC OF</option>
                                                    <option value="THAILAND">THAILAND</option>
                                                    <option value="TIMOR-LESTE">TIMOR-LESTE</option>
                                                    <option value="TOGO">TOGO</option>
                                                    <option value="TOKELAU">TOKELAU</option>
                                                    <option value="TONGA">TONGA</option>
                                                    <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
                                                    <option value="TUNISIA">TUNISIA</option>
                                                    <option value="TURKEY">TURKEY</option>
                                                    <option value="TURKMENISTAN">TURKMENISTAN</option>
                                                    <option value="TURKS AND CAICOS ISLANDS">TURKS AND CAICOS ISLANDS</option>
                                                    <option value="TUVALU">TUVALU</option>
                                                    <option value="UGANDA">UGANDA</option>
                                                    <option value="UKRAINE">UKRAINE</option>
                                                    <option value="UNITED ARAB EMIRATES">UNITED ARAB EMIRATES</option>
                                                    <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                                                    <option value="UNITED STATES">UNITED STATES</option>
                                                    <option value="UNITED STATES MINOR OUTLYING ISLANDS">UNITED STATES MINOR OUTLYING ISLANDS</option>
                                                    <option value="URUGUAY">URUGUAY</option>
                                                    <option value="UZBEKISTAN">UZBEKISTAN</option>
                                                    <option value="VANUATU">VANUATU</option>
                                                    <option value="VENEZUELA">VENEZUELA</option>
                                                    <option value="VIET NAM">VIET NAM</option>
                                                    <option value="VIRGIN ISLANDS, BRITISH">VIRGIN ISLANDS, BRITISH</option>
                                                    <option value="VIRGIN ISLANDS, U.S.">VIRGIN ISLANDS, U.S.</option>
                                                    <option value="WALLIS AND FUTUNA">WALLIS AND FUTUNA</option>
                                                    <option value="WESTERN SAHARA">WESTERN SAHARA</option>
                                                    <option value="YEMEN">YEMEN</option>
                                                    <option value="ZAMBIA">ZAMBIA</option>
                                                    <option value="ZIMBABWE">ZIMBABWE</option>
                                                </select>
                                                {editSchoolData.message && editSchoolData.message.country_of_institution && editSchoolData.message.country_of_institution[0] && (
                                                    <span className="text-danger">{editSchoolData.message.country_of_institution[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label> Name of institution <span className="red">*</span></label>
                                                <input placeholder="Enter Name of Institution..." value={editSchoolData.name_of_institution ? editSchoolData.name_of_institution : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, name_of_institution: e.target.value })} required="" />
                                                {editSchoolData.message && editSchoolData.message.name_of_institution && editSchoolData.message.name_of_institution[0] && (
                                                    <span className="text-danger">{editSchoolData.message.name_of_institution[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>Level of Education <span className="red">*</span></label>
                                                <select
                                                    name="level_of_education"
                                                    value={editSchoolData.level_of_education ? editSchoolData.level_of_education : ''}
                                                    onChange={(e) => setEditSchoolData({ ...editSchoolData, level_of_education: e.target.value })}
                                                >
                                                    <option value="">--- Select ---</option>
                                                    <option value="PG / Master's Degree">PG / Master's Degree</option>
                                                    <option value="Grade 10">Grade 10</option>
                                                    <option value="Foundation / Pre-U / A-level">Foundation / Pre-U / A-level</option>
                                                    <option value="Diploma">Diploma</option>
                                                    <option value="Post Graduate Certificate / Diploma">Post Graduate Certificate / Diploma</option>
                                                </select>
                                                {editSchoolData.message && editSchoolData.message.level_of_education && editSchoolData.message.level_of_education[0] && (
                                                    <span className="text-danger">{editSchoolData.message.level_of_education[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>Primary Language of Instruction <span className="red">*</span></label>
                                                <input name="primary_language_of_instruction" placeholder="Enter Primary Language of Instruction..." value={editSchoolData.primary_language_of_instruction ? editSchoolData.primary_language_of_instruction : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, primary_language_of_instruction: e.target.value })} required="" />
                                                {editSchoolData.message && editSchoolData.message.primary_language_of_instruction && editSchoolData.message.primary_language_of_instruction[0] && (
                                                    <span className="text-danger">{editSchoolData.message.primary_language_of_instruction[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>Attended Institution From <span className="red">*</span></label>
                                                <input type="date" name="attended_institution_from" value={editSchoolData.attended_institution_from ? editSchoolData.attended_institution_from : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, attended_institution_from: e.target.value })} placeholder="Select Date..." required="" />
                                                {editSchoolData.message && editSchoolData.message.attended_institution_from && editSchoolData.message.attended_institution_from[0] && (
                                                    <span className="text-danger">{editSchoolData.message.attended_institution_from[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>Attended Institution To <span className="red">*</span></label>
                                                <input type="date" name="attended_institution_to" value={editSchoolData.attended_institution_to ? editSchoolData.attended_institution_to : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, attended_institution_to: e.target.value })} placeholder="Select Date..." required="" />
                                                {editSchoolData.message && editSchoolData.message.attended_institution_to && editSchoolData.message.attended_institution_to[0] && (
                                                    <span className="text-danger">{editSchoolData.message.attended_institution_to[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>Degree Name <span className="red">*</span></label>
                                                <input name="degree_name" placeholder="Enter Degree Name..." value={editSchoolData.degree_name ? editSchoolData.degree_name : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, degree_name: e.target.value })} required="" />
                                                {editSchoolData.message && editSchoolData.message.degree_name && editSchoolData.message.degree_name[0] && (
                                                    <span className="text-danger">{editSchoolData.message.degree_name[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>Graduation Date
                                                    <span className="red">*</span>
                                                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={Graduation}><path fill-rule="evenodd" clip-rule="evenodd" d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg></label>
                                                <input type="date" value={editSchoolData.graduation_date ? editSchoolData.graduation_date : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, graduation_date: e.target.value })} placeholder="Select Date..." required="" />
                                                {editSchoolData.message && editSchoolData.message.graduation_date && editSchoolData.message.graduation_date[0] && (
                                                    <span className="text-danger">{editSchoolData.message.graduation_date[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>I have graduated from this institution <span className="red">*</span></label>
                                                <div className="d-flex">
                                                    <label className="checkCircle" style={{ marginTop: '10px' }}>
                                                        Yes
                                                        <input
                                                            type="radio"
                                                            value={1}
                                                            checked={editSchoolData.graduated_from_this === 1}
                                                            onChange={(e) => setEditSchoolData({ ...editSchoolData, graduated_from_this: parseInt(e.target.value) })}
                                                            name="graduated_from_this"
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <label className="checkCircle ml-3" style={{ marginTop: '10px' }}>
                                                        No
                                                        <input
                                                            type="radio"
                                                            value={0}
                                                            checked={editSchoolData.graduated_from_this === 0}
                                                            onChange={(e) => setEditSchoolData({ ...editSchoolData, graduated_from_this: parseInt(e.target.value) })}
                                                            name="graduated_from_this"
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    {editSchoolData.message && editSchoolData.message.graduated_from_this && editSchoolData.message.graduated_from_this[0] && (
                                                        <span className="text-danger">{editSchoolData.message.graduated_from_this[0]}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label style={{ marginTop: '0px' }}></label>
                                                <label className="checkRyt" style={{ marginTop: "0px" }}>I have the physical certificate for this degree
                                                    <input
                                                        type="checkbox"
                                                        name="have_physical_certificate"
                                                        checked={editSchoolData.have_physical_certificate}
                                                        onChange={(e) => setEditSchoolData({ ...editSchoolData, have_physical_certificate: e.target.checked })}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                                {editSchoolData.message && editSchoolData.message.have_physical_certificate && editSchoolData.message.have_physical_certificate[0] && (
                                                    <span className="text-danger">{editSchoolData.message.have_physical_certificate[0]}</span>
                                                )}

                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="col-md-12" style={{ marginTop: '40px' }}>
                                                <h3>Address Detail</h3>
                                            </div>
                                            <div className="col-md-3">
                                                <label>Address <span className="red">*</span></label>
                                                <input placeholder="Enter Address Here..." value={editSchoolData.address ? editSchoolData.address : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, address: e.target.value })} required="" />
                                                {editSchoolData.message && editSchoolData.message.address && editSchoolData.message.address[0] && (
                                                    <span className="text-danger">{editSchoolData.message.address[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>State<span className="red">*</span></label>
                                                <input placeholder="Enter State..." value={editSchoolData.state ? editSchoolData.state : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, state: e.target.value })} required="" />
                                                {editSchoolData.message && editSchoolData.message.state && editSchoolData.message.state[0] && (
                                                    <span className="text-danger">{editSchoolData.message.state[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label>City/Town <span className="red">*</span></label>
                                                <input placeholder="Enter City/Town..." value={editSchoolData.city ? editSchoolData.city : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, city: e.target.value })} required="" />
                                            </div>
                                      
                                            <div className="col-md-3">
                                                <label>Postal/Zip Code</label>
                                                <input placeholder="Enter Postal/Zip Code..." value={editSchoolData.zipcode ? editSchoolData.zipcode : ''} onChange={(e) => setEditSchoolData({ ...editSchoolData, zipcode: e.target.value })} required="" />
                                                {editSchoolData.message && editSchoolData.message.zipcode && editSchoolData.message.zipcode[0] && (
                                                    <span className="text-danger">{editSchoolData.message.zipcode[0]}</span>
                                                )}
                                            </div>
                                            <div className="col-md-12">
                                                {
                                                    isEditSchool ? (
                                                        <div>
                                                            <button type="submit" onClick={handleUpdateSchool} className="saveBtn">
                                                                Update
                                                            </button>

                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <button type="submit" onClick={handleAddSchool} className="saveBtn">
                                                                Save
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                <button className="cancelBtn">Cancel</button></div>
                                        </div>
                                    ) : ('')}
                                    <div className="row SchAtdResult">
                                        {studentSchool && studentSchool.map((update, index) => {
                                            return (
                                                <>
                                                    {update.message}
                                                    <div className="col-lg-4 mt-4" key={index}>
                                                        <h3>{update.country_of_institution}</h3>
                                                        <h4>{update.name_of_institution}</h4>
                                                    </div>
                                                    <div className="col-md-8 light mt-4 update-school">
                                                        <h3><svg role="img" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ fill: '#58BE91', marginRight: '5px' }}><path fill-rule="evenodd" clip-rule="evenodd" d="M19.707 6.293a1 1 0 010 1.414L9 18.414l-4.707-4.707a1 1 0 111.414-1.414L9 15.586l9.293-9.293a1 1 0 011.414 0z"></path></svg><b>Graduated from Institution</b> January 2, 2021</h3>
                                                        <h3><svg role="img" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ fill: '#58BE91', marginRight: '5px' }}><path fill-rule="evenodd" clip-rule="evenodd" d="M19.707 6.293a1 1 0 010 1.414L9 18.414l-4.707-4.707a1 1 0 111.414-1.414L9 15.586l9.293-9.293a1 1 0 011.414 0z"></path></svg><b>Level:</b> 3-Year Bachelors Degree</h3>
                                                        <div className="col-lg-6">
                                                            <h3><b>{update.level_of_education}</b></h3>
                                                            <h3>{update.primary_language_of_instruction}</h3>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <p>{update.attended_institution_from}, {update.attended_institution_to}, {update.degree_name} ,{update.graduated_from_this}</p>
                                                            <p>{update.graduation_date}</p>
                                                            <p>{update.have_physical_certificate}</p>
                                                            <p>{update.study_mode}</p>
                                                            <h3><b>{update.address}: {update.city},{update.state},{update.zipcode}</b></h3><br />
                                                            <p>{update.created_at}</p>
                                                            <p>{update.updated_at}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">

                                                        <button type="button" className="saveBtn" onClick={() => handleSchoolEdit(update)}>Update</button>
                                                        <button type="button" className="deleteBtn" onClick={() => handleDelete(update.id)}>Delete</button>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </form>
                            </div>
                            <div className="infoContent" id="TestScores">
                                <form onSubmit={testScoreSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2>Test <span className="headingsmall"> Score</span></h2>
                                        </div>
                                        <div className="col-md-2">
                                            <label>English Exam Type</label>
                                            <select name="" value={testscore.english_exam_type} onChange={(e) => setTestScore({ ...testscore, english_exam_type: e.target.value })} >
                                                <option value="I don't have this">I don't have this</option>
                                                <option value="I will provide this leter">I will provide this leter</option>
                                                <option value="TOEFL">TOEFL</option>
                                                <option value="IELTS">IELTS</option>
                                                <option value="Duolingo English Test">Duolingo English Test</option>
                                                <option value="PTE">PTE</option>
                                            </select>
                                            {testscore.message && testscore.message.english_exam_type && testscore.message.english_exam_type[0] && (
                                                <span className="text-danger">{testscore.message.english_exam_type[0]}</span>
                                            )}

                                        </div>
                                        {testscore.english_exam_type === 'TOEFL' && (
                                            <>

                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Listening</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="listening_score"
                                                        placeholder="Enter Exact Score Listening"
                                                        value={testscore.listening_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, listening_score: e.target.value })}

                                                    />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Reading</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="reading_score"
                                                        placeholder="Enter Exact Score Reading"
                                                        value={testscore.reading_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, reading_score: e.target.value })}

                                                    />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Writing</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="writing_score"
                                                        placeholder="Enter Exact Score Writing"
                                                        value={testscore.writing_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, writing_score: e.target.value })}

                                                    />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Speaking</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="speaking_score"
                                                        placeholder="Enter Exact Score Speaking"
                                                        value={testscore.speaking_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, speaking_score: e.target.value })}

                                                    />
                                                </div>
                                            </>
                                        )}
                                        {testscore.english_exam_type === 'IELTS' && (
                                            <>
                                                <div className="col-md-2 allfh">
                                                    <label>Date of Exam</label>
                                                    <input
                                                        type="date"
                                                        className="pif"
                                                        name="date_of_exam"
                                                        value={testscore.date_of_exam}
                                                        onChange={(e) => setTestScore({ ...testscore, date_of_exam: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Listening</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="listening_score"
                                                        placeholder="Enter Exact Score Listening"
                                                        value={testscore.listening_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, listening_score: e.target.value })} />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Reading</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="reading_score"
                                                        placeholder="Enter Reading Score"
                                                        value={testscore.reading_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, reading_score: e.target.value })} />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Writing</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="writing_score"
                                                        placeholder="Enter Exact Score Writing"
                                                        value={testscore.writing_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, writing_score: e.target.value })} />
                                                </div>

                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Speaking</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="speaking_score"
                                                        placeholder="Enter Exact Score Speaking"
                                                        value={testscore.speaking_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, speaking_score: e.target.value })}

                                                    />
                                                </div>
                                            </>
                                        )}
                                        {testscore.english_exam_type === 'Duolingo English Test' && (
                                            <>
                                                <div className="col-md-2 allfh">
                                                    <label>Date of Exam</label>
                                                    <input
                                                        type="date"
                                                        className="pif"
                                                        name="date_of_exam"
                                                        value={testscore.date_of_exam}
                                                        onChange={(e) => setTestScore({ ...testscore, date_of_exam: e.target.value })}
                                                    />
                                                </div>

                                            </>
                                        )}
                                        {testscore.english_exam_type === 'PTE' && (
                                            <>
                                                <div className="col-md-2 allfh">
                                                    <label>Date of Exam</label>
                                                    <input
                                                        type="date"
                                                        className="pif"
                                                        name="date_of_exam"
                                                        value={testscore.date_of_exam}
                                                        onChange={(e) => setTestScore({ ...testscore, date_of_exam: e.target.value })} />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Listening</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="listening_score"
                                                        placeholder="Enter Exact Score Listening"
                                                        value={testscore.listening_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, listening_score: e.target.value })} />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Reading</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="reading_score"
                                                        placeholder="Enter Exact Score Reading"
                                                        value={testscore.reading_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, reading_score: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Writing</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="writing_score"
                                                        placeholder="Enter Exact Score Writing"
                                                        value={testscore.writing_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, writing_score: e.target.value })}

                                                    />
                                                </div>
                                                <div className="col-md-2 allfh testpartsdiv">
                                                    <label>Speaking</label>
                                                    <input
                                                        type="number"
                                                        className="pif"
                                                        name="speaking_score"
                                                        placeholder="Enter Exact Score Speaking"
                                                        value={testscore.speaking_score}
                                                        step="any"
                                                        min="0"
                                                        max="30"
                                                        onChange={(e) => setTestScore({ ...testscore, speaking_score: e.target.value })}
                                                    />
                                                </div>


                                            </>

                                        )}
                                        <div className="col-md-12">
                                            <button type="submit" className="saveBtn">Save</button>
                                            <button className="cancelBtn">Cancel</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            {/* <div className="infoContent" id="TestScores">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2>Neet Score</h2>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Neet Exam Type</label>
                                            <select name="">
                                                <option >I don't have this</option>
                                                <option >I will provide this leter</option>
                                                <option >Neet Score</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Date of Exam</label>
                                            <input type="date" placeholder="Select Date..." required="" />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Enter  Score</label>
                                            <input type="number" placeholder="Enter" required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <p style={{ fontSize: '16px', marginTop: '15px' }}>Note: You will be able to apply for conditional admission by enrolling in an ESL program if the academic program does not accept delayed submission of English Language Proficiency scores.</p></div>
                                        <div className="col-md-12">
                                            <button type="submit" className="saveBtn">Save</button>
                                            <button className="cancelBtn">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div> */}



                            <div className="infoContent" id="BackInfo">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2>Background <span className="headingsmall"> Information </span></h2>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="refused_visa">Have you been refused a visa from Canada, USA, UK, Australia more...? <i className="fa fa-info-circle" title=""></i> <span className="red">*</span></label>
                                            <select id="refused_visa" value={background.refused_visa} onChange={(e) => setBackground({ ...background, refused_visa: e.target.value })}>
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                            
                                            {backendError.message && backendError.message.refused_visa && backendError.message.refused_visa[0] && (
                                                <span className="text-danger">{backendError.message.refused_visa[0]}</span>
                                            )}

                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="valid_study_permit">Do you have a valid Study Permit / Visa?<i className="fa fa-info-circle" title=""></i> <span className="red">*</span></label>
                                            <select id="valid_study_permit" value={background.valid_study_permit} onChange={(e) => setBackground({ ...background, valid_study_permit: e.target.value })}>
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                            {backendError.message && backendError.message.valid_study_permit && backendError.message.valid_study_permit[0] && (
                                                <span className="text-danger">{backendError.message.valid_study_permit[0]}</span>
                                            )}
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <textarea id="visa_note" placeholder="Provide details..." value={background.visa_note} onChange={(e) => setBackground({ ...background, visa_note: e.target.value })} required="" rows="3"></textarea>
                                            {backendError.message && backendError.message.visa_note && backendError.message.visa_note[0] && (
                                                <span className="text-danger">{backendError.message.visa_note[0]}</span>
                                            )}
                                        </div>
                                        <input
                                            type="hidden"
                                            placeholder="Passport Expiry Date"
                                            value={students.id}
                                            onChange={(e) => setStudents({ ...students, id: e.target.value })}
                                        />

                                        <div className="col-md-12">
                                            <button type="button" className="saveBtn" onClick={updateBackground}>Save</button>
                                            <button type="button" className="cancelBtn">Cancel</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="infoContent" id="UploadDoc">
                                <h2>Upload <span className="headingsmall"> Documents</span></h2>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="slogan mt-2 mb-2" style={{ marginTop: "10px" }}>
                                                    The acceptable formats of the photocopy are .PDF, .JPEG or .PNG
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="input-group b-0 image-preview mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Document Name"
                                                        value={document_name}
                                                        className="image-preview-filename"
                                                        onChange={(e) => setDocumentName(e.target.value)}
                                                    />
                                                    <span className="input-group-btn">
                                                        <div className="saveBtn image-preview-input">
                                                            <span className="fa fa-folder-open"></span>
                                                            <span className="image-preview-input-title">Browse</span>
                                                            <input type="file" onChange={handleDocumentChange} />
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="saveBtn">Save</button>
                                                <button type="button" className="cancelBtn">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="infoContent" id="DocumentList">
                                <h2>Uploaded <span className="headingsmall"> Documents </span></h2>
                                <div className="row">
                                    <div className="col-md-12 mt-4" >
                                        <div className="document-card">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="equal-width">S.N.</th>
                                                        <th>Doc Name</th>
                                                        <th>Date</th>
                                                        <th>File</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {documents.map((doc, index) => (
                                                        <tr key={index}>
                                                            <th scope="row" className="equal-width">{index + 1}</th>
                                                            <th scope="col">{doc.document_name}</th>
                                                            <th scope="col">{doc.created_at}</th>
                                                            <td className="equal-width">
                                                                <button
                                                                    onClick={() => window.open(`https://www.backend.lvoverseas.com/${doc.file_path}`, '_blank')}
                                                                    className="cancelBtn m-2"
                                                                >
                                                                    View
                                                                </button>
                                                                <button className="saveBtn m-2"
                                                                    onClick={() => downloadImage(`https://cors-anywhere.herokuapp.com/https://www.backend.lvoverseas.com/${doc.file_path}`)}>
                                                                    Download
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <style jsx>{`
        .low-font-weight {
          font-weight: 400;
        }
        .equal-width {
          width: 33.66%;
        }
        .font-weight {
        font-weight: 600;
             }
        .table th, .table td {
          text-align: left; 
        }
        .table tr th, .table tr td {
        border-color: #e3ecf5 !important;
        width: 10px;
    }
      `}</style>
        </>
    )
};
export default Student_profile;