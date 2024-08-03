'use client';
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { CameraType } from "react-camera-pro";
import { firestore } from '../../firebase'
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
import { addItem } from './ClassifyImage'
const CameraComponent = () => {
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen}>Take Photo</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box>
                    <Camera ref={cameraRef} errorMessages={[]} facingMode='user' aspectRatio={16 / 9} />
                    <button onClick={() => setImage(cameraRef.current.takePhoto())}>Take Photo</button>
                    {/* {addItem(image)} */}
                </Box>
            </Modal >
        </Box >
    );
};

export default CameraComponent;
