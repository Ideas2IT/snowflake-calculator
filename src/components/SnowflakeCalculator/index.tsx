import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './SnowflakeCalculator.css';
import { Button, Modal, Table, Col, Row, Form, Container } from 'react-bootstrap';
import {
  wareHouseTableHeaders,
  storageCosts,
  categories,
  storageTypes,
  storageSize,
  categoryOfApplication,
  geoLocationsForAWS,
  geoLocationsForAZURE,
  geoLocationsForGCP,
  cloudPlatforms,
} from '../../const/SnowflakeConstants';

class SnowflakeCalculator extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isPopupOpen: false,
      wareHouses: [],
      wareHouseDialogValues: this.initialDialogValues(),
      totalCost: 0,
      totalCredits: 0,
    };
  }

  deleteWareHouse = (event: any) => {
    const { wareHouses }: any = this.state;
    const index = wareHouses.indexOf(wareHouses[event.target.id]);
    if (index > -1) {
      wareHouses.splice(index, 1);
    }
    this.setState({
      wareHouses,
    });
    this.calculateCost(event);
  };

  initialDialogValues = () => ({
    categoryOfApplication: 'Standard',
    cloudPlatform: 'AWS',
    geographyOfApplication: 'US East (Northern Virginia)',
    typeOfStorage: 'On Demand',
    sizeOfWarehouse: 'XS',
    numberOfSessionsPerDay: '',
    numberOfDaysOfWeek: '1',
    estimatedStorage: '',
    durationOfEachSession: '',
  });

  clearWareHouse = () => {
    this.setState({
      wareHouses: [],
      totalCost: 0,
      totalCredits: 0,
    });
  };

  handleDialogChange = (name: any, value: any) => {
    let { wareHouseDialogValues }: any = this.state;
    // reset to first geolocation value when cloud platform change
    if (name === 'cloudPlatform') {
      const geoLocations = this.getGeographyByPlatform(value);
      wareHouseDialogValues['geographyOfApplication'] = geoLocations[0];
    }
    wareHouseDialogValues[name] = value;
    this.setState({ wareHouseDialogValues });
  };

  handleDialogClose = () => {
    this.setState({
      isPopupOpen: false,
      wareHouseDialogValues: this.initialDialogValues(),
    });
  };

  onclickSave = (event: any) => {
    event.preventDefault();
    let { wareHouses, wareHouseDialogValues }: any = this.state;
    wareHouses.push(wareHouseDialogValues);
    this.setState({
      wareHouses,
      isPopupOpen: false,
      wareHouseDialogValues: this.initialDialogValues(),
    });
    this.calculateCost(event);
  };

  isFormNotValid = () => {
    const { wareHouseDialogValues }: any = this.state;
    let isNotValid = false;
    Object.values(wareHouseDialogValues).forEach((value: any) => {
      if (
        !value ||
        // check if user manually entered value less than 1
        (value && !isNaN(Number(value)) && value < 1)
      ) {
        isNotValid = true;
      }
    });
    return isNotValid;
  };

  calculateCost = (event: any) => {
    event.preventDefault();
    let totalCredits = 0;
    let totalCharges = 0;
    const { wareHouses }: any = this.state;
    wareHouses.forEach((warehouse: any) => {
      const {
        durationOfEachSession,
        numberOfSessionsPerDay,
        numberOfDaysOfWeek,
        sizeOfWarehouse,
        categoryOfApplication,
        geographyOfApplication,
        typeOfStorage,
        estimatedStorage,
        cloudPlatform,
      }: any = warehouse;

      let totalHrs =
        (Number(durationOfEachSession) * Number(numberOfSessionsPerDay) * (Number(numberOfDaysOfWeek) * 4.5)) / 60;
      let credits = this.getCreditHrs(sizeOfWarehouse) * totalHrs;
      let charges =
        credits * this.getPriceByCategory(cloudPlatform, geographyOfApplication, categoryOfApplication) +
        this.getStorageCost(cloudPlatform, geographyOfApplication, typeOfStorage) * Number(estimatedStorage);

      totalCredits += credits;
      totalCharges += charges;
    });
    totalCredits = Math.round(totalCredits * 100) / 100;
    totalCharges = Math.round(totalCharges * 100) / 100;
    this.setState({
      totalCost: totalCharges,
      totalCredits: totalCredits,
    });
  };

  getStorageCost: any = (platform: any, geographyOfApplication: any, typeOfStorage: any) => {
    const item = storageCosts.find((storageCost) => {
      return storageCost.geo === geographyOfApplication && storageCost.platform === platform;
    });
    if (typeOfStorage === storageTypes.ON_DEMAND) {
      return item?.onDemand;
    } else if (typeOfStorage === storageTypes.PRE_PURCHASE) {
      return item?.prePurchase;
    }
  };

  getPriceByCategory: any = (platform: any, geographyOfApplication: any, category: any) => {
    const item = categories.find((category) => {
      return category.geo === geographyOfApplication && category.platform === platform;
    });
    if (category === categoryOfApplication.STANDARD) {
      return item?.standard;
    } else if (category === categoryOfApplication.ENTERPRISE) {
      return item?.enterprise;
    } else if (category === categoryOfApplication.BUSINESS_CRITICAL) {
      return item?.businessCritical;
    }
  };

  getCreditHrs: any = (size: any) => {
    const item = storageSize.find((storageItem) => storageItem?.size === size);
    return item?.credits;
  };

  getGeographyByPlatform = (value?: any) => {
    const { wareHouseDialogValues }: any = this.state;
    const platformValue = value || wareHouseDialogValues.cloudPlatform;
    let geoLocations: any = [];
    switch (platformValue) {
      case cloudPlatforms.AWS:
        geoLocations = geoLocationsForAWS;
        break;
      case cloudPlatforms.AZURE:
        geoLocations = geoLocationsForAZURE;
        break;
      case cloudPlatforms.GCP:
        geoLocations = geoLocationsForGCP;
        break;
      default:
        break;
    }
    return geoLocations;
  };

  public render() {
    const { wareHouses, totalCost, totalCredits }: any = this.state;
    return (
      <Container style={{ maxWidth: '1561px' }}>
        <div>
          <h3 className='header'>SNOWFLAKE PRICING</h3>
        </div>
        <p className='content'>
          Designed to help you estimate your Snowflake costs. Understand what you will pay for and control your cost
        </p>
        <p className='TableHeader'>All warehouses</p>
        <div className='TableTitle'>
          <Table responsive>
            <thead>
              <tr>
                {wareHouseTableHeaders.map((header, index) => (
                  <th className='TableTitle' key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wareHouses.map((wareHouse: any, index: any) => (
                <tr key={index} id={index.toString()}>
                  {Object.values(wareHouse).map((itemValues: any, itemIndex: any) => (
                    <td key={itemIndex}>{itemValues}</td>
                  ))}
                  <td key={wareHouse.length + 1}>
                    <Button id={index.toString()} onClick={(event) => this.deleteWareHouse(event)} variant='danger'>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {this.renderFooter()}
        {this.renderDialog()}
        <p className='costAndCredit'>Estimated Cost of the above is {totalCost} USD per month</p>
        <p className='costAndCredit'>Total credits consumed is {totalCredits} per month</p>
      </Container>
    );
  }

  renderFooter = () => {
    const { wareHouses }: any = this.state;
    return (
      <>
        <Button
          variant='primary'
          onClick={() => {
            this.setState({ isPopupOpen: true });
          }}>
          <i className='fa fa-plus'></i>
          Add Entry
        </Button>
        {wareHouses.length > 0 && (
          <Button className='clearAll' variant='primary' onClick={this.clearWareHouse}>
            <i className='fa fa-trash'></i>
            Clear All
          </Button>
        )}
      </>
    );
  };

  renderDialog = () => {
    const { isPopupOpen, wareHouseDialogValues }: any = this.state;
    return (
      <>
        {isPopupOpen && (
          <Modal
            show={isPopupOpen}
            onHide={this.handleDialogClose}
            size='xl'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            animation={false}>
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-vcenter'>Add a Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Category of application'>
                      <Form.Label>Category of application</Form.Label>
                      <Form.Control
                        required
                        as='select'
                        value={wareHouseDialogValues?.categoryOfApplication}
                        onChange={(event: any) => this.handleDialogChange('categoryOfApplication', event.target.value)}>
                        {Object.values(categoryOfApplication).map((category: any, index: number) => (
                          <option key={index}>{category}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Cloud Platform'>
                      <Form.Label>Cloud Platform</Form.Label>
                      <Form.Control
                        required
                        as='select'
                        value={wareHouseDialogValues?.cloudPlatform}
                        onChange={(event: any) => this.handleDialogChange('cloudPlatform', event.target.value)}>
                        {Object.values(cloudPlatforms).map((platform: any, index: number) => (
                          <option key={index}>{platform}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Geography of application'>
                      <Form.Label>Geography of application</Form.Label>
                      <Form.Control
                        required
                        as='select'
                        value={wareHouseDialogValues?.geographyOfApplication}
                        onChange={(event: any) =>
                          this.handleDialogChange('geographyOfApplication', event.target.value)
                        }>
                        {this.getGeographyByPlatform().map((geo: any, index: number) => (
                          <option key={index}>{geo}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Type of storage'>
                      <Form.Label>Type of storage</Form.Label>
                      <Form.Control
                        required
                        as='select'
                        value={wareHouseDialogValues?.typeOfStorage}
                        onChange={(event: any) => this.handleDialogChange('typeOfStorage', event.target.value)}>
                        {Object.values(storageTypes).map((type: any, index: number) => (
                          <option key={index}>{type}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Size of warehouse'>
                      <Form.Label>Size of warehouse</Form.Label>
                      <Form.Control
                        required
                        as='select'
                        value={wareHouseDialogValues?.sizeOfWarehouse}
                        onChange={(event: any) => this.handleDialogChange('sizeOfWarehouse', event.target.value)}>
                        {storageSize.map((item: any, index: number) => (
                          <option key={index}>{item?.size}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Number of sessions per day'>
                      <Form.Label>Number of sessions per day</Form.Label>
                      <Form.Control
                        required
                        autoComplete='off'
                        min='1'
                        type='number'
                        value={wareHouseDialogValues?.numberOfSessionsPerDay}
                        onChange={(event: any) => this.handleDialogChange('numberOfSessionsPerDay', event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Number of days of week'>
                      <Form.Label>Number of days of week</Form.Label>
                      <Form.Control
                        required
                        as='select'
                        value={wareHouseDialogValues?.numberOfDaysOfWeek}
                        onChange={(event: any) => this.handleDialogChange('numberOfDaysOfWeek', event.target.value)}>
                        {Array(7)
                          .fill('_')
                          .map((_: any, index: number) => (
                            <option key={index}>{index + 1}</option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Estimated storage per month (TB)'>
                      <Form.Label>Estimated storage per month (TB)</Form.Label>
                      <Form.Control
                        required
                        autoComplete='off'
                        min='1'
                        type='number'
                        value={wareHouseDialogValues?.estimatedStorage}
                        onChange={(event: any) => this.handleDialogChange('estimatedStorage', event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={0} md={6}>
                    <Form.Group as={Col} controlId='Duration of each session (mins)'>
                      <Form.Label>Duration of each session (mins)</Form.Label>
                      <Form.Control
                        required
                        autoComplete='off'
                        min='1'
                        type='number'
                        value={wareHouseDialogValues?.durationOfEachSession}
                        onChange={(event: any) => this.handleDialogChange('durationOfEachSession', event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' disabled={this.isFormNotValid()} onClick={this.onclickSave}>
                <i className='fa fa-plus'></i>Add
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  };
}

export default SnowflakeCalculator;
