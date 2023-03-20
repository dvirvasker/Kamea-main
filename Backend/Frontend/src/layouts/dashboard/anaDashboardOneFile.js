/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
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
import Grid from "@mui/material/Grid";
import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PieChart from "examples/Charts/PieChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import { Tab } from "@mui/material";
import axios from "axios";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
// import { mainExample } from "merageJasonExcelFiels";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import DashboardHeader from "./components/DashboardAnaOneFile";

function Dashboard() {
  const params = useParams();
  const { sales, tasks } = reportsLineChartData;
  const [tabView, setTabView] = useState(0);

  // ? Our tree info all from DB
  const [mahlakot, setMahlakot] = useState([]);
  const [plogot, setPlogot] = useState([]);
  const [gdodim, setGdodim] = useState([]);
  const [hativa, setHativa] = useState({ id: "63be8ba2f3509cdcccdee91f", name: "גולני" });

  const [showDataPartition, setShowDataPartition] = useState(false);
  const [showRepeatedAlerts, setShowRepeatedAlerts] = useState(false);
  // ? user Choise
  const [selectedVaules, setSelectedVaules] = useState({
    mahlaka: "",
    ploga: "",
    gdod: "",
  });
  const [excelData, setExcelData] = useState({
    rangeOfDates: "",
    excelDataFile: "",
    createdAt: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hozlaRequests/getExcelData/${params.formID}`)
      .then((response) => {
        // console.log(`the object data`);
        console.log(response.data);
        setExcelData({
          ...excelData,
          rangeOfDates: response.data.rangeOfDates,
          createdAt: response.data.createdAt.split("T")[0],
          excelDataFile: response.data.excelData,
        });
        // setExcelData(response);
        // console.log(excelData);
        console.log(params.formID);

        // setFormData(response.data);
        // setdates({
        //   workGivenDate: response.data.workGivenDate.split("T")[0],
        //   workRecivedDate: response.data.workRecivedDate.split("T")[0],
        // });
        // setClientNote(response.data.clientNote.split("\n"));
        // setPropPrint(JSON.parse(response.data.propPrints));
        // console.log(propPrint);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
        // if (error.code === "ERR_BAD_REQUEST") {
        //   setError404(true);
        // } else {
        //   setErrorDB(true);
        // }
      });
  }, []);
  // useMemo(() => {
  //   if (typeof window !== "undefined") {
  //     setTabView(JSON.parse(localStorage.getItem("dashboardView")));
  //     console.log("=====================================");
  //   }
  // }, [localStorage.getItem("dashboardView")]);

  //   useEffect(() => {
  //     axios
  //       .post(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/mahlakaByHativaId/`, {
  //         hativa: hativa.id,
  //       })
  //       .then((response) => {
  //         // console.log(response.data);
  //         if (response.data.length !== 0 || response.data.length !== undefined) {
  //           setMahlakot(response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     axios
  //       .post(`http://localhost:5000/NGmedDB/treeMangment/ploga/plogaByHativaId/`, {
  //         hativa: hativa.id,
  //       })
  //       .then((response) => {
  //         // console.log(response.data);
  //         if (response.data.length !== 0 || response.data.length !== undefined) {
  //           setPlogot(response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     axios
  //       .post(`http://localhost:5000/NGmedDB/treeMangment/gdod/gdodsByHativaId/`, {
  //         hativa: hativa.id,
  //       })
  //       .then((response) => {
  //         // console.log(response.data);
  //         if (response.data.length !== 0 || response.data.length !== undefined) {
  //           setGdodim(response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);
  function handleChangeSelect(evt) {
    const { value } = evt.target;
    setSelectedVaules({ ...selectedVaules, [evt.target.name]: value });
  }
  const mahlakaView = () => (
    <MDBox py={3}>
      {/*  <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <FormGroup>
              <Input
                // placeholder={textPlaceHolderInputs[5]}
                id="mahlaka"
                name="mahlaka"
                type="select"
                value={selectedVaules.mahlaka}
                onChange={handleChangeSelect}
                // required
              >
                <option defult value="" disabled>
                  בחר מחלקה
                </option>
                {mahlakot.map((mahlaka, index) => (
                  <option key={`mahlaka-${index}`} id={index} value={mahlaka._id}>
                    {mahlaka.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="mekatnar"
              icon="calendar_month"
              title="טווחי תאריכים"
              count={excelData.rangeOfDates}
              percentage={{
                color: "success",
                label: "הועלה ב ",
                amount: excelData.createdAt,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="access_time"
              title="זמן ממוצע לעצירת רכב"
              count="20 שניות"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="access_time"
              title="זמן חציוני לעצירת רכב"
              count="23 שניות"
              percentage={{
                color: "success",
                amount: "",
                label: "",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="taxi_alert"
              title="כמות התרעות"
              count="103"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid> */}
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "place" }}
                title="פילוח מקומות"
                description="המקומות בהם היו הרכב"
                chart={{
                  labels: ["ז''י", "צפון", "מרכז", "דרום"],
                  datasets: {
                    label: "פילוח מקומות",
                    backgroundColors: ["dark", "success", "mekatnar", "error"],
                    data: [30, 20, 60, 30],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "report_gmailerrorred" }}
                title="פילוח התרעות"
                description="התרעות שהיו ברכב"
                chart={{
                  labels: ["a", "s"],
                  datasets: {
                    label: "פילוח התרעות",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [70, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <ReportsLineChart
              color="mekatnar"
              title="התרעות חוזרות"
              description={
                <TimelineList title="Timeline">
                  <MDButton
                    variant="text"
                    color="mekatnar"
                    fullWidth
                    onClick={() => {
                      setShowRepeatedAlerts(!showRepeatedAlerts);
                    }}
                  >
                    <Icon>unfold_more</Icon>
                  </MDButton>
                  {showRepeatedAlerts && (
                    <>
                      <TimelineItem
                        color="error"
                        icon="notifications"
                        title="$2400 Design changes"
                        dateTime="22 DEC 7:20 PM"
                        description="110 High engine temperature"
                        badges={["design"]}
                      />
                      <TimelineItem
                        color="error"
                        icon="notifications"
                        title="New order #1832412"
                        dateTime="21 DEC 11 PM"
                        description="Engine temperature is above 115"
                        badges={["order", "#1832412"]}
                      />
                      <TimelineItem
                        icon="notification_important"
                        title=""
                        dateTime="21 DEC 9:34 PM"
                        description=""
                        badges={["server", "payments"]}
                        lastItem
                      />
                    </>
                  )}
                </TimelineList>
              }
              date="just updated"
              chart={{
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: {
                  label: "Sales",
                  data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                },
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6}>
            
          </Grid> */}
          <Grid item xs={12} md={12} lg={12}>
            <HorizontalBarChart
              icon={{ color: "mekatnar", component: "leaderboard" }}
              title="סה''כ חלוקות מענה"
              description={
                <MDButton
                  variant="text"
                  color="mekatnar"
                  iconOnly
                  onClick={() => {
                    setShowDataPartition(!showDataPartition);
                  }}
                >
                  <Icon>unfold_more</Icon>
                </MDButton>
              }
              chart={{
                labels: ["0-5", "5-15", "15-30", "30-40", "40-50", "50-60", "60-120", "120+"],
                datasets: [
                  {
                    label: "דקות",
                    color: "secondary",
                    data: [95, 40, 22, 10, 50, 35, 12, 70],
                  },
                ],
              }}
            />
          </Grid>

          {showDataPartition && (
            <>
              <Grid item xs={12} md={6} lg={6}>
                <HorizontalBarChart
                  icon={{ color: "mekatnar", component: "leaderboard" }}
                  title="ז''י"
                  description="חלוקת מענה בז''י בדקות"
                  chart={{
                    labels: ["0-5", "5-15", "15-30", "30-40", "40-50", "50-60", "60-120", "120+"],
                    datasets: [
                      {
                        label: "דקות",
                        color: "dark",
                        data: [15, 20, 12, 60, 20, 15, 12, 60],
                      },
                    ],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <HorizontalBarChart
                  icon={{ color: "mekatnar", component: "leaderboard" }}
                  title="צפון"
                  description="חלוקת מענה בצפון בדקות"
                  chart={{
                    labels: ["0-5", "5-15", "15-30", "30-40", "40-50", "50-60", "60-120", "120+"],
                    datasets: [
                      {
                        label: "דקות",
                        color: "success",
                        data: [35, 10, 12, 40, 80, 15, 42, 20],
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <HorizontalBarChart
                  icon={{ color: "mekatnar", component: "leaderboard" }}
                  title="מרכז"
                  description="חלוקת מענה במרכז בדקות"
                  chart={{
                    labels: ["0-5", "5-15", "15-30", "30-40", "40-50", "50-60", "60-120", "120+"],
                    datasets: [
                      {
                        label: "דקות",
                        color: "mekatnar",
                        data: [15, 40, 32, 50, 70, 85, 22, 10],
                      },
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <HorizontalBarChart
                  icon={{ color: "mekatnar", component: "leaderboard" }}
                  title="דרום"
                  description="חלוקת מענה בדרום בדקות"
                  chart={{
                    labels: ["0-5", "5-15", "15-30", "30-40", "40-50", "50-60", "60-120", "120+"],
                    datasets: [
                      {
                        label: "דקות",
                        color: "error",
                        data: [15, 40, 52, 20, 21, 15, 48, 90],
                      },
                    ],
                  }}
                />
              </Grid>
            </>
          )}

          {/* <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid> */}
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );

  const plogaView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <FormGroup>
              {/* <Label for="ploga">פלוגה</Label> */}
              <Input
                // placeholder={textPlaceHolderInputs[5]}
                id="ploga"
                name="ploga"
                type="select"
                value={selectedVaules.ploga}
                onChange={handleChangeSelect}
                // required
              >
                <option defult value="" disabled>
                  בחר פלוגה
                </option>
                {plogot.map((ploga, index) => (
                  <option key={`ploga-${index}`} id={index} value={ploga._id}>
                    {ploga.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          {" "}
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים בפלוגה"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );

  const gdodView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <FormGroup>
              {/* <Label for="gdod">גדוד</Label> */}
              <Input
                // placeholder={textPlaceHolderInputs[5]}
                id="gdod"
                name="gdod"
                type="select"
                value={selectedVaules.gdod}
                onChange={handleChangeSelect}
                // required
              >
                <option defult value="" disabled>
                  בחר גדוד
                </option>
                {gdodim.map((gdod, index) => (
                  <option key={`gdod-${index}`} id={index} value={gdod._id}>
                    {gdod.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים בגדוד"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );

  const hativaView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
              {hativa.name}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים חטיבה"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <DashboardHeader tabViewValue={tabView} setTabViewValue={setTabView} />
      {/* {mainExample()} */}
      {/* <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
        {tabView}
      </MDTypography> */}
      {
        tabView === 0 //* mahlaka view
          ? mahlakaView()
          : tabView === 1 //* ploga view
          ? plogaView()
          : tabView === 2 //* gdod view
          ? gdodView()
          : hativaView() //* hativa view
      }

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
