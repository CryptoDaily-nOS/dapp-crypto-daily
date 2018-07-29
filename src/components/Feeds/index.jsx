import React, { Component, Fragment } from "react";
import request from "request";
import { Spin, Icon } from "antd";
import Single from "./Single";

const antIcon = <Icon type="loading" style={{ fontSize: 32 }} spin />;

export default class Feeds extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			// info: {},
			loading: true
		};
	}
	componentWillMount() {
		this.request("https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/feed");
		this.request("https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/feed/");
	}

	request(url) {
		request(url, (error, response, body) => {
			const id = JSON.parse(body)
				.feed.title.toLowerCase()
				.replace(" ", "-")
				.replace(".", "-");

			const feed = {
				data: JSON.parse(body).items,
				info: JSON.parse(body).feed
			};

			this.setState({
				data: [...this.state.data, feed],
				loading: false
			});
		});
	}
	render() {
		return (
			<Fragment>
				<h2>NEWS</h2>
				{this.state.loading && <Spin indicator={antIcon} />}
				{this.state.data.map((item, i) => (
					<div key={i}>
						{item.data.map((news, index) => (
							<Single
								key={index}
								title={news.title}
								copyright={item.info}
								description={news.description}
								link={news.link}
							/>
						))}
					</div>
				))}
			</Fragment>
		);
	}
}
