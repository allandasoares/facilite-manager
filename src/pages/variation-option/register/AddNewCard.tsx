import {
  VStack, Text, chakra, Icon,
} from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';
import BaseCardWithForm from './BaseCardWithForm';

export default function AddNewCard({
  editState,
  setEditState,
  onSave,
}: any) {
  return (
    <BaseCardWithForm
      editState={editState}
      setEditState={setEditState}
      onSave={onSave}
      variationOptionId={0}
    >
      <VStack
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => setEditState({ id: 0, edit: true })}
      >
        <chakra.a display={'flex'}>
          <Icon as={MdAddCircleOutline} h={8} w={8} alignSelf={'center'} />
        </chakra.a>
        <Text fontSize="medium">Criar nova opção</Text>
      </VStack>
    </BaseCardWithForm>
  );
}
