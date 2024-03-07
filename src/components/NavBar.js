import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();

    const handleNavigateTo = (value) => {
        navigate(value)
    };

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        key={"konyvek"}
                        onClick={()=>{handleNavigateTo("/")}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >Könyvek</Button>

                    <Button
                        key={"uj-knyvek"}
                        onClick={()=>{handleNavigateTo("/uj-konyv")}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >Új könyv</Button>

                </Toolbar>
            </Container>
        </AppBar>
    )
}