import './App.css';
import {  BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
