import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import Layoutprop from "./Layoutprop";
import Footer from "../visiteur/Footer";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    photo: null, // L'image sera stockée en tant que fichier
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const [editingField, setEditingField] = useState(null);

  const handleUpdate = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
    setEditingField(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Vérifiez si un fichier est sélectionné
    if (file) {
      // Utilisez FileReader pour convertir l'image sélectionnée en URL de données
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderField = (field, label) => {
    return (
      <div className="mb-3">
        <label htmlFor={field} className="form-label">
          {label}
        </label>
        <div className="d-flex">
          {field === "photo" ? (
            <img
              src={userInfo[field]}
              alt="Profile"
              className="img-thumbnail me-3"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ) : (
            <div className="me-3">{userInfo[field]}</div>
          )}
          {editingField !== field && (
            <button
              className="btn btn-warning"
              onClick={() => setEditingField(field)}
            >
              <BiPencil /> Edit
            </button>
          )}
        </div>
        {editingField === field && (
          <div className="mt-2">
            {field === "photo" ? (
              <input
                type="file"
                id={field}
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            ) : (
              <input
                type="text"
                id={field}
                className="form-control"
                value={userInfo[field]}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [field]: e.target.value })
                }
              />
            )}
            <div className="mt-2">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(field, userInfo[field])}
              >
                Update
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setEditingField(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Layoutprop />
      <div className="container mt-5">
        <h2>Home Page</h2>
        <div className="card">
          <div className="card-body">
            {renderField("username", "Username")}
            {renderField("photo", "Photo")}
            {renderField("bio", "Biography")}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
