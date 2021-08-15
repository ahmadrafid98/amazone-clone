import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Login from "./components/Login";
import { auth } from "./firebase";
import { connect } from "react-redux";
import { setUser } from "./actions/UserActions";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const promise = loadStripe(
  "pk_test_51Iv2HbKEiYvGvfnz6PjWC1nOdeMSy3tbJQAh2LPSUIKY0qdNgYkbhYwcNNb1o63JBUMLizXHMYKkrJMfYvBZrhpk00oORi6byV"
);

function App({ setUser }) {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, { setUser })(App);
