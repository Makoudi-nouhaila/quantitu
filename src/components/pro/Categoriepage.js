import React, { useState, useEffect } from "react";
import Layoutprop from "./Layoutprop";
import Footer from "../visiteur/Footer";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/blog/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await fetch("http://localhost:8080/blog/categorie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom: newCategoryName }),
      });

      setNewCategoryName("");
      setShowAddModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await fetch(`http://localhost:8080/blog/categorie`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedCategoryId, nom: newCategoryName }),
      });

      setNewCategoryName("");
      setShowUpdateModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await fetch(`http://localhost:8080/blog/categorie/${selectedCategoryId}`, {
        method: "DELETE",
      });

      setSelectedCategoryId(null);
      setShowDeleteModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
    <Layoutprop/>
    <div className="container mt-5">
      <h2>Category Page</h2>

      {/* Add Category Modal */}
      <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: showAddModal ? "block" : "none" }}
        >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
              <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
            </div>
            <div className="modal-body">
              <label htmlFor="newCategoryName">Category Name:</label>
              <input type="text" id="newCategoryName" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleAddCategory}>Add</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Category Modal */}
      <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: showUpdateModal ? "block" : "none" }}
        >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Category</h5>
              <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
            </div>
            <div className="modal-body">
              <label htmlFor="newCategoryName">Category Name:</label>
              <input type="text" id="newCategoryName" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleUpdateCategory}>Update</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Category Modal */}
      <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: showDeleteModal ? "block" : "none" }}
        >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Category</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this category?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDeleteCategory}>Delete</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add</button>
      </div>

      <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.nom}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setNewCategoryName(category.nom);
                      setShowUpdateModal(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CategoryPage;
