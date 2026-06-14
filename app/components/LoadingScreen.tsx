"use client";

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show loading screen for 800ms, then start fading out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 800);

    // Completely remove loading screen from DOM after fade animation (500ms)
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo-glow">
          <div className="loading-spinner-ring"></div>
        </div>
        <h1 className="loading-text-title">St. Benedict's College</h1>
        <h2 className="loading-text-sub">Data Collection Portal</h2>
        <div className="loading-power">Powered by SBC Media</div>
      </div>
    </div>
  );
}
