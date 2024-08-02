import React, { useState } from 'react'
import { Box, Modal, TextField, Button, Typography } from '@mui/material'
import UpdateIcon from '@mui/icons-material/Update';
import { firestore } from '../../firebase'
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
} from 'firebase/firestore'
interface UpdateButtonProps {

    name: string;
    quantity: number;
    description: string;
}

const UpdateButton = ({ name, quantity, description }: UpdateButtonProps) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }
    const oldName = name;
    const [itemName, setItemName] = useState(name);
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [itemDescription, setItemDescription] = useState(description);
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const updateItem = async (oldName: string, newName: string, newQuantity: number, newDescription: string) => {
        const oldDocRef = doc(collection(firestore, 'inventory'), oldName)
        const newDocRef = doc(collection(firestore, 'inventory'), newName)
        const docSnap = await getDoc(oldDocRef)
        if (docSnap.exists()) {
            await setDoc(newDocRef, {
                quantity: newQuantity,
                description: newDescription
            })
            await deleteDoc(oldDocRef);
        }
        // await updateInventory();
    }
    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen}><UpdateIcon /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}>
                    <Typography variant="h3">Update name</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemName}
                        onChange={(e) => {
                            setItemName(e.target.value)
                        }} />
                    <Typography variant="h3">Update quantity</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemQuantity}
                        onChange={(e) => {
                            setItemQuantity(Number(e.target.value))
                        }} />
                    <Typography variant="h3">Update description</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemDescription}
                        onChange={(e) => {
                            setItemDescription(e.target.value)
                        }} />

                    <Button
                        variant="outlined"
                        onClick={() => {
                            updateItem(oldName, itemName, itemQuantity, itemDescription);
                            setItemName(itemName);
                            setItemQuantity(itemQuantity);
                            setItemDescription(itemDescription);
                            handleClose();
                        }}>
                        Add
                    </Button>
                </Box>
            </Modal >
        </Box >
    )
}

export default UpdateButton


