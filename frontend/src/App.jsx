import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-center p-8">
          Learning Recommendation System
        </h1>
        <p className="text-center text-gray-600">
          Frontend foundation is set up. Pages coming next!
        </p>
      </div>
    </AuthProvider>
  );
}

export default App;