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
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Compose Email
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
          Write your email and let AI suggest a subject line
        </p>
      </div>

      {/* Subject Field */}
      <div style={{ marginBottom: '2rem' }}>
        <label 
          htmlFor="subject-input" 
          style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            marginBottom: '0.5rem',
            color: '#374151'
          }}
        >
          Subject
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="subject-input"
            type="text"
            placeholder="Enter email subject"
            value={subjectField}
            onChange={(e) => setSubjectField(e.target.value)}
            style={{
              flex: 1,
              padding: '0.625rem 0.875rem',
              fontSize: '0.9375rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleSuggest}
            disabled={isLoading || !bodyField.trim()}
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: isLoading || !bodyField.trim() ? '#9ca3af' : '#3b82f6',
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: isLoading || !bodyField.trim() ? '#e5e7eb' : '#3b82f6',
              borderRadius: '0.375rem',
              cursor: isLoading || !bodyField.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && bodyField.trim()) {
                e.target.style.backgroundColor = '#eff6ff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && bodyField.trim()) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {isLoading ? "Generating..." : "Suggest"}
          </button>
        </div>
      </div>

      {/* Body Field */}
      <div>
        <label 
          htmlFor="body-input" 
          style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            marginBottom: '0.5rem',
            color: '#374151'
          }}
        >
          Email Body
        </label>
        <textarea
          id="body-input"
          rows="10"
          placeholder="Write your email here..."
          value={bodyField}
          onChange={(e) => setBodyField(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 0.875rem',
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
