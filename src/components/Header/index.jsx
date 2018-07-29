import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

// import SpinningLogo from "./../SpinningLogo";

const styles = {
	header: {
		backgroundColor: "#FFF",
		color: "#333333",
		padding: "12px 0",
		marginBottom: "32px",
		boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)"
	},
	title: {
		fontSize: "1.5em",
		color: "#FF6859",
		marginBottom: 0
	},
	logo: {
		display: "block",
		margin: "0 auto"
	}
};

const Header = ({ classes }) => (
	<header className={classes.header}>
		<h1 className={classes.title}>
			<svg
				className={classes.logo}
				width="107"
				height="26"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1.672 8.219H.938C1 7.625 1.03 6.734 1.03 5.78 1.031 4.72.97 2.516.813.344c2.89.094 7.03.094 9.89.094 2.86 0 6.969 0 9.86-.094a77.806 77.806 0 0 0-.235 5.437c0 .953.031 1.844.094 2.438h-.735c-1.078-5.39-2.765-7.14-5.75-7.14h-.703v18.265c0 2.61.579 2.984 3.422 3.015V23c-1.36-.047-3.734-.094-6.093-.094-2.36 0-4.579.047-5.844.094v-.64c2.843-.032 3.422-.407 3.422-3.016V1.078h-.704c-3.015 0-4.671 1.734-5.765 7.14zm29.594-5.125c6.453 0 10.78 3.625 10.78 9.984 0 6.203-4.483 10.375-10.812 10.375-6.468 0-10.797-3.625-10.797-9.984 0-6.219 4.485-10.375 10.829-10.375zm-.141.578c-3.39 0-5.563 4-5.563 9.672 0 5.844 2.594 9.531 5.797 9.531 3.391 0 5.563-4 5.563-9.672 0-5.844-2.578-9.531-5.797-9.531zm11.078.515v-.64c.797.047 2.11.11 3.406.11.297 0 .594-.016.875-.016 1.657-.032 4.032-.094 5.422-.094 7.516 0 11.157 3.328 11.157 9.469C63.063 19.03 58.89 23 51.608 23c-1.078 0-3.5-.094-5.047-.094-1.671 0-3.39.032-4.359.094v-.64c2.047-.094 2.406-.422 2.406-2.75V6.937c0-2.375-.39-2.657-2.406-2.75zM49.5 6.876v12.797c0 2.234.344 2.75 2.016 2.75 5.03 0 6.437-3.266 6.437-9.281 0-6.047-1.64-9.016-6.469-9.016-1.64 0-1.984.531-1.984 2.75zm22.266-3.39l7.609 16.828c.703 1.515 1.39 2.015 2.016 2.046V23c-1-.063-2.672-.094-4.204-.094-2.046 0-3.968.032-5.046.094v-.64c1.343-.063 2.078-.36 2.078-1.22 0-.374-.14-.859-.422-1.468l-1.594-3.64h-6.719l-.375.859c-.625 1.422-.906 2.5-.906 3.297 0 1.562 1.063 2.078 2.781 2.171V23a68.45 68.45 0 0 0-3.671-.094c-.797 0-2 .032-2.594.094v-.64c1.078-.22 1.86-1.266 2.812-3.438l6.766-15.438c.25.016.484.032.734.032s.5-.016.735-.032zm.156 11.906l-3.063-7.016-3.093 7.016h6.156zM90.266 4.203v-.656a58.11 58.11 0 0 0 3.609.11c.797 0 1.875-.032 2.453-.11v.656c-.89.36-1.687 1.328-2.844 3.422l-3.671 6.75v5.047c0 2.484.5 2.844 2.984 2.937V23c-1.11-.063-3.828-.094-5.516-.094-1.812 0-4.36.032-5.344.094v-.64c2.485-.094 2.985-.454 2.985-2.938v-3.453l-5.734-9.953c-.766-1.313-1.235-1.688-1.86-1.797v-.672c1.203.094 2.313.156 3.781.156 1.75 0 3.782-.062 5.625-.156v.672c-1.015 0-2.015.093-2.015.875 0 .25.11.578.344.984l4.312 7.563 2.063-3.735c.859-1.61 1.25-2.812 1.25-3.687 0-1.375-.938-1.953-2.422-2.016zM103.39 18.5c1.671 0 2.734.938 2.734 2.484 0 1.532-1.063 2.47-2.734 2.47-1.672 0-2.72-.938-2.72-2.47 0-1.547 1.048-2.484 2.72-2.484z"
					fill="#2C3979"
				/>
			</svg>
		</h1>
	</header>
);

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Header);
