
import React from 'react';

export function TechStackDiagram() {
  return (
    <div className="syncsaga-card p-6">
      <h2 className="text-xl font-bold mb-6 text-center">SyncSaga Architecture</h2>
      
      <div className="max-w-3xl mx-auto">
        {/* Architecture Diagram */}
        <div className="relative h-[500px] border rounded-lg p-4 bg-slate-50">
          {/* Frontend - React */}
          <div className="absolute top-4 left-0 right-0 mx-auto w-4/5 h-32 border-2 border-primary rounded-lg bg-white p-4 shadow-md">
            <div className="text-center font-semibold text-lg mb-1 text-primary">Frontend - React</div>
            <div className="flex justify-around text-sm">
              <div className="flex flex-col items-center">
                <div className="bg-secondary px-2 py-1 rounded mb-1">UI Components</div>
                <div className="bg-secondary px-2 py-1 rounded">React Router</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-secondary px-2 py-1 rounded mb-1">State Management</div>
                <div className="bg-secondary px-2 py-1 rounded">TypeScript</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-secondary px-2 py-1 rounded mb-1">Tailwind CSS</div>
                <div className="bg-secondary px-2 py-1 rounded">API Integration</div>
              </div>
            </div>
          </div>
          
          {/* Arrow down from React to Backend */}
          <div className="absolute top-36 left-1/4 h-20 border-l-2 border-slate-400"></div>
          <div className="absolute top-36 left-1/4 rotate-45 w-6 h-6 border-b-2 border-r-2 border-slate-400"></div>
          
          {/* Arrow down from React to Socket */}
          <div className="absolute top-36 right-1/4 h-20 border-l-2 border-slate-400"></div>
          <div className="absolute top-36 right-1/4 -rotate-45 w-6 h-6 border-b-2 border-l-2 border-slate-400"></div>

          {/* Backend - Laravel */}
          <div className="absolute top-[180px] left-[10%] w-[35%] h-32 border-2 border-blue-500 rounded-lg bg-white p-4 shadow-md">
            <div className="text-center font-semibold text-lg mb-1 text-blue-500">Backend - Laravel (PHP)</div>
            <div className="flex flex-wrap justify-around text-sm">
              <div className="bg-blue-100 px-2 py-1 rounded mb-1 mx-1">RESTful API</div>
              <div className="bg-blue-100 px-2 py-1 rounded mb-1 mx-1">Database</div>
              <div className="bg-blue-100 px-2 py-1 rounded mb-1 mx-1">Authentication</div>
              <div className="bg-blue-100 px-2 py-1 rounded mb-1 mx-1">File Storage</div>
              <div className="bg-blue-100 px-2 py-1 rounded mb-1 mx-1">Business Logic</div>
            </div>
          </div>
          
          {/* Socket Server - Node.js */}
          <div className="absolute top-[180px] right-[10%] w-[35%] h-32 border-2 border-green-500 rounded-lg bg-white p-4 shadow-md">
            <div className="text-center font-semibold text-lg mb-1 text-green-500">Socket Server - Node.js</div>
            <div className="flex flex-wrap justify-around text-sm">
              <div className="bg-green-100 px-2 py-1 rounded mb-1 mx-1">Socket.io</div>
              <div className="bg-green-100 px-2 py-1 rounded mb-1 mx-1">Real-time Updates</div>
              <div className="bg-green-100 px-2 py-1 rounded mb-1 mx-1">Chat</div>
              <div className="bg-green-100 px-2 py-1 rounded mb-1 mx-1">Notifications</div>
              <div className="bg-green-100 px-2 py-1 rounded mb-1 mx-1">User Presence</div>
            </div>
          </div>
          
          {/* Communication between Laravel and Node.js */}
          <div className="absolute top-[250px] left-[45%] w-[10%] border-t-2 border-slate-400"></div>
          <div className="absolute top-[248px] left-[45%] ml-4 rotate-45 w-4 h-4 border-t-2 border-r-2 border-slate-400"></div>
          <div className="absolute top-[252px] right-[45%] mr-4 rotate-45 w-4 h-4 border-b-2 border-l-2 border-slate-400"></div>
          
          {/* Database */}
          <div className="absolute top-[330px] left-[15%] w-[30%] h-20 border-2 border-amber-500 rounded-lg bg-white p-4 shadow-md">
            <div className="text-center font-semibold text-amber-500">MySQL Database</div>
            <div className="text-center text-xs text-slate-500">(User data, Projects, Tasks)</div>
          </div>
          
          {/* Arrow from Laravel to Database */}
          <div className="absolute top-[312px] left-[25%] h-18 border-l-2 border-slate-400"></div>
          <div className="absolute top-[312px] left-[25%] rotate-45 w-4 h-4 border-b-2 border-r-2 border-slate-400"></div>
          
          {/* Redis */}
          <div className="absolute top-[330px] right-[15%] w-[30%] h-20 border-2 border-red-500 rounded-lg bg-white p-4 shadow-md">
            <div className="text-center font-semibold text-red-500">Redis</div>
            <div className="text-center text-xs text-slate-500">(Real-time data, Socket sessions)</div>
          </div>
          
          {/* Arrow from Node.js to Redis */}
          <div className="absolute top-[312px] right-[25%] h-18 border-l-2 border-slate-400"></div>
          <div className="absolute top-[312px] right-[25%] rotate-45 w-4 h-4 border-b-2 border-r-2 border-slate-400"></div>

          {/* End Users */}
          <div className="absolute bottom-4 left-0 right-0 mx-auto w-2/3 h-16 border-2 border-slate-500 rounded-lg bg-white p-2 shadow-md">
            <div className="text-center font-semibold">End Users</div>
            <div className="flex justify-around text-xs text-slate-500">
              <div>Desktop</div>
              <div>Mobile</div>
              <div>Tablet</div>
            </div>
          </div>
          
          {/* Arrow from End Users to React */}
          <div className="absolute bottom-[84px] left-1/2 h-14 border-l-2 border-dashed border-slate-400"></div>
          <div className="absolute bottom-[98px] left-1/2 -rotate-45 w-4 h-4 border-t-2 border-r-2 border-dashed border-slate-400"></div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary rounded-sm mr-2"></div>
            <span>React (Frontend)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
            <span>Laravel (Backend API)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
            <span>Node.js (Socket Server)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
            <span>MySQL Database</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
            <span>Redis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
