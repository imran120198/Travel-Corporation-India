import "./App.css";
import { Box, Heading } from "@chakra-ui/react";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <div className="App">
      <Box p={4}>
        <Box>
          <Heading mb={5} color={"teal"}>
            Todo Group Status
          </Heading>
        </Box>
        <TodoList />
      </Box>
    </div>
  );
}

export default App;
