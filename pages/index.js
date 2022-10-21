import axios from "axios";
import React, { useContext } from "react";
import { Context } from "./../context/index";

import { useRouter } from "next/router";

export default function Auth() {
  // dc9e4764-d2ed-4204-955f-165228b98ecb
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    if (username.length === 0 || secret.length === 0) return;
    axios
      .put(
        'https://api.chatengine.io/users/',
        {
          username,
          secret
        },
        {
          headers: { "Private-key": "from chatengine.io" }
        }
      )
      .then(r => router.push('/chats'));
  };
  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
          <div className="auth-title">NextJs Chat</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button onClick={onSubmit}  type="submit" className="submit-button">
            Login / Sing Up
          </button>
        </form>
      </div>
    </div>
  );
}
