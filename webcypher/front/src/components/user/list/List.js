import React, { useState, useEffect } from "react";
import AvatarModel from "react-nice-avatar";
import ReactPaginate from "react-paginate";
import ImageListItem, { imageListItemClasses } from "@mui/material/ImageListItem";
import { Box, Avatar, ImageListItemBar, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { checkConversation, conversation_post } from '@services/chat'
import UserService from "@services/user";
import { ForumIcon, PersonIcon } from "@config/icons";
import { H1 } from "@styles/style.js";

import "./style.scss";

const ListUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const roomPerPage = 12;
  const pagesVisited = pageNumber * roomPerPage;
  const pageCount = Math.ceil(users.length / roomPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const retrieveUsers = () => {
    UserService.get_all().then((response) => {
      setUsers(response.data.data);
    });
  };
  useEffect(() => {
    retrieveUsers();
  }, []);


  const check = async (id) => {
    let exist = false
    await new Promise((resolve, reject) => {
      checkConversation(id).then((response) => {
        if (response.data) {
          exist = true
          console.log(exist)
        }
        resolve(exist)
      });
    });

    if (exist) {
      window.location.href = "/private";
    } else {
      conversation_post(id).then((response) => {
        window.location.href = "/private";
      });
    }
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 320,
        tablet: 481,
        smallLaptop: 769,
        laptop: 1025,
        extraScreen: 1201,
        largeScreen: 1650,
      }
    }
  });

  const displayUser = users.slice(pagesVisited, pagesVisited + roomPerPage).map((user, index) => (
    <ImageListItem key={index} style={{ backgroundColor: "#211625", paddingTop: "1rem" }}>
      {user.avatar.length > 0 &&
        <div >
          {user.avatar.map((avatar, index) => (
            <div key={index} >
              <AvatarModel style={{ cursor: "pointer" }} className="avatar" bgColor={avatar.BgColor} hairStyle={avatar.HairStyle} hatColor={avatar.HatColor} hatStyle={avatar.HatStyle} mouthStyle={avatar.MouthStyle} noseStyle={avatar.NoseStyle} shirtStyle={avatar.ShirtStyle} shirtColor={avatar.ShirtColor} glassesStyle={avatar.GlassesStyle} faceColor={avatar.FaceColor} eyeStyle={avatar.EyesStyle} earSize={avatar.EarSize} hairColor={avatar.HairColor} hairColorRandom />
            </div>
          ))}
        </div>
      }
      {user.avatar.length === 0 &&
        <Avatar className="avatar" sx={{ bgcolor: "#211625", width: 140, height: 140 }}>
          <PersonIcon sx={{ fontSize: 100 }} />
        </Avatar>
      }
      <ImageListItemBar className="paginationdiv"
        title={user.username}
        position="below"
      />
      <Button
        startIcon={<ForumIcon />}
        onClick={() => check(user._id)}
      >
      </Button>
    </ImageListItem>
  ))

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "50px" }}>
        <H1>Listes des utilisateurs</H1>

        <Box sx={{
          display: "grid",
          paddingBottom: 0,
          gridTemplateColumns: {
            mobile: "repeat(1, 1fr)",
            tablet: "repeat(2, 1fr)",
            smallLaptop: "repeat(3, 1fr)",
            laptop: "repeat(4, 1fr)",
            extraScreen: "repeat(4, 1fr)"
          },
          gridGap: 30,
          [`& .${imageListItemClasses.root}`]: {
            display: "flex",
            flexDirection: "column"
          }
        }} ml="6%" mr="3%" mb="6%" p="4rem">
          {displayUser}
        </Box>
      </div>
      <div className="paginationdiv">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </ThemeProvider >
  );
}

export default ListUserScreen;
