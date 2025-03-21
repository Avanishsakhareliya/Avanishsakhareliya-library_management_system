import { useState } from "react";
import { Grid, IconButton, InputAdornment, Link, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const LoginForm = ({loginUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3} sx={{mb: 2}}>
        <TextField name="email" label="Email address" value={email} required onChange={
          (event) => {
            setEmail(event.target.value);
          }
        }/>

        <TextField
          name="password"
          required
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2" onClick={()=>{}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

      <LoadingButton sx={{mt: 4}} fullWidth size="large" type="submit" variant="contained"
                     onClick={() => loginUser(email, password)}>
        Login
      </LoadingButton>
    </>
  );
}

LoginForm.propTypes = {
  loginUser: PropTypes.func,
};

export default LoginForm
