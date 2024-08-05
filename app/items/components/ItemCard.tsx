'use client';
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UpdateIcon from '@mui/icons-material/Update';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

interface ItemCardProps {
    name: string;
    description: string;
    quantity: number;
    increment: (itemName: any) => void;
    decrement: (itemname: any) => void;
    removeItem: (itemName: any) => void;

}


const ItemCard = ({ name, description, quantity, increment, decrement, removeItem }: ItemCardProps) => {
    return (
        <Card sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'

        }}>
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,

                }}
            >

                <Typography gutterBottom variant="h6" component="div"
                    sx={{
                        paddingRight: 20,
                        backgroundColor: 'gray',
                        width: '200px',

                    }}>
                    {name}
                </Typography>
                <DeleteButton name={name} />
                <UpdateButton
                    name={name}
                />
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => decrement?.(name)}><RemoveIcon /></Button>
                <Typography>
                    {quantity}
                </Typography>
                <Button onClick={() => increment?.(name)}><AddIcon /></Button>

            </CardActions>
        </Card >
    )
}

export default ItemCard