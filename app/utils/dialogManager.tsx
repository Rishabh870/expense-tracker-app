// components/dialogs/DialogManager.tsx

import { AddDialog } from '../components/dialog/addDialog';
import { useDialogStore } from '../store/useDialogStore';

export const DialogManager = () => {
  const { dialogType } = useDialogStore();

  return <>{dialogType === 'add' && <AddDialog />}</>;
};
