import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from 'react-auth-kit';
import SignInComponent from "./components/Login";
import { Button } from "bootstrap";
/* import NavBar from "./components/NavBar" */

function App() {
  return (
    <>
      <AuthProvider>
        <Button><SignInComponent/></Button>
      </AuthProvider>
      
    </>
  );
}

export default App;
