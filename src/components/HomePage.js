import {
    Backdrop,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardMedia,
    CircularProgress,
    Container,
    Grid, IconButton,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {DeleteOutline, DeleteOutlined, EditOutlined, RemoveOutlined} from "@mui/icons-material";

function CheckCircleOutlined(props){
    return null;
}

CheckCircleOutlined.propTypes = {style: PropTypes.shape({color: PropTypes.string, marginLeft: PropTypes.string})};
export default function HomePage(){
    const navigate = useNavigate();
    const [getKonyvek, setKonyvek] = useState({});
    const [isLoadingPending, setLoadingPending] = useState(true);
    const [isUpdating, setUpdating] = useState(false);

    useEffect(() => {
        setLoadingPending(true)

        fetch("https://localhost:5001/Konyv").then(async(response) => {
            const data = await response.json();
            setKonyvek(data)
            setLoadingPending(false)
        }).catch((error) => {
            console.log(error)
        })

    }, [isUpdating]);

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

    return(
        <Container sx={{textAlign:"center"}}>
            <Typography variant="h3" component="h3">
                Könyvek
            </Typography>

            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                  sx={{margin:"20px 0px"}}
                spacing={2}>
                {getKonyvek.map(konyv => (
                    <Card sx={{width: 345, marginInline: "10px", marginBlock:"10px"}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h8" component="div" sx={{color:"gray", fontWeight:"bold"}}>
                                    Könyv neve: {konyv.nev}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Kiadás éve: {konyv.kiadasEve}
                                </Typography>
                                <Typography gutterBottom variant="h8" component="div">
                                    Könyv értékelése: {konyv.ertekeles}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                height="525"
                                image={konyv.kepneve}
                                alt={konyv.nev + " borító"}
                                onClick={()=>{handleNavigateTo("konyvek/" + konyv.id)}}
                            />
                            <CardActions sx={{display:"flex", justifyContent:"center"}}>
                                <IconButton aria-label="edit">
                                    <EditOutlined onClick={()=>{handleNavigateTo("konyvek/" + konyv.id)}} />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteOutlined onClick={()=>{handleNavigateTo("konyvek/" + konyv.id + "/torles")}} />
                                </IconButton>
                            </CardActions>
                        </CardActionArea>
                    </Card>

                ))}
            </Grid>

        </Container>
    );
}