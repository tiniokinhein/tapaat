import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    cursor: 'pointer',
    border: 0,
    background: 'none',
    padding: 0,
  },
  dot: {
    backgroundColor: '#802bb1',
    height: 3,
    width: 8,
    borderRadius: 3,
    margin: '0 3px'
  },
  active: {
    width: 30,
    backgroundColor: ' #d1d7e0',
  },
};

class PaginationDot extends React.Component {
  handleClick = event => {
    this.props.onClick(event, this.props.index);
  };

  render() {
    const { active } = this.props;

    let styleDot;

    if (active) {
      styleDot = Object.assign({}, styles.dot, styles.active);
    } else {
      styleDot = styles.dot;
    }

    return (
      <button type="button" style={styles.root} onClick={this.handleClick} className="shadow-none btn">
        <div style={styleDot} />
      </button>
    );
  }
}

PaginationDot.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PaginationDot