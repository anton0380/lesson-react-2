import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected}
                    getData={this.gotService.getAllCharacters}/>
                </Col> 
                <Col md='6'>
                    <CharDetails charId={this.state.selectedChar}/>
                </Col>
            </Row>
        )
    }    
}