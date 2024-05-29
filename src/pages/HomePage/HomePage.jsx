import { Container, Grid, Paper, Typography , Divider , Button} from '@mui/material';
import CardComponent from "../../components/CardComponent";
import { useContext, useEffect, useState , useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import normalizeHome from "./normalizeHome";
import LoginContext from "../../store/loginContext";
import { useSearchContext } from "../../store/searchContext";
import { toast } from "react-toastify";
import { List, ListItem, ListItemText } from "@material-ui/core"; 
import ClassesSectionComponent from '../../components/ClassesSectionComponent';



// http://localhost:3030
const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { searchQuery } = useSearchContext();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        console.log(normalizeHome(data));
        setDataFromServer(normalizeHome(data));
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);

  useEffect(() => {
    // Filter data based on the search text
    const filtered = dataFromServer.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [ searchQuery]);

  const handleDeleteCard = useCallback(async (id) => {
    try {
      const { data } = await axios.get("/cards/" + id);
      
      if (data.user_id === login._id) {
        await axios.delete(`/cards/${id}`);
        toast.success("Card deleted");
      }
      else{
        toast.error("You are not authorized to delete this card");
      }
    } catch (err) {
      console.log("Error from axios", err);
    }
    
    console.log({ dataFromServer });
  }, [login]);


  let dataFromServerFiltered = normalizeHome(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }


  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleLikeCard = async (id) => {
    //axios
    console.log("you liked card", id);
    try {
      let { data } = await axios.patch("/cards/" + id);
      console.log("data from axios (patch)", data);
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex >= 0) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
      //update cards from server
    } catch (err) {
      console.log("error from axios (like)", err);
    }
  };

  
    const handleGradeClick = (grade) => {
      navigate(`/grade/${grade}`);
    };


  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    axios.get(`/grades/${selectedGrade}/subjects/${subject}/files`)
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`/grades/${selectedGrade}/subjects/${selectedSubject}/files`, formData)
      .then(response => {
        console.log('File uploaded:', response.data);
        setFiles([...files, response.data.file]);
      })
      .catch(error => console.error('Error uploading file:', error));
  };

  
  return (

        <Grid container spacing={2}>
        {/* Left container with list */}
        <Grid item xs={12} md={4}>
        <List>
            <ListItem button onClick={() => handleGradeClick(1)}>
              <ListItemText primary="1st Grade" />
            </ListItem>
            <ListItem button onClick={() => handleGradeClick(2)}>
              <ListItemText primary="2nd Grade" />
            </ListItem>
            <ListItem button onClick={() => handleGradeClick(3)}>
              <ListItemText primary="3rd Grade" />
            </ListItem>
            <ListItem button onClick={() => handleGradeClick(4)}>
              <ListItemText primary="4th Grade" />
            </ListItem>
            <ListItem button onClick={() => handleGradeClick(5)}>
              <ListItemText primary="5th Grade" />
            </ListItem>
            <ListItem button onClick={() => handleGradeClick(6)}>
              <ListItemText primary="6th Grade" />
            </ListItem>
          </List>

          {subjects.length > 0 && (
            <List>
              {subjects.map(subject => (
                <ListItem button key={subject} onClick={() => handleSubjectClick(subject)}>
                  <ListItemText primary={subject} />
                </ListItem>
              ))}
            </List>
          )}
          {selectedSubject && (
            <>
              {(login.isBusiness || login.isAdmin) && (
                <div>
                  <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-file" />
                  <label htmlFor="upload-file">
                    <Button variant="contained" color="primary" component="span">
                      Upload File
                    </Button>
                  </label>
                </div>
              )}
              <List>
                {files.map(file => (
                  <ListItem key={file.filename}>
                    <ListItemText primary={file.originalname} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Grid>
      
        {/* Right container with cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {(filteredData.length > 0 ? filteredData : dataFromServer).map((item, index) => (
              <Grid item lg={3} md={6} xs={12} key={"carsCard" + index}>
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  img={item.image.url}
                  phone={item.phone}
                  cardNumber={item.bizNumber}
                  liked={login?._id && item.likes.includes(login._id)}
                  onDelete={handleDeleteCard}
                  onEdit={handleEditCard}
                  onLike={handleLikeCard}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
  );
};

export default HomePage;