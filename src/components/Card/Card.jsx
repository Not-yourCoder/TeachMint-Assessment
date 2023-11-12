import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../../context/AppContext";
import { usePostContext } from "../../context/PostContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";




export default function OutlinedCard() {
  const { state } = useAppContext();
  const { postState } = usePostContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);

  if (!state || state.length === 0)
    return <div className="flex justify-center items-center h-[100vh]"><PacmanLoader color="#0e0403" /></div>;

  return (
    <>
      <Box
        sx={{
          maxWidth: 375,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2rem auto",
          gap: "1rem",
          
        }}
      >
        {state.map((user, index) => {
          const userPosts = postState.filter((post) => post.userId === user.id);

          return (
            <Link key={index} to={`/user/${user.id}`}>
              <div
                style={{ marginInline: "10px", cursor: "pointer" }}
                onClick={() => {
                  setModalOpen(true);
                  setUserData(user);
                  setPostData(userPosts);
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    ".css-ahj2mt-MuiTypography-root": {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  }}
                >
                  <CardContent key={index}>
                    <Typography>
                      Name: {user.name}
                      <Typography>No of Post: {userPosts.length}</Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Link>
          );
        })}
      </Box>
    </>
  );
}
