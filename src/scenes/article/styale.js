import { Dimensions, StyleSheet } from 'react-native';

export const classesStyles = {
	'twitter-tweet': {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightblue",
    overflow: "hidden"
  },
  'liquid-speech-balloon-text': {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightblue",
    overflow: "hidden",
    margin: 5,
  },
  'size-full': {
    alignSelf: "flex-start",
  }
};

const margin = 5
const padding = 5

export const middleTagsStyles = {
	h1: {
    fontSize: 20,
    margin: margin,
    padding : padding
	},
	h2: {
    fontSize: 17,
    margin: margin,
    padding : padding
  },
  h3: {
    fontSize: 16,
    margin: margin,
    padding : padding
	},
	p: {
    fontSize: 14,
    margin: margin,
    padding : padding
  },
  a: {
    fontSize: 14
  },
};

export const largeTagsStyles = {
	h1: {
    fontSize: 35,
    margin: margin,
    padding : padding
	},
	h2: {
    fontSize: 30,
    margin: margin,
    padding : padding
  },
  h3: {
    fontSize: 25,
    margin: margin,
    padding : padding
	},
	p: {
    fontSize: 20,
    margin: margin,
    padding : padding
  },
  a: {
    fontSize: 20
  }
};