import React, { useState, useEffect } from "react";
import User from "@services/user";
import roomService from "@services/room";
import { Box, Button, Chip, Stack } from "@mui/material";
import ReactPaginate from "react-paginate";
import { AddCircleOutlineIcon } from "@config/icons";
import { Link } from "react-router-dom";
import { URL } from "@services";
import "./style.css";

function ListScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [user, setGetUser] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const roomPerPage = 8;
  const pagesVisited = pageNumber * roomPerPage;
  const pageCount = Math.ceil(rooms.length / roomPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const retrieveRooms = () => {
    roomService.getAll().then((response) => {
      setRooms(response.data.data);
    });
  };
  const retrieveUser = () => {
    return Promise.all([User.get()]).then(async (response) => {
      await setGetUser(response[0].data);
    }).catch((e) => {
      console.log(e);
    })
  };
  useEffect(() => {
    retrieveRooms();
    retrieveUser();
  }, []);

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  // return same color for same word tag
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };




  const displayRoom =
    rooms ? (
      <ul className="flex">
        {rooms
          .filter((Room) => {
            return Room.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .slice(pagesVisited, pagesVisited + roomPerPage)
          .map((Room) => (
            <li className="item" key={Room._id}>
              <div className="card">
                <div className="header">
                  <Link to={"/details-room/" + Room._id} state={{ partyy: Room, user: user }}>
                    <img
                      className="img-fluid"
                      alt=""
                      src={
                        `${URL}rooms/` +
                        Room.id_user +
                        `.jpeg`
                      }
                    ></img>
                  </Link>
                </div>
                <div className="containers">
                  <p>Nom de la Room : {Room.name}</p>
                  <p> Auteur : {Room.author}</p>

                  <Stack className="mt5" direction="row" flexWrap={"wrap"} spacing={1}>
                    {Room.tag.map((tag) => (
                      <Chip className="mb5" key={tag._id} label={tag.value} sx={{ color: hashCode(tag.value) }} variant="outlined" />
                    ))}
                  </Stack>
                </div>
              </div>
            </li>
          ))}
      </ul>
    ) : (
      <p> no rooms</p>
    );

  return (
    <Box ml="6%" mr="3%" mb="6%">
      <Button
        className="addbutton"
        startIcon={<AddCircleOutlineIcon />}
        href="/nouvelle-room"
      >
        Créer une Room
      </Button>
      <div className="searchBar">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Rechercher"
          onChange={handleSearchTerm}
        />
      </div>
      {displayRoom}
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
    </Box>
  );
}

export default ListScreen;
