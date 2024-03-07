import {
    Avatar,
    Backdrop, Button, ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardMedia,
    CircularProgress,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid, IconButton, Stack, TextField,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {DeleteOutline, DeleteOutlined, EditOutlined, RemoveOutlined, SaveOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

export default function AddBookPage(props){
    const navigate = useNavigate();
    const [getKonyv, setKonyv] = useState({
        id:"0",
        nev:"",
        kiadasEve:"2024",
        ertekeles:"",
        kepneve:""
    });
    const [isSomethingChanging, setSometingChanging] = useState(false);

    const fetchURL = "https://localhost:5001/Konyv/";

    const handleNavigateTo = (value) => {
        navigate(value)
    };

    const handleChange = (event) => {
        setKonyv(prevState => ({...prevState,
            [event.target.name]: event.target.value
        }));
    };

    function openSnackbar(type, message){
        props.setSnackbarType(type)
        props.setSnackbarMessage(message);
        props.setSnackbarOpen(true)
    }

    function handleSave(){
        setSometingChanging(true)

        fetch(fetchURL,{
            headers:{"Content-type":"application/json"},
            method:"POST",
            body: JSON.stringify(getKonyv)}
        ).then((response) => {
            handleNavigateTo("/")
            openSnackbar("success", "Sikeres módosítás")
        }).catch((error) => {
            openSnackbar("error", error)
        }).finally(()=>{
            setSometingChanging(false)
        })

    }

    return(
        <Container sx={{textAlign:"center"}}>
            <Typography variant="h3" component="h3">
                {getKonyv.nev}
            </Typography>

            <Grid container spacing={2} sx={{marginBlock:"10px"}}>
                <Grid item xs={4}>
                    <Avatar
                        alt={getKonyv.nev}
                        src={getKonyv.kepneve}
                        sx={{ width: 345, height: 525, borderRadius:8}}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Stack spacing={2}>
                        <TextField fullWidth label="Név" id="nev" name="nev" value={getKonyv.nev} onChange={handleChange}/>
                        <TextField fullWidth label="Kiadás éve" id="kiadasEve" name="kiadasEve" type="number" value={getKonyv.kiadasEve} onChange={handleChange}/>
                        <TextField fullWidth label="Értékelés" id="ertekeles" name="ertekeles" type="number" value={getKonyv.ertekeles} onChange={handleChange}/>
                        <TextField fullWidth label="Kép elérési útvonala" name="kepneve" id="kepneve" type="url" value={getKonyv.kepneve} onChange={handleChange}/>


                        <ButtonGroup aria-label="">
                            <LoadingButton
                                loading={isSomethingChanging}
                                loadingPosition="start"
                                startIcon={<SaveOutlined />}
                                onClick={handleSave}
                                variant="outlined">
                                Mentés
                            </LoadingButton>
                        </ButtonGroup>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}