import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Checkbox, Link, Typography, Box, FormControlLabel, InputAdornment, TextField, Button } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { uiActions } from '../../store/ui/slice';
import { login } from '../../store/auth/actions';

export default function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isStudentLogin = useSelector((state) => state.ui.isStudentLogin);
  const loginForm = useSelector((state) => state.ui.loginForm);
  const csrfId = useSelector((state) => state.auth.csrfId);
  const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "loginForm", field: field, value: value }));
  const inputData = {
    appuser: loginForm.username,
    apppassword: loginForm.password,
    csrfId
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputData, navigate));
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 4
        }}
      >
        <Typography component="h1" color="primary" variant="h5">
          {isStudentLogin ? "Student Login" : "Teacher Login"}
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2, p: 2, borderRadius: "2px" }}
          onSubmit={handleSubmit}
          noValidate
        >

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={loginForm.username}
            onChange={(e) => handleChange("username", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={theme.styles.iconPrimary} />
                </InputAdornment>
              ),
            }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginForm.password}
            onChange={(e) => handleChange("password", e.target.value)}
            InputLabelProps={{
              sx: { color: 'primary' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={theme.styles.iconPrimary} />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={loginForm.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
            type="submit"
          >
            Log in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="primary">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
