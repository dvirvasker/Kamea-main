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
import MDAlert from "components/MDAlert";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
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
      { Header: "סוג אירוע", accessor: "eventType", align: "center" },
      // { Header: "סוג רכב", accessor: "typeRequest", align: "center" },
      // { Header: "שם הרכב", accessor: "name", align: "center" },
      { Header: "סוג רכב", accessor: "carType", align: "center" },
      { Header: "חלוקה", accessor: "haloka", align: "center" },
      { Header: "תאריך", accessor: "date", align: "center" },
      { Header: "זמן עצירה", accessor: "stopTime", align: "center" },
      { Header: "פעילות מונעת", accessor: "preventing", align: "center" },
      { Header: "חיסכון פוטנציאלי", accessor: "saving", align: "center" },
      // { Header: "שווא", accessor: "shav", align: "center" },
      // { Header: "חוסר בנוזל", accessor: "lackfluid", align: "center" },
      // { Header: "תיקון נזילה", accessor: "leakrepair", align: "center" },
      // { Header: "תיקון מכלול", accessor: "repairassembly", align: "center" },
      // { Header: "מנוע", accessor: "engine", align: "center" },
      // { Header: "בירור", accessor: "clarification", align: "center" },
    ],
    rows: [
      {
        eventType: "122",
        Tzadik: "1232142",
        carType: "ford",
        haloka: "פיקוד",
        date: "2/2/2023",
        stopTime: "14:23",
        preventing: (
          <MDBadge badgeContent="שווא" color="success" size="sm" variant="contained" container />
        ),
        saving: "120",
        shav: "aaa",
        lackfluid: <MDBadge badgeContent="שמן" color="warning" size="sm" container />,
        leakrepair: "דדד",
        repairassembly: "דדד",
        engine: "גגג",
        clarification: "aaa bbb cccc ddd ee",
      },
      {
        eventType: "123",
        Tzadik: "4354356",
        carType: "ford",
        haloka: "חטמ''ר",
        date: "2/2/2023",
        stopTime: "12:45",
        preventing: (
          <MDBadge badgeContent="חוסר בנוזל" color="info" size="sm" variant="contained" container />
        ),
        saving: "2500",
        shav: "aaa",
        lackfluid: <MDBadge badgeContent="קירור" color="info" size="sm" container />,
        leakrepair: "rrr",
        repairassembly: "rrr",
        engine: "rrr",
        clarification: "ggg sss bbb aaaa ee",
      },
      {
        eventType: "100",
        Tzadik: "756434",
        carType: "jeep",
        haloka: "אוגדה",
        date: "10/2/2023",
        stopTime: "12:52",
        preventing: (
          <MDBadge
            badgeContent="תיקון נזילה"
            color="dark"
            size="sm"
            variant="contained"
            container
          />
        ),
        saving: "1200",
        shav: "בבב",
        lackfluid: <MDBadge badgeContent="קירור" color="info" size="sm" container />,
        leakrepair: "נננ",
        repairassembly: "נננ",
        engine: "נננ",
        clarification: "eee fff sss qqq",
      },
      {
        eventType: "100",
        Tzadik: "3344521",
        carType: "ford",
        haloka: "פיקוד",
        date: "23/1/2023",
        stopTime: "14:23",
        preventing: (
          <MDBadge
            badgeContent="תיקון מכלול"
            color="primary"
            size="sm"
            variant="contained"
            container
          />
        ),
        saving: "120",
        shav: "aaa",
        lackfluid: <MDBadge badgeContent="שמן" color="warning" size="sm" container />,
        leakrepair: "דדד",
        repairassembly: "דדד",
        engine: "גגג",
        clarification: "aaa bbb cccc ddd ee",
      },
      {
        eventType: "128",
        Tzadik: "9076432",
        carType: "jeep",
        haloka: "חטמ''ר",
        date: "2/3/2023",
        stopTime: "16:45",
        preventing: (
          <MDBadge badgeContent="מנוע" color="error" size="sm" variant="contained" container />
        ),
        saving: "2500",
        shav: "aaa",
        lackfluid: <MDBadge badgeContent="קירור" color="info" size="sm" container />,
        leakrepair: "qqq",
        repairassembly: "qqq",
        engine: "qqq",
        clarification: "ggg sss bbb aaaa ee",
      },
      {
        eventType: "343",
        Tzadik: "342356",
        carType: "jeep",
        haloka: "חטמ''ר",
        date: "2/3/2023",
        stopTime: "19:45",
        preventing: (
          <MDBadge
            badgeContent="בירור במוסך"
            color="warning"
            size="sm"
            variant="contained"
            container
          />
        ),
        saving: "344",
        shav: "sss",
        lackfluid: <MDBadge badgeContent="קירור" color="info" size="sm" container />,
        leakrepair: "www",
        repairassembly: "www",
        engine: "www",
        clarification: "eee sss 333 rrr ee",
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
