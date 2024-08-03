'use client'
import React, { useState, useRef } from "react";
import { firestore } from '../../firebase.js'
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

// const dotenv = require('dotenv');
// dotenv.config();
import { OpenAI } from "openai"

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });


export const addItem = async () => {

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant. Your response should be in JSON format"
            },
            {
                role: "user",
                content: [{
                    type: "text",
                    text: "I want you to look at this image and tell me the object/item that you see, how many of them you see, and a short description of the object itself, not the image as a whole. return clean JSON. it should have the attributes: 'name', 'quantity', 'description'",
                },
                {
                    type: "image_url",
                    image_url: {
                        // url: `data:image/jpg;base64,${image}`,
                        url: "https://assets.clevelandclinic.org/transform/LargeFeatureImage/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg",
                        detial: 'low',
                    }
                }
                ]
            }
        ]
    })
    const item = JSON.parse(response.choices[0].message.content)
    console.log(item)

    // const docRef = doc(collection(firestore, 'inventory'), item.name)
    // const data = {
    //     quantity: Number(quantity),
    //     description: description,
    //     image: image,
    // }

    // await setDoc(docRef, data);
}

addItem();