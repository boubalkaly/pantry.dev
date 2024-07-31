import React, { useState } from 'react'

import { Container, Typography, Box, Grid, Checkbox, FormControlLabel, TextField, Button } from '@mui/material'


const AddItemForm = () => {

    const [showItemForm, setShowItemForm] = useState(false)

    const [formData, setFormData] = useState({ title: " ", description: " ", quantity: " " })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData);
        setFormData({ title: " ", description: " ", quantity: " " })
        setShowItemForm(false);

    }

    const toggleForm = () => { //set the show alternatively from true to false
        setShowItemForm(!showItemForm);
    }


    return (
        <Container
            component="main"
            maxWidth="xs"

        >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center,'

                }}
            >
                <Typography>
                    Add an item d
                </Typography>

            </Box>
            <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}>
                <Grid spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='given-title'
                            name="title"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            autoFocus>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='given-description'
                            name="description"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            autoFocus>

                        </TextField>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='given-quantity'
                            name="quantity"
                            required
                            fullWidth
                            id="quantity"
                            label="Quantity"
                            autoFocus>

                        </TextField>

                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                </Grid>

            </Box>


        </Container>
    )
}

export default AddItemForm