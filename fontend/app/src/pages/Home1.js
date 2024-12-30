import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Damu</h1>
          <input 
            type="text" 
            placeholder="Search..." 
            className="border border-gray-300 p-2 rounded-md"
          />
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-blue-500 text-white rounded-md">Login</button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto flex mt-6">
        {/* Sidebar */}
        <aside className="w-1/4 p-4">
          <ul>
            <li className="p-2 hover:bg-gray-200">Home</li>
            <li className="p-2 hover:bg-gray-200">Friends</li>
            <li className="p-2 hover:bg-gray-200">Messages</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">News Feed</h2>
            {/* Post Component */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="font-semibold">John Doe</p>
              <p>Just posted a new photo!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
