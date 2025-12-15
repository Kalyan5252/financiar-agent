import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import MeshBackground from './MeshBackground';
import Grain from './Grain';
import AnimatedSphere from './AnimatedSphere';
import helloGlow from './HelloGlow';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const floatBlob = keyframes`
  0% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.03) translate(6px, -8px);
  }
  100% {
    transform: scale(1) translate(0, 0);
  }
`;

export const BackgroundWrapper = styled.div<{
  $expanded: boolean;
  $hello: boolean;
}>`
  position: relative;
  z-index: 0;
  overflow: hidden;
  cursor: pointer;

  width: ${({ $expanded }) => ($expanded ? '100%' : '36vh')};
  height: ${({ $expanded }) => ($expanded ? '100%' : '36vh')};
  border-radius: ${({ $expanded }) => ($expanded ? '16px' : '50%')};

  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  background: linear-gradient(
    120deg,
    rgba(50, 200, 205, 1),
    rgba(227, 2, 62, 1),
    rgba(249, 208, 129, 0.7),
    rgba(49, 128, 135, 1),
    rgba(133, 90, 255, 1)
  );

  background-size: 300% 300%;
  animation: ${gradientShift} 2s ease infinite,

  filter: saturate(120%);

  box-shadow: ${({ $hello }) =>
    $hello
      ? `
      0 0 -40px rgba(56, 189, 248, 0.5),
      0 0 -80px rgba(168, 85, 247, 0.45),
      0 0 -120px rgba(244, 114, 182, 0.35)
    `
      : 'none'};

animation:
  ${({ $hello }) => ($hello ? helloGlow : 'none')} 3.5s ease-in-out infinite;
`;

export default function Background({
  children,
  expanded,
  setExpanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <BackgroundWrapper
      $expanded={expanded}
      onClick={() => setExpanded((prev) => !prev)}
      $hello={expanded}
      className="text-center flex justify-center items-center overflow-hidden"
    >
      {children}
      <MeshBackground />
      <Grain />
      <AnimatedSphere
        variant="warm"
        style={{
          width: '260px',
          height: '260px',
          top: '5%',
          left: '70%',
          animationDuration: '4s',
          filter: 'blur(35px)',
        }}
      />

      <AnimatedSphere
        variant="cool"
        style={{
          width: '320px',
          height: '320px',
          top: '40%',
          left: '10%',
          animationDuration: '10s',
          filter: 'blur(45px)',
        }}
      />

      <AnimatedSphere
        variant="violet"
        style={{
          width: '280px',
          height: '280px',
          top: '65%',
          left: '60%',
          animationDuration: '8s',
          filter: 'blur(40px)',
        }}
      />
    </BackgroundWrapper>
  );
}
