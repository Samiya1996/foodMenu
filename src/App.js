import logo from './logo.svg';
import './App.css';
import FoodList from './components/foodList';
import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {

  constructor(){
    super()
  }

  render(){
    return (
      <FoodList/>
    );
  }
  
}

export default App;
