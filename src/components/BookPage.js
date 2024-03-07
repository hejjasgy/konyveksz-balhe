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

export default function BookPage(props){
    const navigate = useNavigate();
    const params = useParams();
    const [getKonyv, setKonyv] = useState({});
    const [isLoadingPending, setLoadingPending] = useState(true);
    const [isSomethingChanging, setSometingChanging] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchURL = "https://localhost:5001/Konyv/" + params.konyvID;

    useEffect(() => {
        setLoadingPending(true)

        fetch(fetchURL).then(async(response) => {
            const data = await response.json();
            setKonyv(data)
            setLoadingPending(false)

            if(params.torles != null){
                setOpen(true)
            }
        }).catch((error) => {
            console.log(error)
        })

    }, [isSomethingChanging]);

    if(isLoadingPending){
        return(
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoadingPending}>
            <CircularProgress color="inherit" />
        </Backdrop>)
    }

    const handleNavigateTo = (value) => {
        navigate(value)
    };

    const handleChange = (event) => {
        setKonyv(prevState => ({...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete(){
        handleClose()

        setSometingChanging(true)

        fetch(fetchURL,{
            headers:{"Content-type":"application/json"},
            method:"DELETE"}
        ).then((response) => {
            openSnackbar("success", "Sikeres törlés")
            handleNavigateTo("/");
        }).catch((error) => {
            openSnackbar("error", error)
        }).finally(()=>{
            setSometingChanging(false)
        })
    }

    function openSnackbar(type, message){
        props.setSnackbarType(type)
        props.setSnackbarMessage(message);
        props.setSnackbarOpen(true)
    }

    function handleSave(){
        setSometingChanging(true)

        fetch(fetchURL,{
            headers:{"Content-type":"application/json"},
            method:"PUT",
            body: JSON.stringify(getKonyv)}
        ).then((response) => {
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
                                startIcon={<DeleteOutlined />}
                                color="error"
                                onClick={()=>{setOpen(true)}}
                                variant="outlined">
                                Törlés
                            </LoadingButton>
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


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="torles"
                aria-describedby="torlesss"
            >
                <DialogTitle id="delete_dialog">
                    {"Biztos, hogy törlöd a könyvet?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete_dialog_diesciption">
                        A könyv törlésével véglegesen törlöd az adatbázisból. Törlöd?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Inkább nem</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Naná
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}