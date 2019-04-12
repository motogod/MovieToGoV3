import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const VersionButton = ({ onPress, children }) => {
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
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 0
  },
  buttonStyle: {
    backgroundColor: '#F5FCFF',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#DAA520'
  }
});
// candy sugar with key-value
export { VersionButton };
