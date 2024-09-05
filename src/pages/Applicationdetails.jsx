import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';

const Popup = ({ content, onClose }) => (
  <div className="popup-overlay" onClick={onClose}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={onClose}>X</button>
      <div>{content}</div>
    </div>
  </div>
);

const ApplicationDetails = () => {
  const [activeComponent, setActiveComponent] = useState('applied');
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [applicationNotes, setApplicationNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[4];
    const token = pathParts[5];
    if (id) setId(id);
    if (token) setToken(token);
  }, []);

  const url = "https://www.backend.lvoverseas.com/api/";

  const fetchApplicationData = async () => {
    if (!id || !token) return;

    try {
      setLoading(true);
      const response = await fetch(`${url}student/application-details/${id}/${token}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setApplicationDetails(data);
      const notesResponse = await fetch(`${url}student/notes/${id}/${token}`);
      if (notesResponse.ok) {
        const notesData = await notesResponse.json();
        setApplicationNotes(notesData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    
    }
  };

  useEffect(() => {
    fetchApplicationData();
   
  }, [id, token]);

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleViewMore = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const handleClickMore = () => {
    setShowFormPopup(true);
  };

  const downloadImage = (ImageUrl) => {
    saveAs(ImageUrl, 'image.jpg');
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setShowFormPopup(false);
  };

  const FormPopup = ({ onClose, onSubmit }) => {
    const [subject, setSubject] = useState('');
    const [message_note, setMessage_note] = useState('');
    const [file, setFile] = useState(null);
    const [dataId, setDataId] = useState(applicationNotes.length > 0 ? applicationNotes[0].id : '');

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('application_id', id);
      formData.append('token', token);
      formData.append('subject', subject);
      formData.append('message_note', message_note);
      formData.append('file', file);
      formData.append('dataId', dataId);

      try {
        const response = await fetch(`${url}student/add-note`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(result.message);
          onSubmit(result);
          onClose();
         
        } else {
          console.error('Failed to add note');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={onClose}>X</button>
          <form onSubmit={handleSubmit}>
            {message && <div className="message">{message}</div>}
            <div className="form-group">
              <input type="hidden" value={id} readOnly />
            </div>
            <div className="form-group">
              <input type="hidden" value={dataId} readOnly />
            </div>
            <div className="form-group">
              <input type="hidden" value={token} readOnly />
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea
                value={message_note}
                onChange={(e) => setMessage_note(e.target.value)}
                rows="4"
                cols="50"
              />
            </div>
            <div className="form-group">
              <label>File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="saveBtn m-2">Submit</button>
          </form>
        </div>
      </div>
    );
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
                      <Link to="/student" onClick={() => handleNavigation('profile')}>
                        <i className="ti-user"></i>My Profile
                      </Link>
                    </li>
                    <li className={activeComponent === 'applied' ? 'active' : ''}>
                      <Link to="/student/applied" onClick={() => handleNavigation('applied')}>
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
            <div className="col-lg-9 p-3 bg-white">
              <button className="saveBtn m-2" onClick={handleClickMore }>Add Note</button>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : applicationDetails ? (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className=" equal-width">Date</th>
                        <th className=" equal-width">University Name</th>
                        <th className=" equal-width">Country Name</th>
                        <th className=" equal-width">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-weight equal-width">{new Date(applicationDetails.created_at).toLocaleString()}</td>
                        <td className="font-weight equal-width">{applicationDetails.college?.name}</td>
                        <td className="font-weight equal-width">{applicationDetails.college?.country}</td>
                        <td className={`font-weight equal-width  ${applicationDetails.status?.status}`}>
                          {applicationDetails.status?.status}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {applicationNotes.length > 0 && applicationNotes.map((notes, index) => (
                    <table className="table" key={index}>
                   
                      <thead>
                        <tr>
                          <th>Sr.No</th>
                          <th>Sender</th>
                          <th>Date</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>File</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className=" equal-width">{index + 1}</td>
                          <td className=" equal-width">{notes.sender}</td>
                          <td className=" equal-width">{new Date(notes.created_at).toLocaleString()}</td>
                          <td className=" equal-width">{notes.subject}</td>
                     
                          <td>
                            <button className="view-btn m-2" onClick={() => handleViewMore(notes.message_note)}>View</button>
                          </td>
                        
                          <td className="equal-width">
                            <div className="button-container">
                              <button
                                onClick={() => window.open(`https://www.backend.lvoverseas.com/${notes.file_path}`, '_blank')}
                                className="cancelBtn m-2"
                              >
                                View
                              </button>
                              <button className="saveBtn m-2"
                                onClick={() => downloadImage(`https://www.backend.lvoverseas.com/${notes.file_path}`)}>
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </>
              ) : (
                <div>No application details available</div>
              )}
            </div>
            
          </div>
        </div>
      </section>
      <Footer />
      {showPopup && (
        <Popup content={popupContent} onClose={() => setShowPopup(false)} />
      )}
      {showFormPopup && (
        <FormPopup onClose={() => setShowFormPopup(false)} onSubmit={handleFormSubmit} />
      )}
      <style jsx>{`
        .message {
          color: green;
          padding: 10px;
          border: 1px solid green;
          border-radius: 5px;
          background-color: #f0f0f0;
        }
        Footer {
        background-color: #383838;
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 80%;
          max-width: 500px;
          position: relative;
          height: auto;
          overflow: auto;
        }
        .view-btn {
          background: #ffffff;
          border: none;
          text-color: #FFF;
          color: #466bb2;
          border-radius: 0px;
          border: solid 1px;
        }
        .view-btn:hover {
          background: #466bb2;
          color: #fff;
        }
        .popup-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: red;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
        textarea {
          width: 100%;
        }
        .equal-width {
          width: 20.66%;
        }
        .font-weight {
          font-weight: 400;
        }
        .table th, .table td {
          text-align: left;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        .button-container {
          display: flex;
          gap: 10px;
        }
          table th {
            padding: 12px 0 12px 8px;
            text-align: left;
            background-color: #252c41!important;
            color: #fff!important;
        }
        .table tr th, .table tr td {
          border-color: #d3d3d3 !important;
          padding: 6px 12px;
          background:#f1f1f1;
      }
      `}</style>
    </>
  );
};

export default ApplicationDetails;
