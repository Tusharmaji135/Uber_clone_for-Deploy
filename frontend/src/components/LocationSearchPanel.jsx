import React from "react";

function LocationSearchPanel({ suggestions, onSuggestionClick, setPanelOpen }) {
  return (
    <div>
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            onSuggestionClick(suggestion);
            setPanelOpen(true)
          }}
          className="flex items-center border-gray-200 active:border-black border-2 p-3 rounded-2xl justify-start gap-4 my-2"
        >
          <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-line text-xl"></i>
          </h2>
          <h4 className="font-medium">{suggestion.description || "Unknown location"}</h4>


        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
