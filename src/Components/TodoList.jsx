import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addGroup, setStatuses } from "../Redux/action";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import Todo from "./Todo";

const TodoList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const [allTasksCovered, setAllTasksCovered] = useState(false);

  useEffect(() => {
    checkAllTasksCovered();
  }, [groups]);

  const checkAllTasksCovered = () => {
    const tasksCovered = new Array(10).fill(false);
    groups.forEach((group) => {
      for (let i = group.from; i <= group.to; i++) {
        tasksCovered[i - 1] = true;
      }
    });
    setAllTasksCovered(tasksCovered.every((covered) => covered));
  };

  const toast = useToast();

  const handleAddGroup = () => {
    const lastGroup = groups[groups.length - 1];
    const nextFrom = lastGroup.to + 1;
    const nextTo = nextFrom + 2 <= 10 ? nextFrom + 2 : 10;
    if (nextFrom <= 10) {
      dispatch(addGroup({ from: nextFrom, to: nextTo }));
      toast({
        description: `Group ${groups.length + 1} added`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleShowStatus = async () => {
    if (!allTasksCovered) {
      toast({
        description: "You have not added all tasks from 1 to 10.",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const allStatuses = await Promise.all(
      groups.map(async (group, index) => {
        const groupStatuses = {};
        for (let i = group.from; i <= group.to; i++) {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/${i}`
          );
          groupStatuses[i] = response.data.completed;
        }
        return { index, statuses: groupStatuses };
      })
    );

    allStatuses.forEach(({ index, statuses }) => {
      dispatch(setStatuses(index, statuses));
    });
  };

  return (
    <div>
      <Box>
        <Flex flexDirection={"column"} gap={"20px"}>
          {groups.map((group, index) => (
            <div key={index}>
              <Todo index={index} group={group} />
            </div>
          ))}
          <Button w={"200px"} onClick={handleAddGroup}>
            + Add Group
          </Button>

          <Button
            colorScheme="blue"
            w={"200px"}
            ml={"200px"}
            onClick={handleShowStatus}
          >
            Show Status
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default TodoList;
