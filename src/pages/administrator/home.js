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
import AdministratorNavbar from "../../components/administratorNavbar";

export default function Home() {
  return (
    <>
      <Grid>
        <Cell span={12}>
          <AdministratorNavbar />
        </Cell>
      </Grid>
      <hr />
    </>
  );
}
