import React, { useState } from 'react';
import { Calculator, Scissors, Grid } from 'lucide-react';

// Convert decimal inches to fraction string
function toFraction(decimal) {
  const tolerance = 0.01;
  const whole = Math.floor(decimal);
  const frac = decimal - whole;
  
  if (frac < tolerance) return whole.toString();
  
  // Common quilting fractions
  const fractions = [
    [1, 8], [1, 4], [3, 8], [1, 2], [5, 8], [3, 4], [7, 8]
  ];
  
  for (let [num, den] of fractions) {
    if (Math.abs(frac - num/den) < tolerance) {
      return whole > 0 ? `${whole} ${num}/${den}` : `${num}/${den}`;
    }
  }
  
  return decimal.toFixed(3);
}

export default function App() {
  const [fabricWidth, setFabricWidth] = useState(40);
  const [finishedBlockSize, setFinishedBlockSize] = useState(6);
  const [seam, setSeam] = useState(0.25);
  const [numBlocks, setNumBlocks] = useState(49);
  const [layout, setLayout] = useState({ rows: 7, cols: 7 });
  
  // Component types per block
  const [squaresPerBlock, setSquaresPerBlock] = useState(1);
  const [squareFinishedSize, setSquareFinishedSize] = useState(2);
  const [hstPerBlock, setHstPerBlock] = useState(4);
  const [hstFinishedSize, setHstFinishedSize] = useState(2);
  
  // Calculate cut sizes
  const squareCutSize = squareFinishedSize + (2 * seam);
  const hstCutSize = hstFinishedSize + 0.875; // Standard HST formula: finished size + 7/8"
  
  // Total pieces needed
  const totalSquares = squaresPerBlock * numBlocks;
  const totalHST = hstPerBlock * numBlocks;
  
  // SQUARES: Cut strips, then cross-cut into squares
  const squaresPerStrip = Math.floor(fabricWidth / squareCutSize);
  const stripsForSquares = totalSquares > 0 ? Math.ceil(totalSquares / squaresPerStrip) : 0;
  const yardageSquares = (stripsForSquares * squareCutSize) / 36;
  
  // HST: Strip piecing method
  // Need pairs of strips sewn together, then cut into squares, then create HST
  // Each sewn square pair yields 2 HST units
  const hstSquaresNeeded = Math.ceil(totalHST / 2);
  const hstSquaresPerStripPair = Math.floor(fabricWidth / hstCutSize);
  const stripPairsForHST = Math.ceil(hstSquaresNeeded / hstSquaresPerStripPair);
  const stripsPerFabric = stripPairsForHST; // Each fabric needs same number of strips
  const yardageHSTperFabric = (stripsPerFabric * hstCutSize) / 36;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Scissors className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Quilt Cutting Calculator</h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-purple-900 flex items-center gap-2">
                  <Grid className="w-5 h-5" />
                  Quilt Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Finished Block Size (inches)
                    </label>
                    <input
                      type="number"
                      value={finishedBlockSize}
                      onChange={(e) => setFinishedBlockSize(Number(e.target.value))}
                      step="0.25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Blocks
                    </label>
                    <input
                      type="number"
                      value={numBlocks}
                      onChange={(e) => setNumBlocks(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                      <input
                        type="number"
                        value={layout.rows}
                        onChange={(e) => setLayout({...layout, rows: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
                      <input
                        type="number"
                        value={layout.cols}
                        onChange={(e) => setLayout({...layout, cols: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seam Allowance (inches)
                    </label>
                    <select
                      value={seam}
                      onChange={(e) => setSeam(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={0.25}>1/4"</option>
                      <option value={0.5}>1/2"</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fabric Width (inches)
                    </label>
                    <input
                      type="number"
                      value={fabricWidth}
                      onChange={(e) => setFabricWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-pink-900">
                  Block Components
                </h2>
                
                <div className="space-y-4">
                  <div className="border-b border-pink-200 pb-4">
                    <h3 className="font-semibold text-pink-800 mb-3">Plain Squares</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Per Block
                        </label>
                        <input
                          type="number"
                          value={squaresPerBlock}
                          onChange={(e) => setSquaresPerBlock(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Finished Size
                        </label>
                        <input
                          type="number"
                          value={squareFinishedSize}
                          onChange={(e) => setSquareFinishedSize(Number(e.target.value))}
                          step="0.25"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-800 mb-3">Half-Square Triangles (HST)</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Per Block
                        </label>
                        <input
                          type="number"
                          value={hstPerBlock}
                          onChange={(e) => setHstPerBlock(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Finished Size
                        </label>
                        <input
                          type="number"
                          value={hstFinishedSize}
                          onChange={(e) => setHstFinishedSize(Number(e.target.value))}
                          step="0.25"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Cutting Instructions</h2>
                </div>
                
                <div className="space-y-4">
                  {totalSquares > 0 && (
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Plain Squares</h3>
                      <p className="text-2xl font-bold mb-2">
                        Cut {stripsForSquares} strips at {toFraction(squareCutSize)}" wide
                      </p>
                      <p className="text-sm opacity-90 mb-1">
                        Then cross-cut into {toFraction(squareCutSize)}" squares
                      </p>
                      <p className="text-sm opacity-90 mb-3">
                        • {squaresPerStrip} squares per strip
                      </p>
                      <p className="text-sm opacity-90 mb-1">
                        • Total needed: {totalSquares} squares
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/30">
                        <p className="font-semibold">
                          Yardage: {yardageSquares.toFixed(2)} yards
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {totalHST > 0 && (
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Half-Square Triangles</h3>
                      <p className="text-2xl font-bold mb-2">
                        Cut {stripsPerFabric} strips at {toFraction(hstCutSize)}" wide from EACH fabric
                      </p>
                      <div className="text-sm space-y-2 mb-3 bg-white/10 p-3 rounded">
                        <p className="font-semibold">Strip Piecing Method:</p>
                        <p>1. Cut strips at {toFraction(hstCutSize)}" wide from each fabric</p>
                        <p>2. Cross-cut strips into {toFraction(hstCutSize)}" squares</p>
                        <p>3. Place squares of both fabrics right sides together</p>
                        <p>4. Draw diagonal line on lighter fabric</p>
                        <p>5. Sew 1/4" seam on BOTH sides of diagonal</p>
                        <p>6. Cut on the diagonal line</p>
                        <p>7. Press open - yields 2 HST units per square pair</p>
                      </div>
                      <p className="text-sm opacity-90 mb-1">
                        • {hstSquaresPerStripPair} squares per strip
                      </p>
                      <p className="text-sm opacity-90 mb-1">
                        • Need {hstSquaresNeeded} square pairs
                      </p>
                      <p className="text-sm opacity-90">
                        • Yields {totalHST} HST units
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/30">
                        <p className="font-semibold">
                          Yardage per fabric: {yardageHSTperFabric.toFixed(2)} yards
                        </p>
                        <p className="text-sm opacity-90">
                          (Total for both fabrics: {(yardageHSTperFabric * 2).toFixed(2)} yards)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/30">
                  <div className="text-xl font-bold">
                    <p className="mb-2">Total Yardage Summary:</p>
                    {totalSquares > 0 && (
                      <p className="text-base font-normal">Squares: {yardageSquares.toFixed(2)} yards</p>
                    )}
                    {totalHST > 0 && (
                      <>
                        <p className="text-base font-normal">HST Fabric A: {yardageHSTperFabric.toFixed(2)} yards</p>
                        <p className="text-base font-normal">HST Fabric B: {yardageHSTperFabric.toFixed(2)} yards</p>
                      </>
                    )}
                  </div>
                  <p className="text-sm opacity-90 mt-3 bg-white/10 p-2 rounded">
                    💡 Add 10-20% extra for waste and mistakes
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">Finished Quilt Size</h3>
                <p className="text-3xl font-bold text-blue-700">
                  {(layout.cols * finishedBlockSize).toFixed(1)}" × {(layout.rows * finishedBlockSize).toFixed(1)}"
                </p>
                <p className="text-sm text-blue-800 mt-2">
                  {numBlocks} blocks in a {layout.rows} × {layout.cols} layout
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Example Presets */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Presets</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setFinishedBlockSize(6);
                setNumBlocks(49);
                setLayout({rows: 7, cols: 7});
                setSquaresPerBlock(1);
                setSquareFinishedSize(2);
                setHstPerBlock(4);
                setHstFinishedSize(2);
              }}
              className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg text-left transition-colors"
            >
              <h3 className="font-semibold text-purple-900">Churn Dash</h3>
              <p className="text-sm text-purple-700">6" block, 49 blocks (7×7)</p>
              <p className="text-xs text-purple-600">1×2" square + 4×2" HST</p>
            </button>
            
            <button
              onClick={() => {
                setFinishedBlockSize(12);
                setNumBlocks(20);
                setLayout({rows: 4, cols: 5});
                setSquaresPerBlock(0);
                setSquareFinishedSize(3);
                setHstPerBlock(8);
                setHstFinishedSize(3);
              }}
              className="p-4 bg-pink-100 hover:bg-pink-200 rounded-lg text-left transition-colors"
            >
              <h3 className="font-semibold text-pink-900">Pinwheel</h3>
              <p className="text-sm text-pink-700">12" block, 20 blocks (4×5)</p>
              <p className="text-xs text-pink-600">8×3" HST</p>
            </button>
            
            <button
              onClick={() => {
                setFinishedBlockSize(9);
                setNumBlocks(30);
                setLayout({rows: 5, cols: 6});
                setSquaresPerBlock(5);
                setSquareFinishedSize(3);
                setHstPerBlock(4);
                setHstFinishedSize(3);
              }}
              className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-left transition-colors"
            >
              <h3 className="font-semibold text-blue-900">Sawtooth Star</h3>
              <p className="text-sm text-blue-700">9" block, 30 blocks (5×6)</p>
              <p className="text-xs text-blue-600">5×3" squares + 4×3" HST</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}