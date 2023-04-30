import React, { useEffect } from "react";
import {
  Box,
  Input,
  List,
  ListItem,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { MdOutlineClose } from "react-icons/md";
import { useCombobox } from "downshift";

type Item = {
  id: number;
  label: string;
};

type SearchableSelectProps = {
  items: Item[];
  label: string;
  id: string;
  formik: any; // Replace with the type of your formik instance
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  items,
  label,
  id,
  formik,
}) => {
  const initialItem = items.find((item) => item.id === formik.values[id]);
  const {
    isOpen,
    selectedItem,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    reset,
    setInputValue,
  } = useCombobox<Item>({
    items,
    itemToString: (item) => (item ? item.label : ""),
    onSelectedItemChange: (changes) => {
      if (!changes.selectedItem) return;
      formik.setFieldValue(id, changes.selectedItem.id);
    },
    initialSelectedItem: initialItem ?? null,
  });

  useEffect(() => {
    const updatedItem = items.find((item) => item.id === formik.values[id]);
    if (updatedItem) {
      setInputValue(updatedItem.label);
    } else {
      setInputValue("");
    }
  }, [formik.values[id], items, setInputValue]);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleClearSelection = () => {
    reset();
    formik.setFieldValue(id, null);
  };

  return (
    <FormControl id={id} width="100%">
      <FormLabel>{label}</FormLabel>
      <Box position="relative">
        <InputGroup>
          <Input {...getInputProps({ name: id, id })} />
          {selectedItem && (
            <InputRightElement>
              <IconButton
                aria-label="Clear selection"
                icon={<MdOutlineClose />}
                size="sm"
                onClick={handleClearSelection}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <List
          {...getMenuProps()}
          position="absolute"
          boxShadow="md"
          borderRadius="md"
          mt={1}
          overflow="auto"
          zIndex={1000}
          display={isOpen ? "block" : "none"}
          maxH="200px"
          width="100%"
        >
          {isOpen &&
            filteredItems.map((filteredItem) => {
              const originalIndex = items.findIndex(
                (item) => item.id === filteredItem.id
              );

              return (
                <ListItem
                  key={filteredItem.id}
                  bg={highlightedIndex === originalIndex ? "blue.100" : "white"}
                  px={4}
                  py={2}
                  {...getItemProps({
                    item: filteredItem,
                    index: originalIndex,
                  })}
                >
                  {filteredItem.label}
                </ListItem>
              );
            })}
        </List>
      </Box>
    </FormControl>
  );
};

export default SearchableSelect;
