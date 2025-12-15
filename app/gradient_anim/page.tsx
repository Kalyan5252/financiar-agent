'use client';
import EdgyAnimatedBackground from '@/components/ai/EdgyAnimatedBg';

function App() {
  return (
    <div className="relative">
      <EdgyAnimatedBackground />
      {/* Your main content goes here, positioned above the background */}
      <main style={{ position: 'relative', zIndex: 10, color: 'white' }}>
        <h1>My Edgy App</h1>
        <p>This content is sitting on top of the animation.</p>
      </main>
    </div>
  );
}

export default App;
