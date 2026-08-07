import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

    const eliminar = async (id:number | undefined) =>{
      if( id) deleteProduct(id);

    }


type Props = {
  open: boolean;
  onClose: () => void;
  texto:string;
};

export default function Alert({ open, onClose, texto}: Props) {

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
           {texto}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={() => {onClose() }   }>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}