import {
  Box, Flex, IconButton, Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdAddCircleOutline, MdCancel } from 'react-icons/md';

function BaseCard({ children, ...rest }: any) {
  return (
    <Box
      {...rest}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      backgroundColor="gray.50"
      minWidth={{ base: '100%', sm: '45%', md: '30%' }}
      width={{ base: '100%', sm: '45%', md: '30%' }}
      _hover={{
        boxShadow: 'xl',
        backgroundColor: 'gray.200',
        cursor: 'pointer',
        transform: 'scale(1.02)',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </Box>
  );
}

export default function BaseCardWithForm({
  onSave,
  editState,
  setEditState,
  children,
  variationOptionId,
  variationOptionName,
}: any) {
  const [name, setName] = useState(variationOptionName ?? '');

  const handleSave = () => {
    onSave({ name, variationOptionId });
    setEditState({ id: null, edit: false });
    setName('');
  };

  return (
    <BaseCard>
      {editState.edit && variationOptionId === editState.id ? (
        <Box>
          <Input
            placeholder="Digite o nome da opção"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Flex justifyContent="start" gap={4} mt={2}>
            <IconButton
              colorScheme="green"
              aria-label="Save variation option"
              icon={<MdAddCircleOutline size={24} />}
              onClick={handleSave}
            />
            <IconButton
              colorScheme="red"
              aria-label="Save variation option"
              icon={<MdCancel size={24} />}
              onClick={() => {
                setEditState({ id: null, edit: false });
                setName('');
              }}
            />
          </Flex>
        </Box>
      ) : (
        <>{children}</>
      )}
    </BaseCard>
  );
}
