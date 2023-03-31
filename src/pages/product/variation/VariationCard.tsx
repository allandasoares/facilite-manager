import {
  Box, Button, Flex, Text,
} from '@chakra-ui/react';

export default function VariationCard({ option, onSave }: any) {
  return (
      <Box
        w="200px"
        h="100px"
        borderWidth="2px"
        borderRadius="lg"
        borderColor="gray.300"
        boxShadow="sm"
        p={4}
        bg="white"
        _hover={{ boxShadow: 'md' }}
        transition="box-shadow 0.2s"
        key={option.id}
      >
        <Flex direction="column" justifyContent="space-around" h="100%" gap={2}>
          <Text fontWeight="bold" fontSize="lg" align="center">
            {option.name}
          </Text>
          <Button
            colorScheme={option.isLinked ? 'red' : 'green'}
            alignSelf="center"
            borderRadius="full"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
            onClick={onSave}
          >
            {option.isLinked ? 'Remover' : 'Adicionar'}
          </Button>
        </Flex>
      </Box>
  );
}
