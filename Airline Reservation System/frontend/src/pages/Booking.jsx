import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './Navbar'
import HiveSharpIcon from '@mui/icons-material/HiveSharp';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {MuiTelInput} from 'mui-tel-input'
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {useEffect, useState} from "react";
import axios from "axios";

export default function CustomizedSelects() {

    function Label({componentName, valueType, isProOnly}) {

        const content = (
            <span>
                <strong>{componentName}</strong>
                for {valueType}
                editing
            </span>
        );
    }

    //empty variables
    const [originAirports, setOriginAirports] = useState([]);
    const [targetAirports, setTargetAirports] = useState([]);
    const [originAirport, setOriginAirport] = React.useState('');
    const [targetAirport, setTargetAirport] = React.useState('');
    //empty time variables
    const [depature_time, setDepature] = React.useState(null);
    const [arrival_time, setArrival] = React.useState(null);


    useEffect(() => {
        // Make an API request to your backend to get the list of airports
        fetch('http://localhost:8000/location/airports')
            .then((response) => response.json())
            .then((data) => {
                setOriginAirports(data);
                setTargetAirports(data);
            })
            .catch((error) => {
                console.error('Error fetching airports:', error);
            });
    }, []); // The empty dependency array ensures the effect runs only once on component mount

    const handleOriginAirportChange = (event) => { // handle origin change
        setOriginAirport(event.target.value);
    };
    const handleTargetAirportChange = (event) => { // handle origin change
        setTargetAirport(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    };
    // const handleClick = async e =>{
    //     setFlights((prev) => ({...prev, "departure_time": depature_time.format()}));
    //     setFlights((prev) => ({...prev, "arrival_time": arrival_time.format()}));
    //     // console.log(flights)
    //     e.preventDefault()
    //     try{
    //         console.log(flights)
    //         await axios.post("http://localhost:8000/flight",flights)
    //         navigate("/flight")
    //     }catch(err){
    //         console.log(err);
    //     }
    // }



    return ( <>
            <NavBar/> <Container component = "main" maxWidth = "xs" >  < Box sx = {{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: "20vh"
        }} > <Avatar sx={{
            m: 1,
            bgcolor: '#000000'
        }}>
            <HiveSharpIcon/>
        </Avatar> < Typography component = "h1" variant = "h5" > Booking </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Box sx={{marginTop:2, marginBottom:1}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Origin Airport</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-1"
                            value={originAirport}
                            label="originAirport"
                            autoFocus
                            onChange={handleOriginAirportChange}
                           >
                            {originAirports.map((originAirport) => (
                                <MenuItem key={originAirport.location_id} value={originAirport.location_id}>
                                    {originAirport.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{marginTop:2, marginBottom:1}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Target Airport</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-2"
                            value={targetAirport}
                            label="targetAirport"
                            onChange={handleTargetAirportChange}
                        >
                            {targetAirports.map((targetAirport) => (
                                <MenuItem key={targetAirport.location_id} value={targetAirport.location_id}>
                                    {targetAirport.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{marginTop:2, marginBottom:1}}>
                    <LocalizationProvider dateAdapter = {AdapterDayjs} >
                        <DemoItem >
                            <DatePicker
                                label="Departure Date"
                                //onChange={handleOriginAirportChange}
                            />
                        </DemoItem>
                    </LocalizationProvider>
                </Box>

                <Box sx={{marginTop:2, marginBottom:1}}>
                    <LocalizationProvider dateAdapter = {AdapterDayjs} >
                        <DemoItem >
                            <DatePicker
                                label="Origin Date"
                                //onChange={handleTargetAirportChange}
                            />
                        </DemoItem>
                    </LocalizationProvider>
                </Box>

                < Button type = "submit" fullWidth variant = "contained" sx = {{ mt: 6, mb: 2, backgroundColor:"black" }}> Search Flights </Button>

            </Box > </Box> </Container>
        </>
    );
}
