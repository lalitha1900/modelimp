
import React, { useState } from "react";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Please enter your username.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email. Please check your email address.";
      isValid = false;
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Please enter your date of birth.";
      isValid = false;
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "Invalid date of birth. Please enter a valid date.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      alert("Form submitted successfully!");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({
      username: "",
      email: "",
      dob: "",
      phone: "",
    });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Modal Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
