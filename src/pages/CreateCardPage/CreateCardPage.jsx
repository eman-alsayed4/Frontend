import { useEffect, useState, useContext } from "react";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateSchema from "../../validation/cardValidation";
import LoginContext from "../../store/loginContext";
import { fromServer } from "../EditCardPage/normalizeEdit";
import { Route } from "@mui/icons-material";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import normalizeCreate from "./normalizeCreate";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";

const CreateCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    images: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
  });
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const validationFunction = validateSchema[e.target.id];
    if (!validationFunction) return;
  
    const { error } = validationFunction({ [e.target.id]: inputsValue[e.target.id] });
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((prevErrors) => {
        const { [e.target.id]: _, ...rest } = prevErrors;
        return { ...rest };
      });
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setInputsValue((prevInputs) => ({
      ...prevInputs,
      images: [...prevInputs.images, ...files],
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userName = login?.firstName + ' ' + login?.lastName;

    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const cardData = {
        ...normalizeCreate(inputsValue),
        userName
      };
  
      await axios.post("/cards", cardData, config);
      navigate(ROUTES.HOME);
      toast.success('you creat a card successfully!')
    } catch (err) {
      console.log("error from axios", err);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create a new card
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {Object.keys(inputsValue).map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
            />
            
          ))}
          <input type="file" multiple onChange={handleImageChange} />
          {errors.keyName && <Alert severity="error">{errors.keyName}</Alert>}
          
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
         // disabled={Object.keys(errors).length > 0}
        >
          Create Card
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCardPage;