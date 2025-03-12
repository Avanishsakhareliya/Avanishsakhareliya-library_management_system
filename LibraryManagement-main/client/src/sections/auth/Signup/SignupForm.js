import { useState } from "react";
import { IconButton, InputAdornment, Stack, TextField, FormControlLabel, Checkbox, Grid, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";
import Avatar from "../../../images/avatar.svg"
// ----------------------------------------------------------------------

const SignupForm = ({ loginUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: true,
    photoUrl: Avatar,
    dob: '',
    phone: '',
    showPassword: false
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
  };

  const handleSubmit = () => {
    const { name, email, password, isAdmin, photoUrl, dob, phone } = formData;
    loginUser({ name, email, password, isAdmin, photoUrl, dob, phone });
  };

  return (
    <>
      <Stack spacing={3} sx={{ mb: 2 }}>
        <TextField name="name" label="Name" value={formData.name} required onChange={handleChange} />
        <TextField name="email" label="Email address" value={formData.email} required onChange={handleChange} />
        <TextField
          name="password"
          required
          label="Password"
          value={formData.password}
          type={formData.showPassword ? 'text' : 'password'}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  <Iconify icon={formData.showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField name="dob" label="Date of Birth" type="date" value={formData.dob} InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} />
        
      </Stack>

      <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" onClick={()=>{}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
      <LoadingButton sx={{ mt: 4 }} fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Signup
      </LoadingButton>
    </>
  );
}

SignupForm.propTypes = {
  loginUser: PropTypes.func,
};

export default SignupForm;