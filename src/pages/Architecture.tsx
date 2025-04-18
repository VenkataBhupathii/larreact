
import { MainLayout } from '@/components/layout/MainLayout';
import { TechStackDiagram } from '@/components/architecture/TechStackDiagram';

const Architecture = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Architecture Overview</h1>
        <p className="text-muted-foreground">How React, Laravel, and Node.js work together</p>
      </div>

      <div className="space-y-8">
        <TechStackDiagram />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* React Section */}
          <div className="syncsaga-card">
            <div className="flex items-center mb-4">
              <div className="bg-primary/20 p-2 rounded-md mr-3">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 10.8c-1.77 0-3.2 1.43-3.2 3.2s1.43 3.2 3.2 3.2 3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2zm0-1.6c-2.65 0-4.8 2.15-4.8 4.8s2.15 4.8 4.8 4.8 4.8-2.15 4.8-4.8-2.15-4.8-4.8-4.8z" />
                  <path d="M12 4.8c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0-1.6c5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.6 9.6-9.6-4.3-9.6-9.6S6.7 3.2 12 3.2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold">React Frontend</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="bg-primary h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Modern UI components</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>TypeScript for type safety</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>React Router for navigation</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Tailwind CSS for styling</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>API and Socket integrations</span>
              </li>
            </ul>
          </div>
          
          {/* Laravel Section */}
          <div className="syncsaga-card">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-3.08c.58-.21 1-.8 1-1.42V12.5c0-.62-.42-1.21-1-1.42zM13 3.5L18.5 9H13V3.5zM4 19V5a1 1 0 0 1 1-1h6v6.5c0 .83.67 1.5 1.5 1.5H18v2.81c-.58.21-1 .8-1 1.42v.77c0 .62.42 1.21 1 1.42V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Laravel Backend</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="bg-blue-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>RESTful API endpoints</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Database operations (MySQL)</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Authentication and security</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>File storage and management</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Business logic implementation</span>
              </li>
            </ul>
          </div>
          
          {/* Node.js Section */}
          <div className="syncsaga-card">
            <div className="flex items-center mb-4">
              <div className="bg-green-500/20 p-2 rounded-md mr-3">
                <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 14.5L12 19.5L3 14.5V9.5L12 4.5L21 9.5V14.5Z" />
                  <polyline points="3 9.5 12 14.5 21 9.5" />
                  <line x1="12" y1="14.5" x2="12" y2="19.5" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Node.js Socket Server</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="bg-green-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Real-time bi-directional communication</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Chat functionality</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Live notifications</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>User presence tracking</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 h-1.5 w-1.5 rounded-full mr-2"></span>
                <span>Real-time events and updates</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="syncsaga-card">
          <h2 className="text-lg font-semibold mb-4">How It All Works Together</h2>
          
          <ol className="space-y-4 text-sm">
            <li className="flex">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">1</span>
              <div>
                <p className="font-medium">User Authentication</p>
                <p className="text-muted-foreground mt-1">Users authenticate through the React frontend, which sends credentials to the Laravel backend. Laravel validates and returns a JWT token.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">2</span>
              <div>
                <p className="font-medium">Data Operations</p>
                <p className="text-muted-foreground mt-1">React frontend makes API calls to Laravel for CRUD operations. Laravel interacts with the MySQL database and returns responses to the frontend.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">3</span>
              <div>
                <p className="font-medium">Real-time Communication</p>
                <p className="text-muted-foreground mt-1">React connects to the Node.js socket server using the same JWT token. Socket.io enables real-time bidirectional communication for chat and notifications.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">4</span>
              <div>
                <p className="font-medium">Backend Synchronization</p>
                <p className="text-muted-foreground mt-1">Laravel and Node.js servers can communicate with each other through API calls or a shared Redis instance for event broadcasting and data consistency.</p>
              </div>
            </li>
            
            <li className="flex">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0">5</span>
              <div>
                <p className="font-medium">User Experience</p>
                <p className="text-muted-foreground mt-1">The combination of these technologies creates a smooth, responsive application with both traditional CRUD operations and modern real-time features.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </MainLayout>
  );
};

export default Architecture;
