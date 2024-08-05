'use client';
import React, { useState, useEffect } from 'react'
import { Box, Modal, TextField, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
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


interface updateButtonProps {
    name: string;
}

const DeleteButton = ({ name }: updateButtonProps) => {

    const deleteItem = async (name: string) => {
        const docRef = doc(collection(firestore, 'inventory'), name)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await deleteDoc(docRef)
            console.log(`Removing the following item: ${name}`)
        }
    }

    return (
        <Box>
            <Button variant="outlined" size="small" onClick={() => deleteItem(name)}><DeleteIcon /></Button>
        </Box >
    )
}

export default DeleteButton;