import styled from 'styled-components';

const MeshBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  overflow: hidden;

  background: radial-gradient(circle at 20% 30%, #ffd66e 0%, transparent 45%),
    radial-gradient(circle at 80% 20%, #ff6a3d 0%, transparent 50%),
    radial-gradient(circle at 60% 80%, #ff3d6e 0%, transparent 55%),
    radial-gradient(circle at 10% 80%, #b18cff 0%, transparent 50%),
    radial-gradient(circle at 90% 90%, #4dd4ff 0%, transparent 45%);

  background-blend-mode: screen;
  opacity: 0.6;
`;

export default MeshBackground;
