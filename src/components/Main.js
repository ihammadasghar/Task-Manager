import { useSelector } from 'react-redux';
import { React } from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider, alpha, CssBaseline } from '@mui/material';

import Home from './Home';
import Footer from './Footer';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Taskboard from './tasks/Taskboard';
import LoginForm from './auth/LoginForm';
import Attendance from './attendance/Attendance';

const Main = () => {
  const { primary, secondary, background, onBackground } = useSelector((state) => state.ui.themeColors);
  const theme = createTheme({
    spacing: 5,
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        default: secondary,
        main: background,
      },
      onBackground: {
        main: onBackground,
        textField: alpha(onBackground, 0.4),
        box: alpha(onBackground, 0.1),
        dim: alpha(onBackground, 0.5),
      }
    },
    styles: {
      iconPrimary: { fill: primary },
      iconSecondary: { fill: secondary },
      iconOnBackground: { fill: onBackground, marginLeft: "5px", marginRight: "5px" },
    }
  },);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='content-wrap'>
        <Navbar />

        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='taskboard' element={<Taskboard />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='*' element={<Home />} />
        </Routes>

      </div>

      <Footer />
    </ThemeProvider>
  )
}

export default Main;