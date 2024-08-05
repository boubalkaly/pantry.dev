'use client';
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { CameraType } from "react-camera-pro";
import { firestore } from '../../../firebase'
import { Box, Button, Modal } from "@mui/material";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
} from 'firebase/firestore'
const CameraComponent = () => {
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        console.log(`this is the image format: ${image}`)
    }, [image])
    const handleSubmit = async () => {
        const response = await fetch('../../api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: "You are a helpful chat assistant",
                image: image,
            })
        })
        if (!response.ok) {
            console.error('Error:', response.statusText)
        }
        try {
            let data = await response.json()
            data = JSON.parse(data);

            console.log(`image data: ${data ? data.description : 'no data was parsed'}`)

            const docRef = doc(collection(firestore, 'inventory'), data.name)
            const newData = {
                quantity: data.quantity,
                description: data.description,
            }
            await setDoc(docRef, newData);
            console.log('new item successfully created')

        } catch (error) {
            console.error('Error parsing the response from OpenAI', error)
        }

    }
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

    return (
        <Box>
            <Button variant="outlined" size="small" onClick={handleOpen}>Take Photo</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box
                    sx={style}>
                    <Camera ref={cameraRef} errorMessages={[]} facingMode='user' aspectRatio={16 / 9} />
                    <button onClick={() => {
                        setImage(cameraRef.current.takePhoto())
                        handleSubmit();
                        handleClose();
                    }}>Submit Photo</button>

                </Box>
            </Modal >
        </Box >
    );
};

export default CameraComponent;
