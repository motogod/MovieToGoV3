import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const VersionButton = ({ onPress, children, marginLeft }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} disabled={true} style={[buttonStyle, { marginLeft }]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 0
  },
  buttonStyle: {
    width: 65,
    backgroundColor: '#AAAAAA',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#AAAAAA',
    marginTop: 10
  }
});
// candy sugar with key-value
export { VersionButton };
