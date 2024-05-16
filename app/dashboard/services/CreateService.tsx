"use client";
import { createService, updateService } from "@/lib/db/serviceCrud";
import React, { useState } from "react";

const CreateService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    service_desc: "",
    service_image: "No image",
    service_type: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createService(formData);
    setFormData({
      service_name: "",
      service_desc: "",
      service_image: "No image",
      service_type: "",
    });
    window.location.href = "/dashboard/services";
  };

  return (
    <div>
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Service Name:</label>
          <input
            type="text"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Service Description:</label>
          <textarea
            name="service_desc"
            value={formData.service_desc}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label>Service Type:</label>
          <select
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Repair service">Repair service</option>
            <option value="General service">General service</option>
          </select>
        </div>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default CreateService;
