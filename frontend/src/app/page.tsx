import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">
        Rubik<span className="text-blue-500">-S</span>
      </h1>
      <p className="text-gray-400 text-xl mb-2">
        Solve your Rubik's Cube with multiple algorithms
      </p>
      <p className="text-gray-600 text-sm mb-10">
        IDA* · Kociemba · DeepCubeA
      </p>

      <div className="flex gap-4">
        <Link
          href="/input"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Start Solving
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-3 gap-8 text-center max-w-2xl">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-semibold mb-1">IDA*</h3>
          <p className="text-gray-500 text-sm">Optimal search algorithm</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold mb-1">Kociemba</h3>
          <p className="text-gray-500 text-sm">Two-phase speed solver</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-3xl mb-2">🧠</div>
          <h3 className="font-semibold mb-1">DeepCubeA</h3>
          <p className="text-gray-500 text-sm">AI-powered solving</p>
        </div>
      </div>
    </div>
  );
}