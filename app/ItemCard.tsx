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

interface ItemCardProps {
    name: string;
    description?: string;
    quantity: string;
    increment?: (itemName: any) => void;
    decrement?: (itemname: any) => void;
    removeItem: (itemName: any) => void;
    updateItem?: (itemName: any) => void;
}


const ItemCard = ({ name, description, quantity, increment, decrement, removeItem, updateItem }: ItemCardProps) => {
    return (
        <Card sx={{ maxWidth: 300, minWidth: 150 }}>
            {/* <CardMedia
                sx={{ height: 150 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {name}
                </Typography>
                <Button size="small" onClick={() => removeItem(name)}><DeleteIcon /></Button>
                <Button size="small" onClick={() => updateItem?.(name)}><UpdateIcon /></Button>
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