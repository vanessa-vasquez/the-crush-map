import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </>
  );
}

export default App;
