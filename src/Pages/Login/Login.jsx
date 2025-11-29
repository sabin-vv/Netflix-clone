import { useState } from "react";
import logo from "../../assets/logo.png"
import Footer from "../../Components/Footer/Footer";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";


export default function Login() {

  const [loginState, setLoginState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (loginState === "Sign In") {
        await login(email, password)
        toast.success("Login Success")
        navigate("/")
      } else {
        await signUp(name, email, password)
        toast.success("Account Created Successfully")
        navigate("/")
      }
    } catch (error) {
      toast.error(error.code.replace("auth/", "").replace("-", " "))
    }
  }

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <img
            style={{ width: "9.25rem", height: "2.5rem" }}
            src={logo}
            alt="netflix"
          />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>{loginState}</h1>
            {loginState === "Sign Up" ? <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> : <></>}
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">{loginState}</button>
            <div className="remember">
              <input type="checkbox" />
              <p>Remember Me</p>
            </div>
            <div className="login-or-signup">
              {loginState === "Sign In" ? <p>New to Netflix?<span onClick={() => setLoginState("Sign Up")}>Sign up now</span> </p>
                : <p>Already have an Account? <span onClick={() => setLoginState("Sign In")}>Sign In Now</span></p>}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>

  );
}

