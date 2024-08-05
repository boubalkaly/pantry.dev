'use client';
import React, { useState, useEffect } from 'react'
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
import { ProductionQuantityLimits } from '@mui/icons-material';

interface updateButtonProps {
    name: string;
}

const UpdateButton = ({ name }: updateButtonProps) => {
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




    // const [oldName, setOldName] = useState('')
    // const [oldQuantity, setOldQuantity] = useState(0);
    // const [oldDescription, setOldDescription] = useState('');
    const [itemName, setItemName] = useState(name);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemDescription, setItemDescription] = useState('');

    const [open, setOpen] = useState(false)
    const handleOpen: () => void = () => setOpen(true);
    const handleClose: () => void = () => setOpen(false);

    const fetchCurrentData = async () => {
        const docRef = doc(collection(firestore, 'inventory'), name);
        const docSnap = await getDoc(docRef);


        setItemName(docSnap.id)
        const data = docSnap.data()
        if (data) {
            setItemQuantity(Number(data.quantity));
            setItemDescription(data.description);
        }

    }



    const updateItem = async (name: string, newQuantity: number, newDescription: string) => {
        const docRef = doc(collection(firestore, 'inventory'), name)
        const newData =
        {
            quantity: newQuantity,
            description: newDescription,
        }
        await setDoc(docRef, newData);
        fetchCurrentData()
        console.log(`Data for ${name} updated successfully!`)
        // await updateInventory();
    }
    useEffect(() => {
        fetchCurrentData();
    }, [])




    return (
        <Box>
            <Button variant="outlined" size="small" onClick={handleOpen}><UpdateIcon /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}>
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
                            updateItem(itemName, itemQuantity, itemDescription);
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

export default UpdateButton