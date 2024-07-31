'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import ItemCard from '../ItemCard'
import { ListItem, Stack, Box, Button, Typography, Modal, TextField } from '@mui/material'
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
const Items = () => {

    interface InventoryItem {
        name: string;
        [key: string]: any;
    }

    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState('')


    const updateInventory = async () => { //basically to render our current inventory whenever our page loads
        const snapshot = query(collection(firestore, 'inventory')) //fetch what we curerntly have in our database
        const docs = await getDocs(snapshot) //given the inventory, retrieve all the docs
        const inventoryList: InventoryItem[] = [];
        docs.forEach(doc => {
            inventoryList.push({ name: doc.id, ...doc.data() })
        })
        setInventory(inventoryList);
        console.log(inventory);
    }

    const removeItem = async (item: any) => {
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const { quantity } = docSnap.data();
            if (quantity === 1) {
                await deleteDoc(docRef);
            } else {
                await setDoc(docRef, { quantity: quantity - 1 })
            }
        }
        await updateInventory()
    }
    const addItem = async (item: any) => {
        const docRef = doc(collection(firestore, 'inventory'), item)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) { //update the count the doc already exists
            const { quantity } = docSnap.data();
            await setDoc(docRef, { quantity: quantity + 1 })

        } else {
            await setDoc(docRef, { quantity: 1 })
        }
        await updateInventory()
    }


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

    useEffect(() => {
        updateInventory();
    }, []) //update only once when the component mounts





    return (
        <Box
            width="100vw"
            height="100vh"
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}>
            <Button variant="contained" onClick={handleOpen}>Add Item</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemName}
                        onChange={(e) => {
                            setItemName(e.target.value)
                        }} />

                    <Button
                        variant="outlined"
                        onClick={() => {
                            addItem(itemName);
                            setItemName('');
                            handleClose();
                        }}>
                        Add
                    </Button>
                </Box>
            </Modal>
            <Box border={'1px solid #333'}>
                <Box
                    width="800px"
                    height="100px"
                    bgcolor={'#ADD8E6'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
                        Inventory Items
                    </Typography>
                </Box>
                <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
                    {inventory.map(({ name, quantity }) => (
                        <Box
                            key={name}
                            width="100%"
                            minHeight="150px"
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            bgcolor={'#f0f0f0'}
                            paddingX={5}
                        >
                            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                            </Typography>
                            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                                Quantity: {quantity}
                            </Typography>
                            <Button variant="contained" onClick={() => removeItem(name)}>
                                Remove
                            </Button>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
} // Close the Items component here

export default Items