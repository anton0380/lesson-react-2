import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import {BooksItem} from '../pages';


class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })

    }


    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                <Button color="primary" onClick={this.toggleRandomChar} style={{ marginBottom: '40px' }}>Toggle character</Button>
                            </Col> 
                        </Row>
                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={() => (
                            <Row>
                                <Col md='6'>
                                    <ItemList 
                                        onItemSelected={this.onItemSelected}
                                        getData={this.gotService.getAllHouses}
                                        renderItem={(item) => item.name}/>
                                </Col> 
                                <Col md='6'>
                                    <CharDetails charId={this.state.selectedChar}/>
                                </Col>
                            </Row>
                        )}/>
                        {/* <Route path='/books' exact component={() => (
                            <Row>
                                <Col md='6'>
                                    <ItemList 
                                        onItemSelected={this.onItemSelected}
                                        getData={this.gotService.getAllBooks}
                                        renderItem={(item) => item.name}/>


                                </Col> 
                                <Col md='6'>
                                    <CharDetails charId={this.state.selectedChar}/>
                                </Col>
                            </Row>
                        )}/> */}

                        <Route path='/books/:id' render={
                            () => <BooksItem/>
                        }/>
                        
                    </Container>
                </div>
            </Router>
        );
    }
};

export default App;

