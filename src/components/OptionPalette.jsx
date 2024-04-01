import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const OptionPalette = ({ onAddItem }) => {
  return (
    <Box mb={4}>
      <Stack direction="row" spacing={2}>
        <Button leftIcon={<FaPlus />} onClick={() => onAddItem("question")}>
          Add Question
        </Button>
        <Button leftIcon={<FaPlus />} onClick={() => onAddItem("subQuestion")}>
          Add Sub-Question
        </Button>
      </Stack>
    </Box>
  );
};

export default OptionPalette;
