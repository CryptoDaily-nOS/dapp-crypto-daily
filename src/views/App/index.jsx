import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Header from "./../../components/Header";
import NOSActions from "./../../components/NOSActions";
import Feeds from "./../../components/Feeds";
import Prices from "./../../components/Price/Prices";

const styles = {
	"@import": "https://fonts.googleapis.com/css?family=IBM+Plex+Mono",
	"@global html, body": {
		// fontFamily: "Source Sans Pro",
		margin: 0,
		padding: 0,
		backgroundColor: "#F2F4F7"
	},
	App: {
		// textAlign: "center"
	},
	Container: {
		width: "64rem",
		maxWidth: "100%",
		padding: "0 1rem",
		margin: "0 auto"
	},
	CardPrice: {
		padding: "1rem",
		"background-image": "linear-gradient(-180deg, #FFFFFF 50%, #FAFBFC 100%)",
		"box-shadow": "0 3px 9px 0 rgba(0,0,0,0.05), 0 5px 8px 0 rgba(0,0,0,0.05)",
		"border-radius": "2px"
	},
	CardPriceTitle: {
		color: "#333"
	},
	CardPriceUSD: {
		fontSize: "1rem",
		textAlign: "right",
		margin: "0"
	},
	CardPricePercent: {
		fontSize: "1rem",
		textAlign: "right",
		margin: "0"
	},
	CardPricePercentPos: {
		color: "#75FFC0"
	},
	CardPricePercentNeg: {
		color: "#FF3232"
	}
};

const App = ({ classes }) => (
	<div className={classes.App}>
		<Header title="Today" />

		<div className={classes.Container}>
			{/* <Row gutter={24}>
				<NOSActions />
			</Row> */}
			<Row gutter={24}>
				<Col span={16}>
					<Prices />
				</Col>
				<Col span={8}>
					<Feeds />
				</Col>
			</Row>
		</div>
	</div>
);

App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
