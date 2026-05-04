import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { deleteProduct } from '@/app/service/adminProduct';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

    const eliminar = async (id:number) =>{
        deleteProduct(id)

    }


type Props = {
  open: boolean;
  id:number;
  onClose: () => void;
};

export default function AlertDialogSlide({ open, onClose,id }: Props) {


  return (
    <React.Fragment>

      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           ¿Seguro que desea Eliminar este producto permanentemente? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Cancelar
          </Button>
          <Button onClick={() => {onClose() ; eliminar(id)}   }>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}