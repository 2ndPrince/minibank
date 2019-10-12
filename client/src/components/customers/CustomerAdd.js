import React from 'react';
import { post } from 'axios';

export default class CustomerAdd extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file: null,
            fileName: "",
            name: "",
            ssn: "",
            yymmdd: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            isActivated: 0
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()    
            .then((response) => {
            console.log(response.data); 
        })
    }
        
    handleFileChange(e) {    
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }
        
    handleValueChange(e) {    
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
        
    addCustomer(){   
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.name)
        formData.append('ssn', this.state.ssn)
        formData.append('yymmdd', this.state.yymmdd)
        formData.append('address1', this.state.address1)
        formData.append('address2', this.state.address2)
        formData.append('city', this.state.city)
        formData.append('zipcode', this.state.zipCode)
        formData.append('isactivated', this.state.isActivated)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)    
    }
        
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>Adding a Customer</h1>
                Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
                Name: <input type="text" name="userName" value={this.state.name} onChange={this.handleValueChange} /><br/>
                SSN: <input type="text" name="birthday" value={this.state.ssn} onChange={this.handleValueChange} /><br/>
                YYMMDD: <input type="text" name="gender" value={this.state.yymmdd} onChange={this.handleValueChange} /><br/>
                ADDRESS1: <input type="text" name="job" value={this.state.address1} onChange={this.handleValueChange} /><br/>
                ADDRESS2: <input type="text" name="job" value={this.state.address2} onChange={this.handleValueChange} /><br/>
                CITY: <input type="text" name="job" value={this.state.city} onChange={this.handleValueChange} /><br/>
                ZIPCODE: <input type="text" name="job" value={this.state.zipCode} onChange={this.handleValueChange} /><br/>
                ISACTIVATED: <input type="text" name="job" value={this.state.isActivated} onChange={this.handleValueChange} /><br/>
                <button type="submit">Submit</button>
            </form>

        )
    }
}