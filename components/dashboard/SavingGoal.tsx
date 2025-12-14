export default function SavingGoal() {
  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Saving Goal</h2>
      <p className="text-sm text-gray-400 mb-4">75% Progress</p>

      <div className="text-3xl font-semibold mb-2">$1052.98</div>
      <p className="text-gray-400 mb-4">of $1,200</p>

      <div className="w-full bg-white/10 h-2 rounded-full">
        <div
          className="bg-green-400 h-2 rounded-full"
          style={{ width: '75%' }}
        />
      </div>
    </>
  );
}
