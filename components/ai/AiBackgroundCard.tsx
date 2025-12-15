import EdgyAnimatedBackground from './EdgyAnimatedBg';

function Bg() {
  return (
    <div className="">
      <EdgyAnimatedBackground />
      {/* Your main content goes here, positioned above the background */}
      <main style={{ position: 'relative', zIndex: 10, color: 'white' }}>
        <h1>My Edgy App</h1>
        <p>This content is sitting on top of the animation.</p>
      </main>
    </div>
  );
}

export default Bg;

// <AIBackgroundCard>
//   <div className="bg-[#161616] rounded-2xl">
//     {/* <h2 className="text-lg font-semibold mb-1">AI Financial Summary</h2> */}
//     <p className="text-sm text-gray-400 mb-4">
//       Insights based on last and current month activity
//     </p>

//     {loading && (
//       <div className="text-sm text-gray-400">
//         Analyzing your financial patterns…
//       </div>
//     )}

//     {error && <div className="text-sm text-red-400">{error}</div>}

//     {!loading && !error && insights.length === 0 && (
//       <div className="text-sm text-gray-400">
//         Not enough data to generate insights yet.
//       </div>
//     )}
//   </div>
// </AIBackgroundCard>
// <AIBackgroundCard />
