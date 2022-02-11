import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControlLabel, Typography } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from '@mui/icons-material/Person';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { Radio, RadioGroup } from "@mui/material";
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import url from "../../config";
import emailjs from '@emailjs/browser'

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d82f8",
    },
    secondary: {
      main: "rgb(196,209,64)",
    },
  },
});

export default function CandidateDetails() {
  const { id } = useParams();
  const [candidate, setcandidate] = useState([]);
  const [application, setapplication] = useState("");
  const [status, setstatus] = useState("");

  React.useEffect((e) => {
    axios.get(`http://localhost:5000/job/apply/one/${id}`).then((value) => {
      console.log(value);
      setcandidate(value.data);
    });
  }, []);

  const handleStatus = (e) => {
    setstatus(e.target.value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const emaildata = {
      to_name:candidate.name,
      to_email:candidate.email,
      designation:candidate.designation
    }
    if(status === "Approve") {
      emailjs.send("service_8b9bgx1","template_approve",emaildata,"user_bNQsTrJpBB3n1BSg7wlfG")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    };
    if(status === "Reject") {
      emailjs.send("service_8b9bgx1","template_reject",emaildata,"user_bNQsTrJpBB3n1BSg7wlfG")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    };
    const data = {
      status: status,
    };
    axios
      .post(`${url}/job/apply/change-status/${id}`, data)
      .then((value) => {
        window.location.reload()
      });
  };
  return (
    <div style={{marginTop:"-50px"}} className="admin row container text-center">
      {
        candidate.length !== 0 ?
          <Grid className="status-card" xs={12} container spacing={2}>
            <Grid xs={6}>
              <Card className="detail-card" sx={{ height: 650, justifyContent: "center" }}>
                <CardContent>
                  <Typography style={{ marginBlock: "30px" }} variant="h4" component="div" color="primary">
                    {candidate.designation}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20, marginBlock: "50px" }}
                    color="text.secondary"
                  >

                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    <PersonIcon color="primary" />&nbsp;&nbsp;&nbsp; {candidate.name} ( {candidate.employStatus} )
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-2"
                    sx={{ textAlign: "left" }}
                  >
                    <EmailIcon color="primary" /> &nbsp;&nbsp;&nbsp;{candidate.email}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-2"
                    sx={{ textAlign: "left" }}
                  >
                    <PhoneIcon color="primary" /> &nbsp;&nbsp;&nbsp;{candidate.phone}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="mt-2"
                    sx={{ textAlign: "left" }}
                  >
                    <EventIcon color="primary" />&nbsp;&nbsp;&nbsp; {candidate.date}
                  </Typography>

                  {
                    candidate.Reference.refname === "" ?
                      <>
                        <Typography
                          variant="h6"
                          className="mt-2"
                          sx={{ textAlign: "left" }}
                        >
                          <ContactMailIcon color="primary" />  &nbsp;&nbsp;&nbsp; --- ---
                        </Typography>
                      </>
                      :
                      <>
                        <Typography
                          variant="h6"
                          className="mt-2"
                          sx={{ textAlign: "left" }}
                        >
                          <ContactMailIcon color="primary" /> &nbsp;&nbsp;&nbsp; {candidate.Reference.refname} ( {candidate.Reference.refphone} )
                        </Typography>
                      </>
                  }
                  <Grid style={{ textAlign: "start" }}>
                    <Typography variant="h6" className="mt-2">
                      <EqualizerIcon color="primary" />
                      {
                        candidate.ApplicationStatus === "Pending" ?
                          <span className="status text-warning">&nbsp;&nbsp;&nbsp;{candidate.ApplicationStatus}</span>
                          : null
                      }
                      {
                        candidate.ApplicationStatus === "Approve" ?
                          <span className="status text-success">&nbsp;&nbsp;&nbsp;{candidate.ApplicationStatus}</span>
                          : null
                      }
                      {
                        candidate.ApplicationStatus === "Reject" ?
                          <span className="status text-danger">&nbsp;&nbsp;&nbsp;{candidate.ApplicationStatus}</span>
                          : null
                      }
                    </Typography>
                  </Grid>
                  {
                    candidate.ApplicationStatus === "Approve" || candidate.ApplicationStatus === "Reject" ?
                      null :
                      <>
                        <hr />
                        <Typography variant="h6" className="mt-2">
                          Change Application Status
                        </Typography>
                        <RadioGroup onChange={(e) => setapplication(e.target.value)}>
                          <FormControlLabel
                            className="mt--2"
                            value="Approve"
                            control={<Radio />}
                            label="Approve"
                            onClick={handleStatus}
                          />
                          <FormControlLabel
                            value="Reject"
                            control={<Radio />}
                            label="Reject"
                            onClick={handleStatus}
                          />
                        </RadioGroup>
                        {application !== "" ?
                          <Button
                            className="btn text-white"
                            onClick={(e) => handleSave(e)}
                          >
                            Save
                          </Button>
                          :
                          <Button
                            className="btn text-white"
                            onClick={(e) => handleSave(e)}
                            disabled
                          >
                            Save
                          </Button>
                        }
                      </>
                  }
                </CardContent>

              </Card>
            </Grid>
            <Grid xs={6}>
              <Card className="detail-card" sx={{ height: 650, justifyContent: "center" }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                  <Viewer fileUrl={candidate.Resume} />
                </Worker>
              </Card>
            </Grid>
          </Grid>
          : null
      }
    </div>
  );
}