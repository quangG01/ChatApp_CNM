import Router from "./routes";
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // if (token?.length) {

    //   dispatch(setUser({
    //     phoneNumber: '0969696969',
    //     avatar: 'avatar.jpeg',
    //     name: 'Phạm Quốc Anh Đức',
    //     _id: '123'
    //   }))
    // }
    dispatch(setUser({
      phoneNumber: '0969696969',
      avatar: 'avatar.jpeg',
      name: 'Phạm Quốc Anh Đức',
      _id: '123'
    }))

  }, [dispatch]);

  return (
    <ThemeProvider>
      <ThemeSettings>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </ThemeSettings>
    </ThemeProvider>
  );
}
