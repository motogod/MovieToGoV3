import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} disabled={true} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 13,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 5
  },
    buttonStyle: {
    width: '17%',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8
  }
});
// candy sugar with key-value
export { TimeButton };
