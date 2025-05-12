import './App.css';
import {  BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
