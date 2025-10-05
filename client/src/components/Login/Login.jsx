import userLoginIcon from "../../assets/img_navbar/user-login.png";
import passwordIcon from "../../assets/img_navbar/padlock.png";
import loginIcon from "../../assets/img_navbar/login.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate("/");
    }
  }, [navigate]);

  async function handleLogin() {
    if (!userName.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password: password }),
      });

      if (response.ok) {
        console.log("Login Success");
        
        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', userName);
        
        navigate("/");
      } else {
        setError("Invalid username or password");
        console.log("Login Fail");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-amber-300">
      <div className="relative bg-white w-[400px] p-6 rounded-xl shadow-lg">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-black w-16 h-16 rounded-full flex justify-center items-center shadow-lg">
            <img
              src={loginIcon}
              alt="Login Icon"
              className="w-8 h-8 filter invert"
            />
          </div>
        </div>
        <div className="mb-6 mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-200 w-full pl-10 pr-3 py-2 border rounded-xl"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <img
              src={userLoginIcon}
              alt="User Icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
        <div className="mb-10">
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 w-full pl-10 pr-3 py-2 border rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}
        <button
          type="button"
          onClick={() => handleLogin()}
          disabled={loading}
          className={`w-full py-2 rounded-xl transition ${
            loading 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
      </div>
    </div>
  );
}
