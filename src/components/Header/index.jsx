import React, { Component } from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { Row, Col, Button, Icon, Modal, Input, Alert } from "antd";
import { injectNOS, nosProps } from "@nosplatform/api-functions/lib/react";

const styles = {
	fixed: {
		position: "relative",
		height: "50px",
		marginBottom: "24px",
		zIndex: 9
	},
	header: {
		position: "fixed",
		backgroundColor: "#FFF",
		right: "0",
		left: "0",
		top: "0",
		color: "#333333",
		padding: "12px 0",
		boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)"
	},
	Container: {
		width: "64rem",
		maxWidth: "100%",
		padding: "0 1rem",
		margin: "0 auto"
	},
	logo: {
		display: "block",
		margin: "0 auto"
	}
};

function isNumber(num) {
	if (typeof num === "number") {
		return num - num === 0;
	}
	if (typeof num === "string" && num.trim() !== "") {
		return Number.isFinite ? Number.isFinite(+num) : false;
	}
	return false;
}

function isPromise(object) {
	if (Promise && Promise.resolve) {
		return Promise.resolve(object) == object;
	} else {
		throw "Promise not supported in your environment";
	}
}

const NEO = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
const GAS = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
const receiver = "AM62WrLMzZXFkmGnESNt8baGx16u15Cd8a";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// ModalText: "Content of the modal",
			visible: false,
			showAlert: false,
			amount: "",
			error: false,
			balance: {
				NEO: "∞",
				GAS: "∞"
			},
			confirmLoading: false
		};
	}

	componentWillMount() {
		const { nos } = this.props;

		if (isPromise(nos.getBalance())) {
			nos
				.getBalance({ asset: NEO })
				.then(balance =>
					this.setState({
						balance: {
							NEO: balance
						}
					})
				)
				.catch(err => alert(`Error: ${err.message}`));

			nos
				.getBalance({ asset: GAS })
				.then(balance =>
					this.setState({
						balance: {
							GAS: balance
						}
					})
				)
				.catch(err => alert(`Error: ${err.message}`));
		}
	}

	onChangeAmount = e => {
		this.setState({ amount: e.target.value });
	};

	handleOk = () => {
		const { amount } = this.state;
		const { nos } = this.props;

		this.setState({
			error: false
		});

		// Check empty
		if (!amount) {
			this.setState({
				error: "Required"
			});
			return;
		}

		// Check isNumber
		if (!isNumber(amount)) {
			console.log(amount);
			this.setState({
				error: "Just 0123456789"
			});
			return;
		}

		this.setState({
			confirmLoading: true
		});

		nos
			.send({ asset: GAS, amount, receiver })
			.then(txid => {
				this.setState({
					visible: false,
					confirmLoading: false,
					showAlert: {
						message: `${amount} GAS sent in transaction ${txid}.`,
						type: "success"
					}
				});
			})
			.catch(err => {
				this.setState({
					visible: false,
					confirmLoading: false,
					showAlert: {
						message: `Error: ${err.message}`,
						type: "error"
					}
				});
			});
	};

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	handleClose = () => {
		this.setState({ showAlert: false });
	};

	render() {
		const { classes } = this.props;
		const { visible, confirmLoading, balance } = this.state;
		return (
			<div>
				<div className={classes.fixed}>
					<header className={classes.header}>
						<div className={classes.Container}>
							<Row type="flex" justify="space-between">
								<Col span={4}>
									GAS: {balance.GAS} — NEO: {balance.NEO}
								</Col>
								<Col span={6}>
									<svg
										width="206px"
										height="32px"
										viewBox="0 0 150 23"
										className={classes.logo}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8.776 19.48a9.278 9.278 0 0 1-2.856-.432 8.426 8.426 0 0 1-2.424-1.224 8.535 8.535 0 0 1-1.872-1.884 8.336 8.336 0 0 1-1.212-2.448 9.723 9.723 0 0 1-.42-2.892c0-1.024.144-1.996.432-2.916.288-.92.696-1.76 1.224-2.52a8.519 8.519 0 0 1 4.332-3.24A8.86 8.86 0 0 1 8.8 1.48c.96 0 1.868.136 2.724.408.856.272 1.628.66 2.316 1.164a7.393 7.393 0 0 1 2.808 4.164L11.92 8.2c-.304-.736-.736-1.304-1.296-1.704-.56-.4-1.2-.6-1.92-.6a3.26 3.26 0 0 0-1.5.348 3.637 3.637 0 0 0-1.188.972 4.579 4.579 0 0 0-.78 1.464 5.893 5.893 0 0 0-.276 1.848c0 .88.16 1.664.48 2.352.32.688.768 1.224 1.344 1.608.576.384 1.232.576 1.968.576 1.536 0 2.648-.768 3.336-2.304l4.728.984a7.285 7.285 0 0 1-1.068 2.376 7.397 7.397 0 0 1-1.788 1.812 8.02 8.02 0 0 1-2.364 1.152 9.688 9.688 0 0 1-2.82.396zm8.9-.48V6.088h4.152l.144 2.088c.32-.736.744-1.296 1.272-1.68.528-.384 1.144-.576 1.848-.576.416 0 .784.072 1.104.216l-.432 4.488a3.473 3.473 0 0 0-1.104-.168c-1.664 0-2.496.872-2.496 2.616V19h-4.488zm12.668 4.728c-1.04 0-1.936-.208-2.688-.624l.72-3.312c.192.08.428.152.708.216.28.064.524.096.732.096.4 0 .744-.096 1.032-.288.288-.192.536-.512.744-.96L26.456 6.088h4.848l2.376 8.4 2.04-8.4h4.68l-4.968 13.536c-.528 1.424-1.204 2.464-2.028 3.12-.824.656-1.844.984-3.06.984zm10.556-.24v-17.4h4.152l.12 1.824a4.562 4.562 0 0 1 1.668-1.596 4.59 4.59 0 0 1 2.292-.588c.8 0 1.544.172 2.232.516.688.344 1.292.82 1.812 1.428s.924 1.32 1.212 2.136c.288.816.432 1.696.432 2.64 0 .976-.152 1.884-.456 2.724a6.852 6.852 0 0 1-1.272 2.196 5.943 5.943 0 0 1-1.908 1.464 5.359 5.359 0 0 1-2.364.528c-.72 0-1.372-.136-1.956-.408a3.983 3.983 0 0 1-1.476-1.176v5.712H40.9zm6.888-8.16c.48 0 .904-.12 1.272-.36s.66-.568.876-.984c.216-.416.324-.888.324-1.416 0-.528-.108-1-.324-1.416a2.552 2.552 0 0 0-.876-.984 2.276 2.276 0 0 0-1.272-.36c-.464 0-.88.12-1.248.36s-.656.568-.864.984a3.123 3.123 0 0 0-.312 1.416c0 .528.104 1 .312 1.416.208.416.496.744.864.984s.784.36 1.248.36zm13.796 4.032c-1.52 0-2.68-.412-3.48-1.236-.8-.824-1.2-2.012-1.2-3.564V9.52H54.84V6.088h2.064v-4.44h4.488v4.44h3.12V9.52h-3.12v4.608c0 1.04.448 1.56 1.344 1.56.256 0 .524-.032.804-.096s.548-.152.804-.264l.6 3.192c-.928.56-2.048.84-3.36.84zm10.58 0a7.273 7.273 0 0 1-2.76-.516 6.68 6.68 0 0 1-2.208-1.44 6.703 6.703 0 0 1-1.464-2.16 6.74 6.74 0 0 1-.528-2.676c0-.976.176-1.88.528-2.712a6.491 6.491 0 0 1 1.488-2.172 6.921 6.921 0 0 1 2.244-1.44c.856-.344 1.788-.516 2.796-.516.992 0 1.912.172 2.76.516a6.68 6.68 0 0 1 2.208 1.44 6.703 6.703 0 0 1 1.464 2.16 6.74 6.74 0 0 1 .528 2.676c0 .976-.176 1.88-.528 2.712a6.491 6.491 0 0 1-1.488 2.172 6.921 6.921 0 0 1-2.244 1.44c-.856.344-1.788.516-2.796.516zm.048-4.056c.464 0 .88-.12 1.248-.36s.66-.568.876-.984c.216-.416.324-.888.324-1.416 0-.528-.108-1-.324-1.416a2.552 2.552 0 0 0-.876-.984 2.234 2.234 0 0 0-1.248-.36c-.464 0-.88.12-1.248.36s-.66.568-.876.984a3.027 3.027 0 0 0-.324 1.416c0 .528.108 1 .324 1.416.216.416.508.744.876.984s.784.36 1.248.36zM88.708 19V1.96h7.368c1.328 0 2.544.208 3.648.624 1.104.416 2.06 1 2.868 1.752a7.78 7.78 0 0 1 1.872 2.676c.44 1.032.66 2.172.66 3.42 0 1.248-.224 2.396-.672 3.444a8.034 8.034 0 0 1-1.896 2.724 8.524 8.524 0 0 1-2.892 1.776c-1.112.416-2.332.624-3.66.624h-7.296zm4.8-4.224h2.256c.912 0 1.696-.176 2.352-.528a3.663 3.663 0 0 0 1.512-1.488c.352-.64.528-1.4.528-2.28 0-.88-.176-1.64-.528-2.28a3.663 3.663 0 0 0-1.512-1.488c-.656-.352-1.44-.528-2.352-.528h-2.256v8.592zm16.652 4.584c-.624 0-1.204-.1-1.74-.3a4.346 4.346 0 0 1-1.404-.84c-.4-.36-.712-.78-.936-1.26-.224-.48-.336-1-.336-1.56 0-.832.224-1.56.672-2.184.448-.624 1.076-1.112 1.884-1.464.808-.352 1.748-.528 2.82-.528.464 0 .88.032 1.248.096s.76.176 1.176.336v-.624c0-.544-.156-.988-.468-1.332-.312-.344-.716-.516-1.212-.516-.384 0-.72.1-1.008.3-.288.2-.488.46-.6.78L106.2 9.64a4.187 4.187 0 0 1 .72-1.584c.352-.48.784-.892 1.296-1.236a6.382 6.382 0 0 1 1.716-.804 6.942 6.942 0 0 1 2.028-.288c.88 0 1.684.136 2.412.408a5.657 5.657 0 0 1 1.884 1.14 5.022 5.022 0 0 1 1.224 1.752c.288.68.432 1.428.432 2.244V19h-4.032l-.12-1.512a3.308 3.308 0 0 1-1.428 1.38c-.632.328-1.356.492-2.172.492zm-.024-4.272c0 .32.132.588.396.804.264.216.596.324.996.324.368 0 .708-.084 1.02-.252.312-.168.556-.392.732-.672.176-.28.264-.604.264-.972v-.144a4.511 4.511 0 0 0-.744-.24 3.453 3.453 0 0 0-.792-.096c-.576 0-1.032.112-1.368.336-.336.224-.504.528-.504.912zm13.868-12.336c0 .432-.104.824-.312 1.176a2.207 2.207 0 0 1-.864.828c-.368.2-.776.3-1.224.3-.448 0-.852-.1-1.212-.3a2.23 2.23 0 0 1-.852-.828 2.268 2.268 0 0 1-.312-1.176c0-.432.104-.824.312-1.176a2.23 2.23 0 0 1 .852-.828c.36-.2.764-.3 1.212-.3.448 0 .856.1 1.224.3.368.2.656.476.864.828.208.352.312.744.312 1.176zM119.372 19V6.088h4.488V19h-4.488zm5.948 0V1h4.488v18h-4.488zm8.876 4.728c-1.04 0-1.936-.208-2.688-.624l.72-3.312c.192.08.428.152.708.216.28.064.524.096.732.096.4 0 .744-.096 1.032-.288.288-.192.536-.512.744-.96l-5.136-12.768h4.848l2.376 8.4 2.04-8.4h4.68l-4.968 13.536c-.528 1.424-1.204 2.464-2.028 3.12-.824.656-1.844.984-3.06.984zm13.052-4.608c-.496 0-.944-.12-1.344-.36a2.63 2.63 0 0 1-1.296-2.304 2.63 2.63 0 0 1 1.296-2.304c.4-.24.848-.36 1.344-.36.496 0 .944.12 1.344.36a2.63 2.63 0 0 1 1.296 2.304 2.63 2.63 0 0 1-1.296 2.304c-.4.24-.848.36-1.344.36z"
											fill="#FAB005"
										/>
									</svg>
								</Col>
								<Col>
									<Button onClick={this.showModal}>
										<Icon type="heart" /> Donate
									</Button>
								</Col>
							</Row>
						</div>
					</header>
				</div>

				<Modal
					title="Donate"
					wrapClassName="vertical-center-modal"
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					footer={[
						<Button key="back" onClick={this.handleCancel}>
							Close
						</Button>,
						<Button
							key="submit"
							type="primary"
							loading={confirmLoading}
							onClick={this.handleOk}
						>
							Send
						</Button>
					]}
				>
					<Input
						placeholder="Amount of GAS..."
						prefix={<Icon type="wallet" style={{ color: "rgba(0,0,0,.4)" }} />}
						onChange={this.onChangeAmount}
						// ref={node => (this.amountInput = node)}
					/>
					{this.state.error && (
						<span className="ant-form-explain" style={{ color: "#f5222d" }}>
							{this.state.error}
						</span>
					)}
				</Modal>

				{this.state.showAlert ? (
					<div className={classes.Container}>
						<Alert
							message={this.state.showAlert.message}
							type={this.state.showAlert.type}
							closable
							afterClose={this.handleClose}
						/>
					</div>
				) : null}
			</div>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(Header));
