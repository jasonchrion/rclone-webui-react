import React from 'react';
import {connect} from "react-redux";
import {Button, Col, Row, Table} from "reactstrap";
import * as PropTypes from "prop-types";
import {addMount, getMountList, unmount, unmountAll} from "../../actions/mountActions";
import NewMountModal from "./NewMountModal";
import intl from 'react-intl-universal';

/**
 * MountDashboard is the main page for mounting and unmounting drives.
 */
class MountDashboard extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			showNewMountCard: false,
		}
	}

	componentDidMount() {
		const {getMountList} = this.props;
		getMountList();
	}


	handleRemoveMount = (item) => {
		const {unmount} = this.props;
		unmount(item.MountPoint);
	}

	handleCreateNewMount = (mountFs, mountPoint, vfsOptions, mountOptions) => {
		const {addMount} = this.props;
		addMount(mountFs, mountPoint, "", vfsOptions, mountOptions);
	}

	handleUnmountAll = () => {
		const {unmountAll} = this.props;
		unmountAll();
	}


	render() {
		const {currentMounts} = this.props;
		return (
			<div data-test="mountDashboardComponent">
				<Row>
					<Col lg={12} className="mb-4 d-flex justify-content-between">
						<NewMountModal buttonLabel={intl.get("MOUNT.CREATE_NEW_MOUNT")} okHandle={this.handleCreateNewMount}/>
						<Button className={"float-right"} color="danger" onClick={this.handleUnmountAll}>{intl.get("MOUNT.UNMOUNT_ALL")}</Button>
					</Col>
				</Row>
				<Table responsive className="table-striped">
					<thead>
					<tr>
						<th>{intl.get("MOUNT.NUM")}</th>
						<th>{intl.get("MOUNT.MOUNT_POINT")}</th>
						<th>{intl.get("MOUNT.MOUNTED_SINCE")}</th>
						<th>{intl.get("MOUNT.FS")}</th>
						<th>{intl.get("MOUNT.ACTIONS")}</th>
					</tr>
					</thead>
					<tbody>
					{
						currentMounts && currentMounts.map((item, index) => {
								return (<tr key={item.MountPoint}>
									<td>{index}</td>
									<td>{item.MountPoint}</td>
									<td>{new Date(item.MountedOn).toLocaleTimeString()}</td>
									<td>{item.Fs}</td>
									<td><Button color="danger" onClick={() => this.handleRemoveMount(item)}>{intl.get("MOUNT.UNMOUNT")}</Button>
									</td>
								</tr>);
							}
						)

					}
					</tbody>
				</Table>

			</div>);
	}
}

const mapStateToProps = state => ({
	currentMounts: state.mount.currentMounts,
});

MountDashboard.propTypes = {
	// currentMounts: PropTypes.object.isRequired,
	currentMounts: PropTypes.arrayOf(PropTypes.object).isRequired,
	getMountList: PropTypes.func.isRequired,
	addMount: PropTypes.func.isRequired,
	unmount: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getMountList, addMount, unmount, unmountAll})(MountDashboard);
