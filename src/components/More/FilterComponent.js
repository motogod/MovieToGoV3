import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';

class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked: false,
    };
  }

  render() {
    const { name } = this.props.item;
    return (
      <CheckBox
        title={name}
        checked={this.state.checked}
        onPress={() => {
          this.setState({ checked: !this.state.checked });
          if (!this.state.checked) {
            this.props.getIds(name);
          } else {
            this.props.removeIds(name);
          }
        }}
      />
    );
  }
}

export default FilterComponent;
