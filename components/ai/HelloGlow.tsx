import { keyframes } from 'styled-components';

const helloGlow = keyframes`
  0% {
    box-shadow:
      0 0 10px rgba(56, 189, 248, 0.5),
      0 0 16px rgba(168, 85, 247, 0.45),
      0 0 24px rgba(244, 114, 182, 0.35);
  }
  50% {
    box-shadow:
      0 0 12px rgba(52, 211, 153, 0.6),
      0 0 24px rgba(168, 85, 247, 0.55),
      0 0 36px rgba(251, 191, 36, 0.45);
  }
  100% {
    box-shadow:
      0 0 8px rgba(56, 189, 248, 0.5),
      0 0 16px rgba(168, 85, 247, 0.45),
      0 0 24px rgba(244, 114, 182, 0.35);
  }
`;

export default helloGlow;
