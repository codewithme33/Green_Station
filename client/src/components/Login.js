import React from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const SignInComponent = () => {
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", formData)
      .then((res) => {
        if (res.status === 200) {
          const success = signIn({
            auth: {
              token: res.data.token,
              type: "Bearer",
            },
            refresh: res.data.refreshToken,
            userState: res.data.userState, 
          });

          if (success) {
            console.log("Login successful!");
          } else {
            console.error("Sign-in failed");
          }
        }
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data?.message || err.message);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignInComponent;