import React from "react";
import data from './data'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import FoodCard from './card';
import pointOfTruth from "./pointOfTruth";
import { Row, Col, Button } from 'antd';

import './foodList.css'
import { Input } from "@mui/material";


class FoodList extends React.Component {

    constructor() {
        super()

        this.state = {
            menuItems: [],
            pageType: "EATORAMA",
            resturantData: data,
            pointOfTruth: data,
            applied: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            menuItems: this.state.resturantData.menuDetails.EATORAMA
        })
    }

    _onCardClick = (item) => {
        let pageData = this.state.resturantData?.menuDetails[this.state.pageType]
        let modifiedData = pageData.filter(i => i.foodid === item.foodid)[0]
        modifiedData["outofstock"] = !pageData.filter(i => i.foodid === item.foodid)[0]["outofstock"]
        let modifiedPageData = []
        pageData.forEach((menue, i) => {
            if (menue.foodid !== item.foodid) {
                modifiedPageData.push(menue)
            } else {
                modifiedPageData.push(modifiedData)
            }
        })
        this.setState({
            resturantData: {
                "menuDetails": {
                    ...this.state.resturantData.menuDetails,
                    [this.state.pageType]: modifiedPageData
                }
            }
        })
    }

    _renderRest = (menuList) => {
        
        let list = menuList ? menuList : this.state.menuList
        return (
            <Row gutter={[32,32]} className='food-list-card-container'>
                {
                    list.map((item, index) => {
                        return (
                            <Col xs={16} sm = {10} lg={4}>
                                <FoodCard onCardClick={this._onCardClick} item={item} />
                            </Col>
                        )
                    }
                    )}
            </Row>
        )

    }

    renderCard = () => {
        let menuList = this.state.resturantData?.menuDetails[this.state.pageType]
        if (this.state.searchText) {
            menuList = this.state.resturantData?.menuDetails[this.state.pageType].map(item => {
                if (item.foodname.toLowerCase().includes(this.state.searchText.toLowerCase())) {
                    return item
                } else return null
            }).filter(a => a)
        }
        switch (this.state.pageType) {
            case "STARBUCKS":
                return this._renderRest(menuList)
            case "SOUP STATION":
                return this._renderRest(menuList)
            default:
                return this._renderRest(menuList)
        }
    }

    _internalLoop = (key, status) => {
        let restData = this.state.resturantData.menuDetails[key]
        let a = restData.map((item, i) => {
            return { ...item, outofstock: status }
        })
        return a;
    }

    _handleAll = (status) => {
        let allData = {}
        allData[this.state.pageType] = this._internalLoop(this.state.pageType, status)
        this.setState({ resturantData: { "menuDetails": { ...this.state.resturantData.menuDetails, ...allData } } })
    }

    _onMenueClick = (a) => {
        if (!this.state.applied) {
            this.setState({
                resturantData: {
                    "menuDetails": {
                        ...this.state.resturantData.menuDetails, [this.state.pageType]: pointOfTruth.menuDetails[this.state.pageType]
                    }
                }
            })
        }
        this.setState({ pageType: a })
    }

    _handleChange = (value) => {
        this.setState({ searchText: value })
    }

    render() {

        const resturentList = Object.keys(data.menuDetails)

        return (
            <>
                <Row className="header" style={{display:'flex', justifyContent:'center'}}>
                    <div style={{width:'70vw'}}>
                        <Input fullWidth={true} placeholder="Search" onChange={(e) => this._handleChange(e.target.value)} />
                    </div>
                </Row>
                <Row classname="content-container-row">
                    <Col sx = {4} sm ={4} lg={4}>
                        <MenuList>{resturentList.map(a =>
                            <MenuItem onClick={() => this._onMenueClick(a)} key={a}>{a}</MenuItem>)}
                        </MenuList>
                    </Col>
                    <Col sx = {12} sm ={12} lg={20}>
                    {this.renderCard()}
                    </Col>
                </Row>
                <Row gutter={[32,32]}>
                    
                    <Col   sx = {24} sm ={6} lg={7} style={{ backgroundColor: '#ffff00', justifyContent: "center",  margin:"20px", padding: "5px", borderRadius: "20px", display: "flex", justifyContent: "center",  cursor: "pointer" }} onClick={() => this._handleAll(true)}>All Available</Col>
                    <Col sx = {24} sm = {6} lg={7} style={{backgroundColor: '#ffff00',  margin:"20px", padding: "5px", borderRadius: "20px", display: "flex", justifyContent: "center",  cursor: "pointer" }} onClick={() => this._handleAll(false)}>All Unavailable</Col>    
                    <Col sx = {24} sm = {6} lg={7} style={{  backgroundColor: '#ffff00', margin:"20px", padding: "5px", borderRadius: "20px", display: "flex", justifyContent: "center",  cursor: "pointer" }} onClick={() => this.setState({ applied: true })}>Apply</Col>
                </Row>
            </>
        )
    }
}

export default FoodList