export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <h2 className="text-3xl font-bold mb-4">Solver Results</h2>
      <p className="text-gray-400 mb-8">Results will appear here after solving</p>

      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left px-6 py-4">Solver</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Moves</th>
              <th className="text-left px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800 text-gray-500">
              <td className="px-6 py-4">IDA*</td>
              <td className="px-6 py-4">--</td>
              <td className="px-6 py-4">--</td>
              <td className="px-6 py-4">--</td>
            </tr>
            <tr className="border-b border-gray-800 text-gray-500">
              <td className="px-6 py-4">Kociemba</td>
              <td className="px-6 py-4">--</td>
              <td className="px-6 py-4">--</td>
              <td className="px-6 py-4">--</td>
            </tr>
            <tr className="text-gray-500">
              <td className="px-6 py-4">DeepCubeA</td>
              <td className="px-6 py-4">--</td>
              <td className="px-6 py-4">--</td>
              <td className="px-6 py-4">--</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-700 text-xs mt-10">
        Full results coming in Phase 10...
      </p>
    </div>
  );
}