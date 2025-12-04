/**
 * KarmaAI Component - Floating AI Assistant Button
 * 
 * This component renders a fixed floating button in the bottom-right corner.
 * It represents the AI assistant chatbot feature and is visible on all pages.
 * Currently displays only the button; click functionality can be added later.
 */

// Import React library
import React from 'react';

/**
 * KarmaAI functional component
 * Renders a floating circular button with a chat icon
 */
const KarmaAI = () => {
  return (
    // Floating button container
    // fixed - positioned relative to viewport, not document flow
    // bottom-8 - 2rem from bottom of screen
    // right-8 - 2rem from right side of screen
    // w-[60px] h-[60px] - exact 60x60 pixel dimensions
    // rounded-full - fully rounded to create circle
    // bg-primary - uses primary brand color (blue)
    // text-white - white icon color for contrast
    // flex items-center justify-center - centers content both vertically and horizontally
    // shadow-lg - large shadow for depth/elevation
    // cursor-pointer - shows pointer cursor on hover
    // z-[99] - high z-index to appear above most other content
    <div className="fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer z-[99]">
      {/* SVG icon representing chat/AI assistant */}
      <svg
        className="w-[30px] h-[30px]"  // Icon dimensions - 30x30 pixels
        fill="currentColor"              // Use the current text color (white from parent)
        viewBox="0 0 24 24"              // SVG viewport size
        xmlns="http://www.w3.org/2000/svg" // SVG namespace
      >
        {/* Path data - defines the chat bubble icon shape */}
        {/* Creates a rectangular chat bubble with horizontal lines inside */}
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm4 11h8V13H8v2zm0-3h8V10H8v2z"></path>
      </svg>
    </div>
  );
};

// Export KarmaAI component as default export
export default KarmaAI;
