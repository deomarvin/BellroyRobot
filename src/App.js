import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import logo from "./logo.svg";
import bellroy_robot from "./bellroy_robot.png";
import { Button, ButtonBase, Grid, IconButton } from "@mui/material";
import { NorthWest } from "@mui/icons-material";
import { North } from "@mui/icons-material";
import { NorthEast } from "@mui/icons-material";
import { West } from "@mui/icons-material";
import { East } from "@mui/icons-material";
import { SouthWest } from "@mui/icons-material";
import { South } from "@mui/icons-material";
import { SouthEast } from "@mui/icons-material";

function App() {
  function generateGrid(size) {
    let grid = [];
    let count = 0;
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(count++);
      }
      grid.push(row);
    }
    return grid;
  }
  function rotateGrid(grid) {
    const n = grid.length; // assuming the grid is n x n
    let newGrid = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newGrid[i][j] = grid[n - 1 - j][i];
      }
    }
    return newGrid;
  }

  const [rotate, setRotate] = useState(0);
  const [grid, setGrid] = useState(generateGrid(5));
  const [position, setPosition] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const rotateRobot = () => {
    if (rotate + 90 == 360) {
      setRotate(0);
    } else {
      setRotate(rotate + 90);
    }
    setPosition(
      rotateGrid(grid).flat()[grid.flat().findIndex((r) => r == position)]
    );
    setGrid(rotateGrid(grid));
  };
  const controlEast = () => {
    if ((position + 1) % 5 != 0) {
      setPosition(position + 1);
    }
  };
  const controlWest = () => {
    if (position % 5 != 0) {
      setPosition(position - 1);
    }
  };
  const controlSouth = () => {
    if (position + 5 < 25) {
      setPosition(position + 5);
    }
  };
  const controlNorth = () => {
    if (position - 5 >= 0) {
      setPosition(position - 5);
    }
  };
  const controlNorthWest = () => {
    if (![0, 5, 10, 15, 20, 1, 2, 3, 4].includes(position)) {
      setPosition(position - 6);
    }
  };
  const controlSouthEast = () => {
    if (![4, 9, 14, 19, 24, 20, 21, 22, 23, 24].includes(position)) {
      setPosition(position + 6);
    }
  };
  const controlNorthEast = () => {
    if (![0, 1, 2, 3, 4, 9, 14, 19, 24].includes(position)) {
      setPosition(position - 4);
    }
  };
  const controlSouthWest = () => {
    if (![0, 5, 10, 15, 20, 21, 22, 23, 24].includes(position)) {
      setPosition(position + 4);
    }
  };
  return (
    <>
      <AppBar sx={{ backgroundColor: "#303030" }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <img style={{ height: "40px", marginTop: -10 }} src={logo} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <Grid container>
          {grid.flat().map((r, i) => (
            <Grid
              item
              xs={2.4}
              sx={{
                border: "0.5px solid #808080",
                textAlign: "center",
                height: "70px",
                py: 2,
                position: "relative",
              }}
            >
              {showNumber && (
                <Box
                  sx={{
                    position: "absolute",
                    margin: "0 auto",
                    width: "100%",
                    top: "24px",
                    color: "#808080",
                  }}
                >
                  <center>{r}</center>
                </Box>
              )}

              {position == r && (
                <img
                  src={bellroy_robot}
                  style={{ height: "30px", transform: `rotate(${rotate}deg)` }}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <br />

        <center>
          <Box sx={{ width: 200 }}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                <ButtonBase
                  onClick={controlNorthWest}
                  sx={{ width: "100%", p: 1 }}
                >
                  <NorthWest />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                <ButtonBase onClick={controlNorth} sx={{ width: "100%", p: 1 }}>
                  <North />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                <ButtonBase
                  onClick={controlNorthEast}
                  sx={{ width: "100%", p: 1 }}
                >
                  <NorthEast />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                {" "}
                <ButtonBase onClick={controlWest} sx={{ width: "100%", p: 1 }}>
                  <West />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                Control
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                {" "}
                <ButtonBase onClick={controlEast} sx={{ width: "100%", p: 1 }}>
                  <East />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                <ButtonBase
                  onClick={controlSouthWest}
                  sx={{ width: "100%", p: 1 }}
                >
                  <SouthWest />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                <ButtonBase onClick={controlSouth} sx={{ width: "100%", p: 1 }}>
                  <South />
                </ButtonBase>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", py: 1 }}>
                <ButtonBase
                  onClick={controlSouthEast}
                  sx={{ width: "100%", p: 1 }}
                >
                  <SouthEast />
                </ButtonBase>
              </Grid>
            </Grid>
            <Button onClick={rotateRobot} variant="outlined" sx={{ mt: 2 }}>
              Rotate
            </Button>

            <Button
              onClick={() => setShowNumber(!showNumber)}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              {!showNumber ? "Show" : "Hide"} Number
            </Button>
          </Box>
        </center>
        <Box
          sx={{
            mt: 5,
            border: "1px solid #808080",
            borderRadius: 3,
            p: 1,
            px: 2,
            background: "#303030",
            color: "#fff",
          }}
        >
          Created by Deo Marvin Yahya.
        </Box>
      </Container>
    </>
  );
}
export default App;
