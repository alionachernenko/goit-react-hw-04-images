import {AiOutlineSearch} from 'react-icons/ai'
import PropTypes from 'prop-types';

import { Container, Form, Input, Button} from "./Searchbar.styled";
import { useState } from 'react';

export const Searchbar = ({onSubmit}) => {
    const [inputValue, setInputValue] = useState('')

    const onInputChange = (e) => {
        const {value} = e.target
        setInputValue(value)
    }
        
        return (
            <Container className="searchbar" >
                <Form className="form" onSubmit={(e) => onSubmit(e, inputValue.trim())}>
                    <Button type="submit" className="button">
                    <span className="button-label">Search</span>
                    <AiOutlineSearch size={20}/>
                    </Button>

                    <Input
                    value={inputValue}
                    onChange={onInputChange}
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </Form>
            </Container>
        )
    }

  Searchbar.propTypes = {
        onSubmit: PropTypes.func.isRequired
    }