import './App.css';
import SignUp from './components/SignUp';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <SignUp />
      </AuthProvider>
    </>
  );
}

export default App;
