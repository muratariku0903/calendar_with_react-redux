import BaseBoard, { StateProps } from '../BaseBoard';
import { connect } from 'react-redux';
import { State } from '../../../../../redux/stateTypes';

const mapStateToProps = (state: State): StateProps => {
    return {
        isSideMenuOpen: state.sideMenu.isOpen,
    };
};


export default connect(mapStateToProps)(BaseBoard);
