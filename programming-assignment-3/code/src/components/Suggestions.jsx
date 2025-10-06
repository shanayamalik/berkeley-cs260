import React from 'react';
import { SUGGESTIONS } from '../data/suggestions';

function Suggestions({ bagType, onAcceptSuggestion, acceptedSuggestions = [] }) {
  const suggestions = SUGGESTIONS[bagType] || [];
  
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="suggestions-container">
      <h4 className="suggestions-title">Suggested items:</h4>
      <div className="suggestions-list">
        {suggestions.map((suggestion) => {
          const isAccepted = acceptedSuggestions.includes(suggestion.id);
          
          if (isAccepted) {
            return null; // Don't show accepted suggestions
          }

          return (
            <div key={suggestion.id} className="suggestion-item">
              <div className="suggestion-info">
                <span className="suggestion-name">{suggestion.name}</span>
                <span className="suggestion-weight">{suggestion.weight} {suggestion.unit}</span>
              </div>
              <div className="suggestion-actions">
                <button
                  className="accept-button"
                  onClick={() => onAcceptSuggestion(suggestion)}
                  title="Accept suggestion"
                >
                  ✓
                </button>
                <button
                  className="decline-button"
                  onClick={() => onAcceptSuggestion({ ...suggestion, decline: true })}
                  title="Decline suggestion"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Suggestions;
