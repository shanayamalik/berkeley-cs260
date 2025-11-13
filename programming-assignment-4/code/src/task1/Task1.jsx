import { useState } from "react";

export default function Task1() {
  const [subjectField, setSubjectField] = useState("");
  const [bodyField, setBodyField] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggest = async () => {
    // Don't proceed if body is empty
    if (!bodyField.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://noggin.rea.gent/compulsory-primate-3187", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer rg_v1_oxjm5fxi94o6k8i069oexk0ibhpmlc002gex_ngk",
        },
        body: JSON.stringify({ email: bodyField }),
      });

      const data = await response.text();
      setSubjectField(data);
    } catch (error) {
      console.error("Error generating subject line:", error);
      // Optionally, you could set an error state here to show to the user
    } finally {
      setIsLoading(false);
    }
  };

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
          onClick={handleSuggest}
          disabled={isLoading || !bodyField.trim()}
        >
          {isLoading ? "Generating..." : "Suggest"}
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
