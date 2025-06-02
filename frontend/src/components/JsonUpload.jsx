import React, { useState } from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

const JsonUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a JSON file.");
      return;
    }
    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setError("Only JSON files are allowed.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${baseURL}/api/upload/full`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errMsg;
        try {
          const err = await res.json();
          errMsg = err.error || "Upload failed";
        } catch {
          errMsg = await res.text();
        }
        throw new Error(errMsg);
      }

      await res.json();
      setSuccess("JSON uploaded successfully!");
      onUploadSuccess(); // Refresh dashboard data
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <Form.Group controlId="jsonFile" className="mb-3">
        <Form.Label>Upload JSON file to load initial data</Form.Label>
        <Form.Control type="file" accept=".json,application/json" onChange={handleFileChange} />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
      <Button type="submit" disabled={uploading}>
        {uploading ? (
          <>
            <Spinner animation="border" size="sm" /> Uploading...
          </>
        ) : (
          "Upload JSON"
        )}
      </Button>
    </Form>
  );
};

export default JsonUpload;
