import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../component/Header'
import Footer from '../component/Footer';

class MainScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productList: [
                {
                    productName: "sweater",
                    price: "2000",
                    quantity: "2",
                    total: '4,000'
                },
                {
                    productName: "Jacket",
                    price: "500",
                    quantity: "100",
                    total: '50000'
                },
                {
                    productName: "Jacket",
                    price: "500",
                    quantity: "100",
                    total: '50000'
                },
                {
                    productName: "Jacket",
                    price: "500",
                    quantity: "100",
                    total: '50000'
                },
                {
                    productName: "Jacket",
                    price: "500",
                    quantity: "100",
                    total: '50000'
                },
                {
                    productName: "Jacket",
                    price: "500",
                    quantity: "100",
                    total: '50000'
                },
            ],

        }

    }

    render() {
        return (
            <main>
                <Header />
                <div className="container main-container">

                    {/* secction for product list */}
                    <section className="product-list-container">
                        <table>
                            <thead>
                                <tr>
                                    <th className="tag-150">PRODUCTS</th>
                                    <th className="tag-80">PRICE</th>
                                    <th className="tag-150">QUANTITY</th>
                                    <th className="tag-80">TOTAL</th>
                                </tr>
                            </thead>

                            <tbody style={{backgroundColor:'white', borderSpacing:'0px'}}>

                                {this.state.productList && this.state.productList.length > 0 ?
                                    this.state.productList.map((item, index) => {
                                        return (
                                            <tr>
                                                <td className="tag-150">
                                                    <i class="fa fa-times" aria-hidden="true" style={{ backgroundColor: 'red' }}></i>
                                                    {item.productName}
                                                </td>
                                                <td className="tag-80">{item.price}</td>
                                                <td className="tag-150" style={{justifyContent:'space-between'}}>
                                                <i className="fa fa-plus-square" style={{margin:"0px 5px"}} ></i>
                                                    <span style={{minWidth:'10px'}}>{item.quantity}</span>
                                                    <i className="fa fa-plus-square" style={{margin:"0px 5px"}} ></i>
                                                </td>
                                                <td className="tag-80">{item.total} INR</td>
                                            </tr>
                                        )
                                    })

                                    : null}
                            </tbody>

                        </table>

                    </section>

                </div>

                <Footer />
            </main>
        )
    }
}

export default MainScreen;