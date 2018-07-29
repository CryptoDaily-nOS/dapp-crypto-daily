import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import striptags from "striptags";
import Truncate from "react-truncate";

const styles = {
	NewsCard: {
		display: "block",
		padding: "1.25rem",
		marginBottom: "16px",
		"background-color": "#353e48",
		"box-shadow": "0 2px 9px 0 rgba(0,0,0,0.05), 0 2px 12px 0 rgba(0,0,0,0.05)",
		"border-radius": "2px",
		textDecoration: "none"
	},
	NewsCardCopyright: {
		marginTop: "12px",
		paddingTop: "8px",
		borderTop: "1px solid #2d333a",
		fontFamily: "IBM Plex Mono, monospace"
	},
	NewsCardCopyrightLink: {
		color: "rgba(181, 202, 224, 0.85)"
	},
	NewsCardCopyrightFavIcon: {
		display: "inline-block",
		width: "16px",
		height: "16px",
		verticalAlign: "sub",
		boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.12)",
		marginRight: "8px",
		borderRadius: "100%"
	},
	NewsCardTitle: {
		"font-size": "16px",
		// "text-overflow": "ellipsis",
		// overflow: "hidden",
		// "white-space": "nowrap",
		color: "rgb(255, 255, 255)",
		"font-weight": "500",
		"margin-bottom": "8px"
	},
	NewsCardDescription: {
		color: "rgba(255, 255, 255, 0.45)",
		marginBottom: 0
	}
};

const Single = ({ classes, title, description, link, copyright }) => (
	<div className={classes.NewsCard}>
		<h3 className={classes.NewsCardTitle}>
			<Truncate lines={2}>{title}</Truncate>
		</h3>
		<p className={classes.NewsCardDescription}>
			<Truncate
				lines={3}
				ellipsis={
					<span>
						... <a href={link}>Read more</a>
					</span>
				}
			>
				{striptags(description)}
			</Truncate>
		</p>
		<div className={classes.NewsCardCopyright}>
			<a className={classes.NewsCardCopyrightLink} href={copyright.link}>
				<img
					className={classes.NewsCardCopyrightFavIcon}
					src={copyright.image}
					alt={copyright.title}
				/>
				{copyright.title.toUpperCase()}
			</a>
		</div>
	</div>
);

Single.propTypes = {
	classes: PropTypes.object.isRequired,
	copyright: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
};
export default injectSheet(styles)(Single);
