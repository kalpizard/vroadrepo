import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const API_URL = "http://localhost:3000/users/tokens";

let access_token;
let refresh_token = localStorage.getItem("refresh_token");
let resource_owner;

const signupForm = document.querySelector("#sign_up_form");
const signinForm = document.querySelector("#sign_in_form");

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;
  const password_confirm = document.querySelector(
    "#signup-password-confirm"
  ).value;

  if (password !== password_confirm) {
    alert("Passwords do not match");
    return;
  }

  const response = await fetch(`${API_URL}/sign_up`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  await handleAuthResponse(response);
  userSession();
});

async function handleAuthResponse(response) {
  const data = await response.json();

  localStorage.setItem("resource_owner", JSON.stringify(data.resource_owner)); // Corregido el nombre de la clave a "resource_owner"
  localStorage.setItem("refresh_token", data.refresh_token);
  access_token = data.token;
  refresh_token = data.refresh_token;
  resource_owner = data.resource_owner;
}
