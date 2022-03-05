import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";
import { AppNavBar } from "baseui/app-nav-bar";
import { H1 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Notification, KIND as NOTIFICATIONKIND } from "baseui/notification";
import { Spinner } from "baseui/spinner";

function Register() {
  var [fname, setFname] = React.useState("");
  var [lname, setLname] = React.useState("");
  var [phoneNumber, setPhoneNumber] = React.useState("");
  var [email, setEmail] = React.useState("");
  var [password, setPassword] = React.useState("");
  var [showMessage, setShowMessage] = React.useState("hidden");
  var [messageColor, setMessageColor] = React.useState("");
  var [message, setMessage] = React.useState("empty");
  var [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  // protectRoute
  // Protecting the route from unathorized access
  // adding checkpoint in endpoint
  var protectRoute = process.env.REACT_APP_PROTECT_ROUTE;

  function handleClickSignIn() {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // prevent duplication of submission
    if (setLoading == true) {
      return;
    }

    setLoading(true);

    var data = {
      fname: fname,
      lname: lname,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    // password is too short
    if (password.length <= 5) {
      setShowMessage("visible");
      setMessage("Password is too short");
      setMessageColor("negative");
      setLoading(false);

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage("hidden");
        setMessage("empty");
        setMessageColor("");
        return;
      }, 10000);

      // terminate
      return;
    }

    // email is already taken
    // original address -> "/register/checkemail/ben@email.com"
    var check = await axios.get(
      `http://localhost:5000/${protectRoute}/register/checkemail/${email}`
    );

    // email is already taken
    if (check["data"] !== null) {
      setShowMessage("visible");
      setMessage("Email already taken");
      setMessageColor("negative");
      setLoading(false);

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage("hidden");
        setMessage("empty");
        setMessageColor("");
        return;
      }, 10000);

      // terminate
      return;
    }

    // original address -> "/register"
    var send = await axios.post(
      `http://localhost:5000/${protectRoute}/register`,
      data
    );

    if (send["data"] == "OK") {
      setShowMessage("visible");
      setMessage("Account created");
      setMessageColor("positive");
      setLoading(false);

      // reset user data
      setFname("");
      setLname("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage("hidden");
        setMessage("empty");
        return;
      }, 10000);
    }

    // end of handleSubmit
  }

  return (
    <>
      <Grid
        overrides={{
          Grid: {
            style: {
              display: "flex",
              justifyContent: "center",
            },
          },
        }}
      >
        <Cell span={6}>
          <p
            style={{
              fontFamily: "Fredoka One",
              fontSize: "2.5rem",
              margiTop: "1rem",
              marginBottom: "1rem",
              color: "#3A3A38",
            }}
          >
            BENMART
          </p>

          <Notification
            overrides={{
              Body: {
                style: {
                  visibility: showMessage,
                },
              },
            }}
            kind={
              messageColor == "positive"
                ? NOTIFICATIONKIND.positive
                : NOTIFICATIONKIND.negative
            }
          >
            <span
              style={{
                color: message == "empty" ? "white" : "black",
              }}
            >
              {message}
            </span>
          </Notification>

          <p
            style={{ fontFamily: "Lato", fontSize: "2rem", marginTop: ".5rem" }}
          >
            Create account
          </p>
        </Cell>

        <Cell span={12}></Cell>

        <Cell span={6}>
          <form onSubmit={handleSubmit}>
            <FormControl label="First name">
              <Input
                type="text"
                required
                value={fname}
                onChange={(e) => setFname(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl label="Last name">
              <Input
                type="text"
                required
                value={lname}
                onChange={(e) => setLname(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl label="Email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl label="Phone number">
              <Input
                type="number"
                placeholder="Optional"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl label="Password">
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </FormControl>
            <Button
              overrides={{
                BaseButton: {
                  style: {
                    width: "100%",
                    marginBottom: "5px",
                  },
                },
              }}
              type="submit"
            >
              {loading && (
                <span style={{ marginRight: "1.2rem" }}>
                  <Spinner size="1rem" color="white" />
                </span>
              )}
              CREATE ACCOUNT
            </Button>

            <Button
              overrides={{
                BaseButton: {
                  style: {
                    width: "100%",
                  },
                },
              }}
              kind={KIND.secondary}
              onClick={handleClickSignIn}
            >
              SIGN IN
            </Button>
          </form>
        </Cell>
      </Grid>
      <br />
      <br />
      <br />
    </>
  );
}

export default Register;
