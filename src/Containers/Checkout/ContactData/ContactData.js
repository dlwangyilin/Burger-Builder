import React, {Component} from "react";
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();  // 防止reload
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Xizi',
                address: {
                    street: 'Parkview Lane',
                    zipcode: 96212,
                    country: 'US'
                },
                email: 'dummy@du.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {
        let form = (<form action="">
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4> Enter your Contact Data</h4>
                {form}
            </div>
        );

    }

}

export default ContactData;