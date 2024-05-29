import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import MuiLink from "@mui/material/Link";
/**
 * title -> title
 * subtitle -> subheader
 */
const CardComponent = ({
  title,
  subtitle,
  description,
  img,
  userName,
  cardNumber,
  id,
  liked,
  onDelete,
  onEdit,
  onLike,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  console.log("rerender from CardComponent");
  // let { title, subtitle, img, body } = props;
  // console.log(props);
  const handleDeleteClick = () => {
    console.log("Clicked on delete", id);
    onDelete(id);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  const handleLikeClick = () => {
    onLike(id);
  };
  const truncateText = (text, length) => {
    if (!text || text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "...";
  };
  
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt="image"
          height={200}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={subtitle}></CardHeader>
      <Divider></Divider>
      <CardContent>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Description:
          </Typography>
          {isTruncated ? truncateText(description, 100) : description}
          {description?.length > 100 && (
            <MuiLink
              component={Link}
              to={`/card/${id}`}
              onClick={() => setIsTruncated(false)}
              style={{ cursor: "pointer", marginLeft: 5 }}
            >
              {isTruncated ? "Read more" : ""}
            </MuiLink>
          )}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Writer:
          </Typography>
          {userName}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {cardNumber}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <ModeIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <LocalPhoneIcon />
            </IconButton>
            <IconButton onClick={handleLikeClick}>
              <FavoriteIcon color={liked ? "error" : "inherit"} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  cardNumber: PropTypes.number.isRequired,
};

CardComponent.defaultProps = {
  img: "/assets/imgs/car 1.jpg",
  subtitle: "subtitle default",
};

export default CardComponent;
