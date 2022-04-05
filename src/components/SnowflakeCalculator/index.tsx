import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './SnowflakeCalculator.css'
import {Button, Modal, Table, Col, Row, Form, Container} from 'react-bootstrap';

const tableHeaders = ['Category','Geography','Size','No of days per week', 'No of sessions per day', 
  'Duration of session (mins)', 'Estimated Storage (TB)', 'Type of storage', 'Action'		
]
let estimatedStorage = '';
let categoryOfApplication = 'Standard';
let typeOfStorage = 'On Demand';
let numberOfSessionsPerDay = '';
let geographyOfApplication = 'US';
let sizeOfWarehouse = 'XS';
let numberOfDaysOfWeek = '1';
let durationOfEachSession = '';

class SnowflakeCalculator extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      isPopupOpen: false,
      addedWareHouses: [],
      onclickSave: this.onclickSave,
      totalCost: 0,
      totalCredits: 0
    };
  }

  public render() {
    const addedWareHouses:any = this.state;
    return (
      <Container style={{maxWidth:'1561px'}}>
        <div>
          <h3 className="header">SNOWFLAKE PRICING</h3>
        </div>
        <p className="content">
          Designed to help you estimate your Snowflake costs. Understand what you will pay for and control your cost
        </p>
        <p className="TableHeader">
          All warehouses
        </p>
        <div className="TableTitle">
          <Table responsive>
            <thead>
              <tr>
                {Array.from({ length: tableHeaders.length }).map((_, index) => (
                  <th className="TableTitle" key={index}>{tableHeaders[index]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: addedWareHouses.addedWareHouses.length }).map((_, index) => (
                  <tr id={index.toString()}>
                    {
                    addedWareHouses.addedWareHouses[index].map((addedWareHouse:any, innerIndex:any) =>  (
                    <td key={innerIndex}>{addedWareHouse}</td>
                  ))}
                  <td key={9}><Button id={index.toString()} onClick={event => this.deleteWareHouse(event)} variant="danger">Delete</Button></td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <this.app/>
        <p className="costAndCredit">
          Estimated Cost of the above is {addedWareHouses.totalCost} USD per month
        </p>
        <p className="costAndCredit">
          Total credits consumed is {addedWareHouses.totalCredits} per month
        </p>
      </Container>
    );
  }

  deleteWareHouse = (event:any) => {
    const addedWareHouses:any = this.state;
    const index = addedWareHouses.addedWareHouses.indexOf(addedWareHouses.addedWareHouses[event.target.id]);
    if (index > -1) {
      addedWareHouses.addedWareHouses.splice(index, 1);
    }
    this.setState({
      addedWareHouses: addedWareHouses.addedWareHouses
    })
    this.calculateCost(event);
  }

  onclickSave = (event:any) => {
    event.preventDefault();
    const addedWareHouses:any = this.state;
    let res = [];
    res.push(categoryOfApplication, geographyOfApplication, sizeOfWarehouse, numberOfDaysOfWeek,
      numberOfSessionsPerDay, durationOfEachSession, estimatedStorage, typeOfStorage);
    addedWareHouses.addedWareHouses.push(res); 
    this.setState({
      addedWareHouses: addedWareHouses.addedWareHouses,
      isPopupOpen: false
    });
    estimatedStorage = '';
    categoryOfApplication = 'Standard';
    typeOfStorage = 'On Demand';
    numberOfSessionsPerDay = '';
    geographyOfApplication = 'US';
    sizeOfWarehouse = 'XS';
    numberOfDaysOfWeek = '1';
    durationOfEachSession = '';
    this.calculateCost(event);
  }  

  calculateCost = (event:any) => {
    event.preventDefault();
    const currentState:any = this.state;
    const addedWareHouses = currentState.addedWareHouses;
    let totalHrs = 0;
    let totalCredits = 0;
    let totalCharges = 0;
    addedWareHouses.forEach((addedWareHouse:any) => {
      totalHrs = (Number(addedWareHouse[5]) * Number(addedWareHouse[4]) * Number(addedWareHouse[3])) / 60;
      let newTotalCredits = (this.getCreditHrs(addedWareHouse[2])) * ((Number(addedWareHouse[5]) * Number(addedWareHouse[4]) * Number(addedWareHouse[3])) / 60);
      totalCredits += this.getCreditHrs(addedWareHouse[2]) * totalHrs;
      totalCharges += (newTotalCredits * this.getPriceByCategory(addedWareHouse[1], addedWareHouse[0])) +
        (this.getStorageCost(addedWareHouse[1], addedWareHouse[7]) * Number(addedWareHouse[6]))
    });
    totalCredits = Math.round(totalCredits * 100) / 100;
    totalCharges = Math.round(totalCharges * 100) / 100;
    this.setState({
      totalCost: totalCharges,
      totalCredits: totalCredits
    })
  }

  getStorageCost:any = (geographyOfApplication:any, typeOfStorage:any) => {
    if (typeOfStorage === 'On Demand') {
      return 40;
    }
    const storageCosts =   [{geo:'US', rate:23},  
      {geo:'Canada',rate:25},
      {geo:'Ireland',rate: 23}, 
      {geo:'Frankfurt',rate:24.5}, 
      {geo: 'Sydney', rate: 25},  
      {geo:'Singapore', rate:25}, 
      {geo: 'Tokyo', rate:25}, 
      {geo:'Mumbai', rate:25
    }]
    let dummycost:any =storageCosts.filter((storageCost) => {
      return storageCost.geo === geographyOfApplication
    })
    if (typeOfStorage === 'Pre Purchase') {
      return dummycost[0].rate;
    }
  }

  getPriceByCategory:any = (geographyOfApplication:any, categoryOfApplication:any) => {
    const categories =   [{geo:'US', std:2, ent:3, biz:4},
      {geo:'Canada', std:2.25, ent:3.5, biz:4.5}, 
      {geo:'Ireland', std:2.5, ent:3.7, biz:4.5},
      {geo:'Frankfurt', std:2.7, ent:4, biz:5.4},
      {geo:'Sydney', std:2.75, ent:4.05 ,biz:5.5},  
      {geo:'Singapore', std:2.5, ent:3.7, biz:5.7}, 
      {geo:'Tokyo', std:2.85, ent:4.3 ,biz:5.7},
      {geo:'Mumbai', std:2.2, ent:3.3, biz:4.4
    }]
    let dummycat:any =categories.filter((category) => {
      return category.geo === geographyOfApplication
    })
    if (categoryOfApplication === 'Standard') {
      return dummycat[0].std;
    } else if (categoryOfApplication === 'Enterprise') {
      return dummycat[0].ent;
    } else if (categoryOfApplication === 'Business Critical') {
      return dummycat[0].biz
    }
  }

  getCreditHrs:any= (size:any) => {
    switch(size) {
      case 'XS':
        return 1;
      case 'S':
        return 2;
      case 'M':
        return 4;
      case 'L':
        return 8;
      case 'XL':
        return 16;
      case '2XL':
        return 32;
      case '3XL':
        return 64;
      case '4XL':
        return 128;
    }
  }

  app = ()=> {
    const currentState:any = this.state;
    const onclickSave:any = this.state;
    return (
      <>
        <Button variant="primary" onClick={() => {this.setState({isPopupOpen:true})}}><i className="fa fa-plus" ></i>
          Add Entry
        </Button>
        <Button className="clearAll" variant="primary" onClick={() => {this.setState({addedWareHouses:[],totalCost:0,totalCredits:0})}}>
          <i className="fa fa-trash"></i>
          Clear All
        </Button>
        {currentState.isPopupOpen &&         
          <Modal
            show={currentState.isPopupOpen}
            onHide={() => {this.setState({isPopupOpen:false})}}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add a Warehouse
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Row>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Category of application">
                  <Form.Label>Category of application</Form.Label>
                  <Form.Control required as="select"
                    onChange={event =>
                      categoryOfApplication =  event.target.value           
                    }>
                    <option>Standard</option>
                    <option>Enterprise</option>
                    <option>Business Critical</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Geography of application">
                  <Form.Label>Geography of application</Form.Label>
                  <Form.Control required as="select"
                    onChange={event =>
                      geographyOfApplication =  event.target.value           
                    }>
                    <option>US</option>
                    <option>Ireland</option>
                    <option>Frankfurt</option>
                    <option>Sydney</option>
                    <option>Singapore</option>
                    <option>Tokyo</option>
                    <option>Mumbai</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Type of storage">
                  <Form.Label>Type of storage</Form.Label>
                  <Form.Control required as="select"
                    onChange={event =>
                      typeOfStorage =  event.target.value           
                    }>
                    <option>On Demand</option>
                    <option>Pre Purchase</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Size of warehouse">
                  <Form.Label>Size of warehouse</Form.Label>
                  <Form.Control required as="select"
                    onChange={event =>
                      sizeOfWarehouse =  event.target.value           
                    }>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>2XL</option>
                    <option>3XL</option>
                    <option>4XL</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Number of sessions per day">
                  <Form.Label>Number of sessions per day</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      min="1"
                      type="number"
                      onChange={event =>
                        numberOfSessionsPerDay =  event.target.value           
                      }
                    />
                </Form.Group>
              </Col>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Number of days of week">
                  <Form.Label>Number of days of week</Form.Label>
                    <Form.Control required as="select"
                      onChange={event =>
                        numberOfDaysOfWeek =  event.target.value           
                      }>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                    </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Estimated storage p.m (TB)">
                  <Form.Label>Estimated storage p.m (TB)</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      min="1"
                      type="number"
                      onChange={event =>
                        estimatedStorage =  event.target.value           
                      }
                    />
                </Form.Group>
              </Col>
              <Col xs={0} md={6}>
                <Form.Group as={Col} controlId="Duration of each session (mins)">
                  <Form.Label>Duration of each session (mins)</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      min="1"
                      type="number"
                      onChange={event =>
                        durationOfEachSession =  event.target.value           
                      }
                    />
                </Form.Group>
              </Col>
            </Row>
          </Form>      
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={onclickSave.onclickSave}><i className="fa fa-plus" ></i>Add</Button>
          </Modal.Footer>
        </Modal>} 
      </>
    );
  }
}

export default SnowflakeCalculator;

 