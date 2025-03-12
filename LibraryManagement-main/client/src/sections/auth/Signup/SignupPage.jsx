import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Logo from "../../../components/logo";
import { SignupForm } from "./index";
import config from "../../../config";
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const { login, user } = useAuth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  
  if (user) {
    if (user.isAdmin) {
      return <Navigate to={"/dashboard"} replace />;
    }
    return <Navigate to={"/books"} replace />;
  }
console.log(config);
  const loginUser = ({ name, email, password, isAdmin, photoUrl, dob, phone }) => {
    if (email === "" || password === "" || phone === "" || dob === "") {
      toast.error("Please enter user Data properly");
    }else if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
      } else if (!phoneRegex.test(phone)) {
        toast.error("Please enter a valid phone number");
      }
     else {
        axios.post(`${config.BACKEND_API_URL}/api/auth/register`, { name, email, password, isAdmin, photoUrl, dob, phone }, { withCredentials: false })
        .then((response) => {
          // handle success
          if (response.status === 201) {
            console.log(response.data);
            toast.success(`Successfully Signup in as ${response.data.user.name}`);
            login(response.data.user);
          }
        })
        .catch((error) => {
          // handle error
          toast.error(error.response.data.message);
          console.log(error);
        });
    }
  };


  return (
    <>
      <Helmet>
        <title> Signup | Library</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 }
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" sx={{ color: "#666666", fontWeight: "600" }} textAlign="center" gutterBottom
                        paddingBottom={0}>
              Library System
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom paddingBottom={3}>
              Sign up
            </Typography>

            <SignupForm loginUser={loginUser} />

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
