// components/dialogs/AddDialog.tsx
import { useDialogStore } from '@/app/store/useDialogStore';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export const AddDialog = () => {
  const { closeDialog } = useDialogStore();

  return (
    <AlertDialog isOpen onClose={closeDialog} size='md'>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className='text-typography-950 font-semibold' size='md'>
            Are you sure you want to delete this post?
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className='mt-3 mb-4'>
          <Text size='sm'>
            Deleting the post will remove it permanently and cannot be undone.
            Please confirm if you want to proceed.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className=''>
          <Button
            variant='outline'
            action='secondary'
            onPress={closeDialog}
            size='sm'>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size='sm' onPress={closeDialog}>
            <ButtonText>Delete</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
