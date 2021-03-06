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
import AdministratorKeyModal from "../components/administratorKeyModal";

function Login() {
  var [email, setEmail] = React.useState("");
  var [password, setPassword] = React.useState("");
  var [showMessage, setShowMessage] = React.useState("hidden");
  var [messageColor, setMessageColor] = React.useState("");
  var [message, setMessage] = React.useState("empty");
  var [loading, setLoading] = React.useState(false);
  var [administratorKey, setAdministratorKey] = React.useState("");
  var [toggleModal, setToggleModal] = React.useState(false);
  var [incorrectAdministratorKey, setIncorrectAdministratorKey] =
    React.useState(false);

  const navigate = useNavigate();

  // ENV
  // protectRoute
  // Protecting the route from unathorized access
  // adding checkpoint in endpoint
  var protectRoute = process.env.REACT_APP_PROTECT_ROUTE;
  var temporaryAdministratorKey = process.env.REACT_APP_ADMINISTRATOR_KEY;

  // modal component
  function handleClickAdministratorIcon() {
    setToggleModal(true);
  }

  function handleCloseModal() {
    setToggleModal(false);
  }

  function handleClickCancelModal() {
    console.log("test");
    setToggleModal(false);
  }

  async function handleSubmitAdministratorKey(e) {
    e.preventDefault();

    // original address -> "/administratorKey"
    var getData = await axios.get(
      `http://localhost:5000/${protectRoute}/administratorKey`
    );

    if (getData["data"].length == 0) {
      // administrator is currently using
      // a temporary key
      console.log(administratorKey);
      console.log(temporaryAdministratorKey);
      if (administratorKey == temporaryAdministratorKey) {
        // temporaryAdministratorKey correct
        return navigate("/administrator");
      } else {
        // temporaryAdministratorKey incorrect
        setIncorrectAdministratorKey(true);
        return;
      }
    } else {
      // administrator is now using
      // secured key
    }
  }

  function handleClickCreateAccount() {
    navigate("/register");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // prevent duplication of submission
    if (setLoading == true) {
      return;
    }

    setLoading(true);

    var data = { email: email, password: password };

    // original address -> "/register"
    var send = await axios.post(
      `http://localhost:5000/${protectRoute}/login`,
      data
    );

    if (send["data"] == true) {
      // Correct credentials
    } else {
      // Incorrect credentials
      setShowMessage("visible");
      setMessage("Incorrect credentials");
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
    }
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "2.5rem",
                margin: "0",
                color: "#3A3A38",
                fontWeight: "900",
              }}
            >
              BENMART
            </p>
            <span>
              <AdministratorKeyModal
                openModal={toggleModal}
                closeModal={handleCloseModal}
                clickAdministratorModal={toggleModal}
                cancelModal={handleClickCancelModal}
                clickSubmit={handleSubmitAdministratorKey}
                showIncorrectKey={incorrectAdministratorKey}
                adminKey={administratorKey}
                change={function (e) {
                  setAdministratorKey(e.currentTarget.value);
                  setIncorrectAdministratorKey(false);
                }}
              />
            </span>
          </div>

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
            Sign in
          </p>
        </Cell>

        <Cell span={12}></Cell>

        <Cell span={6}>
          <form onSubmit={handleSubmit}>
            <FormControl label="Email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
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
              SIGN IN
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
              onClick={handleClickCreateAccount}
            >
              CREATE ACCOUNT
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

export default Login;
