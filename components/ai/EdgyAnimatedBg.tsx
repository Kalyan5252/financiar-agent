import React from 'react';
import styled, { keyframes } from 'styled-components';

// 🎨 Keyframe Animation for the Gradient Movement
const gradientAnimation = keyframes`
  0% {
    transform: translate(-20%, -20%) scale(1);
    border-radius: 60% 40% 40% 60% / 70% 30% 70% 30%;
  }
  25% {
    transform: translate(10%, 10%) scale(1.1);
    border-radius: 40% 60% 60% 40% / 30% 70% 30% 70%;
  }
  50% {
    transform: translate(20%, -10%) scale(0.95);
    border-radius: 70% 30% 50% 50% / 50% 50% 50% 50%;
  }
  75% {
    transform: translate(-10%, 20%) scale(1.05);
    border-radius: 30% 70% 70% 30% / 60% 40% 60% 40%;
  }
  100% {
    transform: translate(-20%, -20%) scale(1);
    border-radius: 60% 40% 40% 60% / 70% 30% 70% 30%;
  }
`;

// 💅 Styled Component for the Animated Sphere
const AnimatedSphere = styled.div`
  /* --- Size and Shape --- */
  width: 300px;
  height: 300px;
  border-radius: 50%; /* Initial sphere shape */

  /* --- The Edgy Gradient Colors (Approximating your image) --- */
  background: radial-gradient(
    circle at 50% 50%,
    /* Core Lightness / Peach */ rgba(255, 204, 189, 0.9) 0%,
    /* Middle Warm / Pink-Orange */ rgba(255, 128, 114, 0.8) 40%,
    /* Outer Edges / Purple-Blue */ rgba(150, 60, 250, 0.7) 70%,
    /* Deepest Violet/Blue */ rgba(30, 0, 100, 0.5) 100%
  );

  /* --- Positioning (Optional, for full background) --- */
  position: absolute;
  top: 50%;
  left: 50%;
  /* Centers the sphere */
  transform: translate(-50%, -50%);

  /* --- The Animation --- */
  animation: ${gradientAnimation} 20s ease-in-out infinite alternate;

  /* Smooths the movement */
  will-change: transform, border-radius;
  filter: blur(40px); /* Creates the soft, ethereal, glowing effect */
`;

// 🎁 The Main Component
const EdgyAnimatedBackground = () => {
  return (
    // A container to hold the floating element.
    // You might want to position this for your whole page.
    <BackgroundContainer>
      <AnimatedSphere />
      {/* You can add more spheres for a richer background */}
      <AnimatedSphere
        style={{
          width: '150px',
          height: '150px',
          top: '10%',
          left: '80%',
          animationDuration: '15s',
          filter: 'blur(30px)',
        }}
      />
      <AnimatedSphere
        style={{
          width: '150px',
          height: '150px',
          top: '10%',
          left: '0%',
          animationDuration: '15s',
          filter: 'blur(30px)',
        }}
      />
      <AnimatedSphere
        style={{
          width: '150px',
          height: '150px',
          top: '100%',
          left: '0%',
          animationDuration: '15s',
          filter: 'blur(80px)',
        }}
      />
      <AnimatedSphere
        style={{
          width: '150px',
          height: '150px',
          top: '10%',
          left: '0%',
          animationDuration: '15s',
          filter: 'blur(30px)',
        }}
      />
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  /* Occupy the whole viewport */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Ensure content sits above the background */
  z-index: -1;
  /* Fallback or base color */
  background-color: #0d001a;
  overflow: hidden; /* Hide the parts of the animated element that move off screen */
`;

export default EdgyAnimatedBackground;
