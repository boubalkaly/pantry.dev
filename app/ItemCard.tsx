import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ItemCardProps {
    title: string;
    description: string;
    quantity: string;
}


const ItemCard = ({ title, description, quantity }: ItemCardProps) => {
    return (
        <Card sx={{ maxWidth: 500, minWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 2 }}>
                <Typography>
                    {quantity}
                </Typography>
                <Button size="small">+</Button>
            </CardActions>
        </Card >
    )
}

export default ItemCard