import { Card, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import url from '../../config';

const Profile = () => {
    const id = localStorage.getItem("user")
    const [user, setUser] = useState([]);
    const [recentdata, setRecenteData] = useState([]);
    useEffect(() => {
        axios.get(`${url}/user/${id}`)
            .then((res) => {
                setUser(res.data)
                if (window.document.referrer === "http://localhost:3000/login") {
                    toast.success("Successfully login");
                }
            })
            .catch((err) => console.log(err))
        axios.get(`${url}/job/apply/all`)
            .then((res) => {
                setRecenteData(res.data.slice(-4,).reverse())
            })
            .catch((err) => console.log(err))
    }, []);
    return <div className=''>
        {
            user.length === 0 ?
                <div className="text-center">
                    <CircularProgress color="secondary" />
                </div> :
                <>
                    <div>
                        <div className="cover">
                        </div>
                        <Card className='profile admin row container mb-4'>
                            <Grid container spacing={2}>
                                <Grid item className='image-name' xs={12} sm={1}>
                                    <img className='my-4' src={user.pic} height={"100px"} width={"100px"} alt="" srcset="" />
                                </Grid>
                                <Grid item className='name mx-4' xs={12} sm={8}>
                                    <h4>{user.name}</h4>
                                    <p className='text-secondary'>HR Manager</p>
                                </Grid>
                                </Grid>
                                <hr />
                                <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <h5 className="title my-4 mx-0">Profile Deatils</h5>

                                    <Typography
                                        variant="h6"
                                        className="mt-2"
                                        sx={{ textAlign: "left" }}
                                    >
                                        <EmailIcon color="primary" /> &nbsp;&nbsp;&nbsp;{user.email}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        className="mt-2"
                                        sx={{ textAlign: "left" }}
                                    >
                                        <PhoneIcon color="primary" /> &nbsp;&nbsp;&nbsp;{user.phone}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <h5 className="title my-4 mx-0"> Recently Added Application</h5>
                                    <Grid className='row' spacing={2}>
                                        {
                                            recentdata.map((application) => (
                                                <Grid className='my-4' sm={6}>
                                                    <Card className='app-card p-3'>
                                                        <p className='designation'>{application.designation}</p>
                                                        <p>Name :- {application.name}</p>
                                                        <p>Status :- {application.ApplicationStatus}</p>
                                                        <p>Employee Status :- {application.employStatus}</p>
                                                        <button className="btn text-white">View Application</button>
                                                    </Card>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                </>
        }
    </div>;
};

export default Profile;
