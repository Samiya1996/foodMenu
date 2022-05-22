import React from "react";
import { Layout } from 'antd';
import data from './data'
import Card from '@mui/material/Card';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FoodCard from './card';
import pointOfTruth from "./pointOfTruth";
import { Row, Col } from 'antd';

import './foodList.css'
import { Input } from "@mui/material";

const { Header, Footer, Sider, Content } = Layout;
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
        console.log(menuList)
        let list = menuList ? menuList : this.state.menuList
        return (
            <Row spacing={2} style={{ margin: "5px" }}>
                {
                    list.map((item, index) => {
                        return (
                            <Col span={4}>
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
            <Row>
                <Row className="header" style={{display:'flex', justifyContent:'center'}}>
                    <div style={{width:'70vw'}}>
                        <Input fullWidth={true} placeholder="Search" onChange={(e) => this._handleChange(e.target.value)} />
                    </div>
                </Row>
                <Row style={{height:'80vh'}} >
                    <Col span={4}>
                        <MenuList>{resturentList.map(a =>
                            <MenuItem onClick={() => this._onMenueClick(a)} key={a}>{a}</MenuItem>)}
                        </MenuList>
                    </Col>
                    <Col span={20}>
                    {this.renderCard()}
                    </Col>
                       
                </Row>
                <Row>
                    <Col span={7}  style={{ backgroundColor: '#ffff00', margin:"20px", padding: "5px", borderRadius: "20px", display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={() => this._handleAll(true)}>All Available</Col>
                    <Col span={7} style={{  backgroundColor: '#ffff00', margin:"20px", padding: "5px", borderRadius: "20px", display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={() => this._handleAll(false)}>All Unavailable</Col>
                    <Col span={7} style={{  backgroundColor: '#ffff00',  margin:"20px", padding: "5px", borderRadius: "20px", display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={() => this.setState({ applied: true })}>Apply</Col>
                </Row>
            </Row>
        )
    }

}

export default FoodList