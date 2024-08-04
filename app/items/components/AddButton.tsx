'use client';
import React, { useState } from 'react'
import { Box, Modal, TextField, Button, Typography } from '@mui/material'
import UpdateIcon from '@mui/icons-material/Update';
import { firestore } from '../../../firebase'
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
} from 'firebase/firestore'


const AddButton = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            sm: 300,
            md: 250,
            lg: 400,
        },
        height: {
            sm: 300,
            md: 250,
            lg: 400,
        },
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }

    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemDescription, setItemDescription] = useState('');
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createItem = async (name: string, quantity: number, description: string) => {
        const docRef = doc(collection(firestore, 'inventory'), name);
        const newData = {
            quantity: quantity,
            description: description,
        }
        await setDoc(docRef, newData);
    }

    return (
        <Box>
            <Button variant="contained" size="small" onClick={handleOpen}>Add Item</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}>
                    <Typography sx={{ fontSize: '0.5rem' }}>Update name</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemName}
                        onChange={(e) => {
                            setItemName(e.target.value)
                        }} />
                    <Typography sx={{ fontSize: '0.5rem' }}>Update quantity</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemQuantity}
                        onChange={(e) => {
                            setItemQuantity(Number(e.target.value))
                        }} />
                    <Typography sx={{ fontSize: '0.5rem' }}>Update description</Typography>
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
                            createItem(itemName, itemQuantity, itemDescription);
                            setItemName('');
                            setItemQuantity(0);
                            setItemDescription('');
                            handleClose();
                        }}>
                        Add
                    </Button>
                </Box>
            </Modal >
        </Box >
    )
}

export default AddButton