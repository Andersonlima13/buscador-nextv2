// components/AddStudentModal.jsx
"use client"
import React, { useState } from "react";
import { GenericModal } from "./GenericModal";
import { FiSave } from "react-icons/fi";

export const AddStudentModal = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registration: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Novo Aluno"
      footerActions={
        <button onClick={handleSubmit}>
          <FiSave /> Salvar
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nome:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Matrícula:</label>
          <input 
            type="text" 
            name="registration"
            value={formData.registration}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </GenericModal>
  );
};