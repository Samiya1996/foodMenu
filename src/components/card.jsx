import React from 'react';
import { CardContent, Card } from '@mui/material';

export default class FoodCard extends React.Component {
    render() {
        return (
            <Card style={{ cursor:'pointer', backgroundColor: this.props.item.outofstock ? "green" : "red", height:"125px" , width:"125px" }} onClick={() => this.props.onCardClick(this.props.item)}>
                <CardContent>
                    <div>{this.props.item.foodname}</div>
                </CardContent>
            </Card>
        )
    }
}
