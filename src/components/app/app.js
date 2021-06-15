import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import { Button } from 'reactstrap';


class App extends Component {
    state = {
        viewChar: true
    }

    onToggleChar = () => {
        console.log('click-click');
        console.log(this.state.viewChar);
        this.setState({
            viewChar: !this.state.viewChar
        })

    }
    render() {
        const {viewChar} = this.state;
        let charInfo = null;
        if (viewChar) {
            charInfo = (
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomChar/>
                        </Col>
                    </Row>
                )
        }
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    {charInfo}
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            <Button color="primary" onClick={this.onToggleChar} style={{ marginBottom: '1rem' }}>Toggle character</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

export default App;