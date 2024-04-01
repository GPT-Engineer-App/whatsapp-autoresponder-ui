import { useState } from "react";
import { Box, Heading, Text, Button, Input, Textarea, Stack, IconButton, Flex, Spacer, Divider, useToast, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { FaTrash, FaSave } from "react-icons/fa";
import OptionPalette from "../components/OptionPalette";

const DEFAULT_ITEM = {
  question: "",
  answer: "",
  url: "",
  redirect: null,
  timeout: 0,
  subItems: [],
};

const Index = () => {
  const [tree, setTree] = useState([DEFAULT_ITEM]);
  const [selected, setSelected] = useState(null);

  const deleteSubItem = (parentIndex, subIndex) => {
    setTree(
      tree.map((item, index) => {
        if (index === parentIndex) {
          return {
            ...item,
            subItems: item.subItems.filter((_, i) => i !== subIndex),
          };
        }
        return item;
      }),
    );
  };

  const updateSubItem = (parentIndex, subIndex, field, value) => {
    setTree(
      tree.map((item, index) => {
        if (index === parentIndex) {
          return {
            ...item,
            subItems: item.subItems.map((subItem, i) => {
              if (i === subIndex) {
                return { ...subItem, [field]: value };
              }
              return subItem;
            }),
          };
        }
        return item;
      }),
    );
  };
  const toast = useToast();

  const addItem = (type, parentIndex) => {
    if (type === "question") {
      setTree([...tree, DEFAULT_ITEM]);
    } else if (type === "subQuestion") {
      setTree(
        tree.map((item, index) => {
          if (index === parentIndex) {
            return { ...item, subItems: [...item.subItems, DEFAULT_ITEM] };
          }
          return item;
        }),
      );
    }
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

      <OptionPalette onAddItem={(type) => addItem(type, tree.length - 1)} />

      <Flex mb={4}>
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

          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Question {index + 1}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack spacing={2} mb={4}>
                  <Input value={item.question} placeholder="Enter question" onChange={(e) => updateItem(index, "question", e.target.value)} />
                  <Textarea value={item.answer} placeholder="Enter answer" onChange={(e) => updateItem(index, "answer", e.target.value)} />
                  <Input value={item.url} placeholder="Enter URL (optional)" onChange={(e) => updateItem(index, "url", e.target.value)} />
                  <Input value={item.redirect} placeholder="Enter redirect question index (optional)" onChange={(e) => updateItem(index, "redirect", e.target.value)} />
                  <Input value={item.timeout} placeholder="Enter timeout in seconds (optional)" onChange={(e) => updateItem(index, "timeout", e.target.value)} />
                </Stack>
                <Flex mb={4}>
                  <Spacer />
                  <IconButton icon={<FaTrash />} aria-label="Delete Item" onClick={() => deleteItem(index)} />
                </Flex>
                {item.subItems.map((subItem, subIndex) => (
                  <Box key={subIndex} mt={4} p={4} borderWidth={1} borderRadius="md">
                    <Flex align="center" mb={2}>
                      <Text fontWeight="bold" mr={2}>
                        Sub-Question {subIndex + 1}
                      </Text>
                      <Spacer />
                      <IconButton icon={<FaTrash />} aria-label="Delete Sub-Item" onClick={() => deleteSubItem(index, subIndex)} />
                    </Flex>
                    <Stack spacing={2}>
                      <Input value={subItem.question} placeholder="Enter sub-question" onChange={(e) => updateSubItem(index, subIndex, "question", e.target.value)} />
                      <Textarea value={subItem.answer} placeholder="Enter sub-answer" onChange={(e) => updateSubItem(index, subIndex, "answer", e.target.value)} />
                    </Stack>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      ))}
    </Box>
  );
};

export default Index;
