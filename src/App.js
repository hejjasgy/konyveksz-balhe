import './App.css';
import {Container, Grid, Snackbar} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import BookPage from "./components/BookPage";
import {Alert} from "@mui/lab";
import {useState} from "react";
import AddBookPage from "./components/AddBookPage";

function App() {
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [getSnackbarMessage, setSnackbarMessage] = useState("");
    const [getSnackbarType, setSnackbarType] = useState("success");

    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
      <Container>
          <NavBar/>

          <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity={getSnackbarType} sx={{width: '100%'}}>
                  {getSnackbarMessage}
              </Alert>
          </Snackbar>

        <Routes>
            <Route path="/" element={<HomePage setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarType={setSnackbarType}/>}/>
            <Route path="/konyvek/:konyvID" element={<BookPage setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarType={setSnackbarType}/>}/>
            <Route path="/konyvek/:konyvID/:torles" element={<BookPage setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarType={setSnackbarType}/>}/>
            <Route path="/uj-konyv" element={<AddBookPage setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarType={setSnackbarType}/>}/>

        </Routes>
      </Container>
  );
}

export default App;
