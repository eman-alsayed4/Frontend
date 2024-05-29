import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateSchema from "../../validation/cardValidation";
import LoginContext from "../../store/loginContext";
import { fromServer } from "./normalizeEdit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const EditCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
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
  let { id } = useParams(); //get id from url
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  /**
   * useEffect {axios - get data from server} [id]
   * save btn - axios - update data in server
   */
  useEffect(() => {
    if (!id || !login) {
      return;
    }
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        if (data.user_id == login._id) {
          //the logged in user is the user that created the card
          setInputsValue(fromServer(data));
        } else {
          //not the same user
          navigate(ROUTES.HOME);
          toast.error("You are not authorized to edit this card");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, login]);
  let keysArray = Object.keys(inputsValue); //['title','subTitle', 'description', 'phone', 'email', 'web', 'url', 'alt']

  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    console.log("e.target.id" + e.target.id);
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    console.log({ error });
    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
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
        Edit your card
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
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
        </Grid>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={Object.keys(errors).length > 0}
      >
        Edit Card
      </Button>
    </Box>
  );
};
export default EditCardPage;
