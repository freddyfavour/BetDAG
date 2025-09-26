"use client";

export default function AboutSection() {
  return (
    <section className="py-16 bg-[#0A1223]" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">BetDAG</span>
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-xl">
                BetDAG is the first AI-powered prediction marketplace built on BlockDAG's innovative technology.
              </p>
              
              <p>
                Our platform combines the power of artificial intelligence with the security and transparency of 
                blockchain technology to revolutionize how users make predictions in crypto markets.
              </p>
              
              <p>
                By leveraging advanced machine learning algorithms and BlockDAG's high-throughput network, 
                BetDAG offers users unparalleled insights and opportunities to earn rewards based on their 
                market predictions.
              </p>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold text-blue-400">99.9%</span>
                <p className="text-sm text-gray-400">Uptime</p>
              </div>
              
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold text-teal-400">200k+</span>
                <p className="text-sm text-gray-400">Predictions Made</p>
              </div>
              
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold text-purple-400">85%</span>
                <p className="text-sm text-gray-400">AI Accuracy</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Visual Element */}
          <div className="w-full md:w-2/5">
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-teal-400/20 rounded-full blur-3xl"></div>
              
              {/* 3D-like representation of data analysis concept */}
              <div className="relative bg-gray-800/70 rounded-xl overflow-hidden shadow-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded ${i % 3 === 0 ? 'bg-blue-500/30' : i % 3 === 1 ? 'bg-teal-500/30' : 'bg-purple-500/30'} 
                      ${i === 4 ? 'animate-pulse' : ''}`}
                    >
                      {i === 4 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-teal-400"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500/50" style={{ width: '70%' }}></div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500/50" style={{ width: '45%' }}></div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500/50" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <div className="text-xs text-gray-400">Data Analysis</div>
                  <div className="text-xs text-gray-400">AI Prediction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}