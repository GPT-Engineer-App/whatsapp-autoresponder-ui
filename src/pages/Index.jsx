import { useState } from "react";
import { Box, Heading, Text, Button, Input, Textarea, Stack, IconButton, Flex, Spacer, Divider, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const DEFAULT_ITEM = {
  question: "",
  answer: "",
  url: "",
  redirect: null,
  timeout: 0,
};

const Index = () => {
  const [tree, setTree] = useState([DEFAULT_ITEM]);
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  const addItem = (parentIndex) => {
    setTree([...tree.slice(0, parentIndex + 1), DEFAULT_ITEM, ...tree.slice(parentIndex + 1)]);
    setSelected(parentIndex + 1);
  };

  const deleteItem = (index) => {
    const newTree = tree.filter((_, i) => i !== index);
    setTree(newTree);
    setSelected(null);
  };

  const selectItem = (index) => {
    setSelected(index);
  };

  const updateItem = (index, field, value) => {
    const newTree = tree.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setTree(newTree);
  };

  const saveTree = () => {
    localStorage.setItem("tree", JSON.stringify(tree));
    toast({
      title: "Saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const loadTree = () => {
    const savedTree = localStorage.getItem("tree");
    if (savedTree) {
      setTree(JSON.parse(savedTree));
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>WhatsApp Auto-Response Tree Editor</Heading>

      <Flex mb={4}>
        <Button leftIcon={<FaPlus />} onClick={() => addItem(tree.length - 1)}>
          Add Item
        </Button>
        <Spacer />
        <Button leftIcon={<FaSave />} onClick={saveTree}>
          Save
        </Button>
        <Button ml={2} onClick={loadTree}>
          Load
        </Button>
      </Flex>

      {tree.map((item, index) => (
        <Box key={index} mb={4} p={4} borderWidth={1} borderRadius="md">
          <Flex align="center" mb={2}>
            <Text fontWeight="bold" mr={2}>
              Question {index + 1}
            </Text>
            <Spacer />
            <IconButton icon={<FaTrash />} aria-label="Delete Item" onClick={() => deleteItem(index)} />
          </Flex>

          <Stack spacing={2} mb={4}>
            <Input value={item.question} placeholder="Enter question" onChange={(e) => updateItem(index, "question", e.target.value)} />
            <Textarea value={item.answer} placeholder="Enter answer" onChange={(e) => updateItem(index, "answer", e.target.value)} />
            <Input value={item.url} placeholder="Enter URL (optional)" onChange={(e) => updateItem(index, "url", e.target.value)} />
            <Input value={item.redirect} placeholder="Enter redirect question index (optional)" onChange={(e) => updateItem(index, "redirect", e.target.value)} />
            <Input value={item.timeout} placeholder="Enter timeout in seconds (optional)" onChange={(e) => updateItem(index, "timeout", e.target.value)} />
          </Stack>

          <Divider />

          <Flex mt={4}>
            <Button leftIcon={<FaPlus />} onClick={() => addItem(index)}>
              Add Sub-Item
            </Button>
            <Spacer />
            {selected === index ? <IconButton icon={<FaEdit />} aria-label="Deselect Item" onClick={() => setSelected(null)} /> : <IconButton icon={<FaEdit />} aria-label="Select Item" onClick={() => selectItem(index)} />}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default Index;
