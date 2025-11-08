import { useState } from "react";

export default function Task1() {
  const [subjectField, setSubjectField] = useState("");
  const [bodyField, setBodyField] = useState("");

  return (
    <div>
      <h1>Compose email</h1>
      <h2>Subject</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Email subject"
          aria-label="Email subject"
          value={subjectField}
          onChange={(e) => setSubjectField(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          type="button"
        >
          Suggest
        </button>
      </div>
      <h2>Body</h2>
      <textarea
        className="form-control"
        rows="5"
        value={bodyField}
        onChange={(e) => setBodyField(e.target.value)}
      ></textarea>
    </div>
  );
}
