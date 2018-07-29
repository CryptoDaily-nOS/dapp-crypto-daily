import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { Sparklines, SparklinesCurve, SparklinesSpots } from "react-sparklines";
import { Row, Col } from "antd";
import cx from "classnames";

const styles = {
	CardPrice: {
		padding: "1rem",
		marginBottom: "16px",
		"background-image": "linear-gradient(-180deg, #FFFFFF 50%, #FAFBFC 100%)",
		"box-shadow": "0 2px 9px 0 rgba(0,0,0,0.05), 0 2px 12px 0 rgba(0,0,0,0.05)",
		"border-radius": "2px"
	},
	CardPriceTitle: {
		color: "#333"
	},
	CardPriceUSD: {
		fontSize: "1rem",
		textAlign: "right",
		fontFamily: "IBM Plex Mono, monospace",
		margin: "0"
	},
	CardPricePercent: {
		fontSize: "1rem",
		textAlign: "right",
		fontFamily: "IBM Plex Mono, monospace",
		margin: "0"
	},
	CardPricePercentPos: {
		color: "#0EB35F"
	},
	CardPricePercentNeg: {
		color: "#FF3232"
	}
};

const Price = ({ classes, name, symbol, USD }) => (
	<div className={classes.CardPrice}>
		<Row type="flex" justify="space-between">
			<Col>
				<h3 className={classes.CardPriceTitle}>
					{name} <code>{symbol}</code>
				</h3>
			</Col>
			<Col>
				<p className={classes.CardPriceUSD}>{USD.price}$</p>
				<p
					className={cx(
						classes.CardPricePercent,
						{ [classes.CardPricePercentPos]: USD.percent_change_1h > 0 },
						{ [classes.CardPricePercentNeg]: USD.percent_change_1h < 0 }
					)}
				>
					{USD.percent_change_1h > 0 ? "+" : ""}
					{USD.percent_change_1h}%
				</p>
			</Col>
		</Row>

		<Sparklines data={[USD.percent_change_7d, USD.percent_change_24h, USD.percent_change_1h]}>
			<SparklinesCurve style={{ strokeWidth: 2, stroke: "#DEE2E6", fill: "none" }} />
			<SparklinesSpots
				size={2}
				style={{ stroke: "#FAB005", strokeWidth: 2, fill: "white" }}
			/>
		</Sparklines>
	</div>
);

Price.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	symbol: PropTypes.string.isRequired,
	USD: PropTypes.object.isRequired
};
export default injectSheet(styles)(Price);
