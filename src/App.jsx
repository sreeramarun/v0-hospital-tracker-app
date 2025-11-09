"use client"

import { useState, useEffect } from "react"
import Login from "./pages/LoginPage"
import Signup from "./pages/SignupPage"
import Dashboard from "./pages/Dashboard"
import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    const session = localStorage.getItem("session")
    if (session) {
      const { user } = JSON.parse(session)
      setCurrentUser(user)
      setIsLoggedIn(true)
      setCurrentView("dashboard")
    }
  }, [])

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem("session", JSON.stringify({ user: { name: user.name, email: user.email } }))
      setCurrentUser({ name: user.name, email: user.email })
      setIsLoggedIn(true)
      setCurrentView("dashboard")
      return true
    }
    return false
  }

  const handleSignup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.some((u) => u.email === email)) {
      return false
    }

    users.push({ name, email, password })
    localStorage.setItem("users", JSON.stringify(users))
    setCurrentView("login")
    return true
  }

  const handleLogout = () => {
    localStorage.removeItem("session")
    setCurrentUser(null)
    setIsLoggedIn(false)
    setCurrentView("login")
  }

  const switchToSignup = () => setCurrentView("signup")
  const switchToLogin = () => setCurrentView("login")

  return (
    <div className="app">
      {currentView === "login" && <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />}
      {currentView === "signup" && <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />}
      {currentView === "dashboard" && isLoggedIn && <Dashboard user={currentUser} onLogout={handleLogout} />}
    </div>
  )
}

export default App
