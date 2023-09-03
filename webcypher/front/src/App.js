import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "@router/routes";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { StyledEngineProvider, } from '@mui/material';
import "@config/icons";
import "@styles/App.css";
import "@fontsource/roboto"
import { QueryClientProvider, QueryClient } from "react-query";
import { SocketContext, socket } from './context/socket.context';

const queryClient = new QueryClient()
socket.on("receiveMessage", async (data) => {
  const token = localStorage.getItem('accessToken')
  const decode = JSON.parse(atob(token.split('.')[1]));

  if (decode._id === data.receiver._id &&
    decode.username === data.receiver.username) {
    toast(`Nouveau message de ` + data.sender.username, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
});

function App() {

  return (

    <SocketContext.Provider value={socket}>
      <Suspense fallback={<></>}>
        <StyledEngineProvider >
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ToastContainer />
              <RouterConfig />
            </BrowserRouter>
          </QueryClientProvider>
        </StyledEngineProvider>
      </Suspense>
    </SocketContext.Provider>

  );
}

export default App;
