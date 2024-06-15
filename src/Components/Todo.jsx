import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeGroup, updateGroup } from "../Redux/action";
import { Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  CheckCircleIcon,
  DeleteIcon,
} from "@chakra-ui/icons";

const Todo = ({ index, group }) => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statuses[index]);
  const toast = useToast();

  const handleRemove = () => {
    dispatch(removeGroup(index));
    toast({
      description: "Group Deleted",
      position: "top",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateGroup(index, { ...group, [name]: Number(value) }));
  };

  return (
    <div>
      <Box>
        <Box alignItems={"center"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDirection={"row"}>
              <Box mr={2} mt={2}>
                <DeleteIcon
                  onClick={handleRemove}
                  color="red.500"
                  cursor={"pointer"}
                  w={6}
                  h={9}
                />
              </Box>

              <Flex w={"300px"} borderWidth="1px" borderRadius="lg" p={3}>
                <Text mr={5} mt={2} fontSize={"16px"}>
                  Group {index + 1}
                </Text>
                <div>
                  <label>From:</label>
                  <Input
                    w={10}
                    type="number"
                    name="from"
                    value={group.from}
                    onChange={handleChange}
                    min="1"
                    max="10"
                  />
                  <ArrowForwardIcon color={"blue.500"} w={10} h={5} />
                  <label>To:</label>
                  <Input
                    w={12}
                    type="number"
                    name="to"
                    value={group.to}
                    onChange={handleChange}
                    min="1"
                    max="10"
                  />
                </div>
              </Flex>
            </Flex>

            <Box w={"60%"} borderWidth="1px" borderRadius="lg" p={3}>
              <Flex gap={2}>
                {statuses &&
                  Object.entries(statuses).map(([key, value]) => (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      p={2}
                      key={key}
                      className="status-item"
                    >
                      ({key}) {value ? "True" : "False"}
                    </Box>
                  ))}
                <CheckCircleIcon
                  color={"green.700"}
                  w={6}
                  h={9}
                  cursor={"pointer"}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default Todo;
