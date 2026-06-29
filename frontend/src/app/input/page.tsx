export default function InputPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <h2 className="text-3xl font-bold mb-4">Enter Cube State</h2>
      <p className="text-gray-400 mb-8">
        Choose how you want to input your cube
      </p>

      <div className="flex gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors w-52">
          <div className="text-4xl mb-3">🖱️</div>
          <h3 className="font-semibold mb-1">Manual</h3>
          <p className="text-gray-500 text-sm">Click to color each sticker</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors w-52">
          <div className="text-4xl mb-3">📸</div>
          <h3 className="font-semibold mb-1">Upload Images</h3>
          <p className="text-gray-500 text-sm">Photo each face of the cube</p>
        </div>
      </div>

      <p className="text-gray-700 text-xs mt-10">
        More coming in Phase 4 & 5...
      </p>
    </div>
  );
}