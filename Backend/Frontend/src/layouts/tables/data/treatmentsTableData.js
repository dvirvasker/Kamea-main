/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";

const { user } = isAuthenticated();
// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
  const textPlaceHolderInputs = [
    "יחידה",
    "ענף",
    "מדור",
    "נייד",
    "שם העבודה",
    "סיווג העבודה",
    "שיטת כריכה",
    "שיטת  צילום",
    "כמות עותקים",
    "שם מוסר העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך קבלת העבודה",
  ];
  const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
  // const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
  // const copyTypes = ["שחור לבן דו צדדי", "צבעוני יחיד", "צבעוני דו צדדי", "שחור לבן יחיד"];
  // const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
  const MINUTE_MS = 100000;

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/hozlaRequests/personalnumber`, {
  //       params: {
  //         personalnumber: user.personalnumber,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setRequestDB(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);
  useEffect(() => {
    console.log(user.personalnumber);
    axios
      .get(`http://localhost:5000/hozlaRequests/requestByPersonalnumber/${user.personalnumber}`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  // const projectOptions = ["א", "ב", "ג", "ד", "ה", "ו"];
  const getWorkStuts = (value) => {
    let stutus = "בקשה נשלחה";
    let color = "error";
    if (value === 25) {
      stutus = "בקשה נשלחה";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }
    return [stutus, color];
  };

  const setTypeRequest = (type) => {
    let typeName = "";
    let color = "mekatnar";
    let urlRequest = "";
    if (type === "ToraHeilit") {
      typeName = "תורה חילית";
      color = "info";
      urlRequest = "toraHeilitrequestForm";
    } else if (type === "HozlaRequest") {
      typeName = "הוצל''א";
      color = "success";
      urlRequest = "RequestForm";
    }
    return [typeName, color, urlRequest];
  };

  const dbRows = requestDB.map((hozla, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    fileID: parseInt(hozla._id.slice(-4), 36),
    project: hozla.workName,
    clearance:
      // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      clearanceOptions[parseInt(hozla.workClearance, 10)],
    // </MDTypography>
    typeRequest: (
      <>
        <MDBadge
          badgeContent={setTypeRequest(hozla.typeRequest)[0]}
          color={setTypeRequest(hozla.typeRequest)[1]}
          size="sm"
          container
        />
      </>
    ),
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(hozla.status)[0]}
        </MDTypography>
        <Progress
          variant="gradient"
          color={getWorkStuts(hozla.status)[1]}
          value={hozla.status >= 125 ? 100 : hozla.status}
        />
      </>
    ),
    NameRequester: hozla.fullNameAsker,
    diliveryDate: hozla.workRecivedDate.split("T")[0],
    startDate: hozla.workGivenDate.split("T")[0],
    additionalInfo: (
      <Link to={`/${setTypeRequest(hozla.typeRequest)[2]}/${hozla._id}`} key={hozla._id}>
        <MDButton
          variant="gradient"
          color="mekatnar"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(hozla._id);

          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>info</Icon>
        </MDButton>
      </Link>
    ),
    hozlaInfo: (
      <Link to={`/adminFeild/${hozla._id}`} key={hozla._id}>
        <MDButton
          variant="gradient"
          color="mekatnar"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(hozla._id);
          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>edit</Icon>
        </MDButton>
      </Link>
    ),
  }));
  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "צ'", accessor: "Tzadik", align: "center" },
      // { Header: "סד''כ", accessor: "sadac", align: "center" },
      { Header: "מועד טיפול משוער", accessor: "estimatedDate", align: "center" },
      { Header: "חריגה", accessor: "deviation", align: "center" },
      //   { Header: "הייתה תנועה", accessor: "movement", align: "center" },
      //   { Header: "תקלה חוזרת", accessor: "fault", align: "center" },
      //   // { Header: "סטטוס", accessor: "status", align: "center" },
      //   { Header: "זמן התערבות", accessor: "betting", align: "center" },
      //   { Header: "מועד טיפול אחרון", accessor: "lastTreatment", align: "center" },
      //   { Header: "בוצע ע''י", accessor: "doneBy", align: "center" },
      //   { Header: "סכום אירועים באשמה", accessor: "sumEvents", align: "center" },
      //   { Header: "ציון ל", accessor: "grade", align: "center" },
    ],
    rows: [
      {
        Tzadik: "1243245",
        sadac: "33213",
        estimatedDate: (
          <Grid container direction="row" justifyContent="space-evenly" mx={3}>
            <Progress variant="gradient" color="warning" value="70" />
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              12/2/2023
            </MDTypography>
          </Grid>
        ),
        deviation: <MDBadge badgeContent="כן" color="error" size="sm" container />,
      },
      {
        Tzadik: "34745756",
        sadac: "23432",
        estimatedDate: (
          <Grid container direction="row" justifyContent="space-evenly" mx={3}>
            <Progress variant="gradient" color="mekatnar" value="46" />
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              22/2/2023
            </MDTypography>
          </Grid>
        ),
        deviation: <MDBadge badgeContent="לא" color="success" size="sm" container />,
      },
      {
        Tzadik: "432455",
        sadac: "23432",
        estimatedDate: (
          <Grid container direction="row" justifyContent="space-evenly" mx={3}>
            <Progress variant="gradient" color="success" value="20" />
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              23/2/2023
            </MDTypography>
          </Grid>
        ),
        deviation: <MDBadge badgeContent="לא" color="success" size="sm" container />,
      },
      {
        Tzadik: "54534332",
        sadac: "123432",
        estimatedDate: (
          <Grid container direction="row" justifyContent="space-evenly" mx={3}>
            <Progress variant="gradient" color="error" value="84" />
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              23/2/2023
            </MDTypography>
          </Grid>
        ),
        deviation: <MDBadge badgeContent="לא" color="success" size="sm" container />,
      },
      {
        Tzadik: "214421",
        sadac: "12743",
        estimatedDate: (
          <Grid container direction="row" justifyContent="space-evenly" mx={3}>
            <Progress variant="gradient" color="error" value="100" />
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              25/2/2023
            </MDTypography>
          </Grid>
        ),
        deviation: <MDBadge badgeContent="כן" color="error" size="sm" container />,
      },
      {
        Tzadik: "9067876",
        sadac: "32344",
        estimatedDate: (
          <Grid container direction="row" justifyContent="space-evenly" mx={3}>
            <Progress variant="gradient" color="mekatnar" value="50" />

            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
              28/2/2023
            </MDTypography>
          </Grid>
        ),
        deviation: <MDBadge badgeContent="לא" color="success" size="sm" container />,
      },
    ],

    // rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}

// rows: [
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     fileID: "33213",
//     name: "אאאא",
//     units: (
//     <Link to={`/adminFeild`}>
//     <MDButton
//       variant="gradient"
//       color="mekatnar"
//       // onClick={() => {
//       //   // setIsInfoPressed(true);
//       //   // setpressedID(hozla._id);
//       // }}
//       circular="true"
//       iconOnly="true"
//       size="medium"
//     >
//       <Icon>edit</Icon>
//     </MDButton>
//   </Link>
//   )
//   },
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     fileID: "44321",
//     name: "בבבבב",
//     units: (
//     <Link to={`/adminFeild`}>
//     <MDButton
//       variant="gradient"
//       color="mekatnar"
//       // onClick={() => {
//       //   // setIsInfoPressed(true);
//       //   // setpressedID(hozla._id);
//       // }}
//       circular="true"
//       iconOnly="true"
//       size="medium"
//     >
//       <Icon>edit</Icon>
//     </MDButton>
//   </Link>
//   )
//   },
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     fileID: "764123",
//     name: "גגגגג",
//     units: (
//     <Link to={`/adminFeild`}>
//     <MDButton
//       variant="gradient"
//       color="mekatnar"
//       // onClick={() => {
//       //   // setIsInfoPressed(true);
//       //   // setpressedID(hozla._id);
//       // }}
//       circular="true"
//       iconOnly="true"
//       size="medium"
//     >
//       <Icon>edit</Icon>
//     </MDButton>
//   </Link>
//   )
//   },
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     fileID: "546323",
//     name: "דדדדד",
//     units: (
//     <Link to={`/adminFeild`}>
//     <MDButton
//       variant="gradient"
//       color="mekatnar"
//       // onClick={() => {
//       //   // setIsInfoPressed(true);
//       //   // setpressedID(hozla._id);
//       // }}
//       circular="true"
//       iconOnly="true"
//       size="medium"
//     >
//       <Icon>edit</Icon>
//     </MDButton>
//   </Link>
//   )
//   },
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     fileID: "433324",
//     name: "ההההה",
//     units: (
//     <Link to={`/adminFeild`}>
//     <MDButton
//       variant="gradient"
//       color="mekatnar"
//       // onClick={() => {
//       //   // setIsInfoPressed(true);
//       //   // setpressedID(hozla._id);
//       // }}
//       circular="true"
//       iconOnly="true"
//       size="medium"
//     >
//       <Icon>edit</Icon>
//     </MDButton>
//   </Link>
//   )
//   },
//   {
//     // project: <Project image={LogoAsana} name="Asana" />,
//     fileID: "434690",
//     name: "ווווו",
//     units: (
//     <Link to={`/adminFeild`}>
//     <MDButton
//       variant="gradient"
//       color="mekatnar"
//       // onClick={() => {
//       //   // setIsInfoPressed(true);
//       //   // setpressedID(hozla._id);
//       // }}
//       circular="true"
//       iconOnly="true"
//       size="medium"
//     >
//       <Icon>edit</Icon>
//     </MDButton>
//   </Link>
//   )
//   },
// ],
