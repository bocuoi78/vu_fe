import logo from '../logo.svg';
import '../App.css';
import Student from './management/student/Student'
import SignIn from "./sign-in/SignIn";
import SignInSide from "./sign-in/SignInSide";
import Routes from "../route";
import AuthProvider from "../provider/authProvider";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    //     <SignInSide/>
    //   </header>
    // </div>
  );
}

export default App;
