'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import ItemCard from '../ItemCard'
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
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

    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemDescription, setItemDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    interface InventoryItem {
        name: string;
        [key: string]: any;
    }

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
            await deleteDoc(docRef);
        }
        await updateInventory()
    }


    const increment = async (item: any) => {
        const docRef = doc(collection(firestore, 'inventory'), item);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { quantity, description } = docSnap.data();
            await setDoc(docRef, { quantity: quantity + 1, description }, { merge: true })
        }
        await updateInventory();
    }

    const decrement = async (item: any) => {
        const docRef = doc(collection(firestore, 'inventory'), item);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { quantity, description } = docSnap.data();
            await setDoc(docRef, { quantity: quantity - 1, description }, { merge: true });
        }
        await updateInventory();
    }
    const addItem = async (name: string, quantity: number, description: string) => {
        const docRef = doc(collection(firestore, 'inventory'), name);

        const data = {
            quantity: quantity,
            description: description
        }
        await setDoc(docRef, data);

        await updateInventory();
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
    }, [inventory]) //update only once when the component mounts

    return (
        <Box
            padding={4}
        >
            <Box

                display={'flex'}
                justifyContent={'end'}
                alignItems={'center'}
                gap={4}
                marginBottom={3}
                paddingBottom={1}
                borderBottom="1px solid #333"
            >
                <Button variant="outlined"><FilterListIcon /></Button>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search state
                />
                <Button variant="outlined"><SearchIcon /></Button>
                <Button variant="contained" onClick={handleOpen}>Add Item</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style}>
                        <Typography variant="h3">Add name</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={itemName}
                            onChange={(e) => {
                                setItemName(e.target.value)
                            }} />
                        <Typography variant="h3">Add quantity</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={itemQuantity}
                            onChange={(e) => {
                                setItemQuantity(Number(e.target.value))
                            }} />
                        <Typography variant="h3">Add description</Typography>
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
                                addItem(itemName, itemQuantity, itemDescription);
                                setItemName('')
                                setItemQuantity(0)
                                setItemDescription('')
                                handleClose();
                            }}>
                            Add
                        </Button>
                    </Box>
                </Modal>

            </Box>
            <Box border={'1px solid #333'}>
                <Box
                    width="100%"
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
                <Stack width="100%" height="300px" spacing={2} overflow={'auto'}>
                    {inventory.filter(({ name }) => name.toLowerCase().includes(searchQuery.toLowerCase())).map(({ name, quantity, description }) => (

                        <Box key={name}>
                            <ItemCard
                                name={name}
                                quantity={quantity}
                                description={description}
                                removeItem={() => removeItem(name)}
                                increment={() => increment(name)}
                                decrement={() => decrement(name)}
                            />
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
} // Close the Items component here

export default Items


// width = "100vw"
// height = "100vh"
// display = { 'flex'}
// justifyContent = { 'center'}
// flexDirection = { 'column'}
// alignItems = { 'center'}
// gap = { 2}