import React, { Component, Fragment } from "react";
import { Row, Col, Spin, Icon } from "antd";
import request from "request";
import Price from "./Price";

const antIcon = <Icon type="loading" style={{ fontSize: 32 }} spin />;
export default class Prices extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			loading: true
		};
	}
	componentWillMount() {
		request("https://api.coinmarketcap.com/v2/ticker/?limit=51", (error, response, body) => {
			this.setState({
				data: JSON.parse(body).data,
				loading: false
			});
		});
	}

	render() {
		return (
			<Fragment>
				<h2>PRICES</h2>
				{this.state.loading && <Spin indicator={antIcon} />}
				<Row gutter={16}>
					{this.state.data &&
						Object.keys(this.state.data).map(key => {
							const item = this.state.data[key];
							return (
								<Col key={item.id} span={12}>
									<Price
										name={item.name}
										symbol={item.symbol}
										USD={item.quotes.USD}
									/>
								</Col>
							);
						})}
				</Row>
			</Fragment>
		);
	}
}
