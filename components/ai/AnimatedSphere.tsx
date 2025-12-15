import styled, { keyframes, css } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    transform: translate(-40%, -20%) scale(1);
    border-radius: 60% 40% 40% 60% / 70% 30% 70% 30%;
  }
  25% {
    transform: translate(30%, 10%) scale(1.1);
    border-radius: 40% 60% 60% 40% / 30% 70% 30% 70%;
  }
  50% {
    transform: translate(40%, -10%) scale(0.95);
    border-radius: 70% 30% 50% 50% / 50% 50% 50% 50%;
  }
  75% {
    transform: translate(-10%, 20%) scale(1.05);
    border-radius: 30% 70% 70% 30% / 60% 40% 60% 40%;
  }
  100% {
    transform: translate(-50%, -20%) scale(1);
    border-radius: 60% 40% 40% 60% / 70% 30% 70% 30%;
  }
`;

const gradientVariants = {
  warm: css`
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 204, 189, 0.9) 0%,
      rgba(255, 128, 114, 0.8) 40%,
      rgba(227, 2, 62, 0.7) 70%,
      rgba(80, 0, 30, 0.5) 100%
    );
  `,
  cool: css`
    background: radial-gradient(
      circle at 50% 50%,
      rgba(160, 240, 255, 0.9) 0%,
      rgba(90, 180, 255, 0.8) 40%,
      rgba(60, 100, 255, 0.7) 70%,
      rgba(10, 20, 80, 0.5) 100%
    );
  `,
  violet: css`
    background: radial-gradient(
      circle at 50% 50%,
      rgba(220, 180, 255, 0.9) 0%,
      rgba(170, 90, 255, 0.8) 40%,
      rgba(120, 50, 200, 0.7) 70%,
      rgba(30, 0, 60, 0.5) 100%
    );
  `,
};

const AnimatedSphere = styled.div<{
  variant?: keyof typeof gradientVariants;
}>`
  width: 300px;
  height: 300px;
  position: absolute;

  ${({ variant = 'warm' }) => gradientVariants[variant]}

  animation: ${gradientAnimation} 5s ease-in-out infinite alternate;
  will-change: transform, border-radius;
  filter: blur(40px);
`;

export default AnimatedSphere;
