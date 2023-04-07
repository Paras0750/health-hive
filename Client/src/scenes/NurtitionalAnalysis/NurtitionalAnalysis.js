import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import { recipeData } from "./nutritionData";

const columns = [
  "Image",
  "Name",
  "Calories",
  "Carbs(g)",
  "Protein(g)",
  "Fat(g)",
  "Fiber(g)",
];

const Recipe = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchItem, setSearchItem] = useState("");
  const [foundArr, setFoundArr] = useState([...recipeData]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearch = (e) => {
    const temp = e.target.value;
    console.log(temp);
    setSearchItem(temp);
  
    setFoundArr(
        searchItem
        ? recipeData.filter((item) => item.food.includes(temp))
        : [...recipeData]
    );
  };


  return (
    <Container style={{marginTop: "40px"}}>
      <Typography variant="h2">Nurtitional Analysis</Typography>
      <Box>
        <Grid
          container
          justifyContent="space-between"
          style={{ margin: "20px 0" }}
        >
          <Grid item>
            <Box>
              {/* <InputLabel variant="Outlined">Search Food</InputLabel> */}
              <TextField
                onChange={handleSearch}
                id="search"
                name="search"
                label="Search Food"
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                value={searchItem}
              />
            </Box>
          </Grid>
          <Grid>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={recipeData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Box>

      <Paper style={{borderRadius: '16px'}} sx={{ width: "100%", overflow: "hidden" }} >
        <TableContainer  sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {foundArr
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow>
                    <TableCell>
                      <img
                        alt={item.food}
                        src={item.img}
                        style={{
                          height: "50px",
                          width: "45px",
                          borderRadius: "25px",
                        }}
                      ></img>
                    </TableCell>
                    <TableCell>{item.food}</TableCell>
                    <TableCell>{item.cal}</TableCell>
                    <TableCell>{item.carbs}</TableCell>
                    <TableCell>{item.protein}</TableCell>
                    <TableCell>{item.fat}</TableCell>
                    <TableCell>{item.fiber}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Recipe;
