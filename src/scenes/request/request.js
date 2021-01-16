import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay'

export default class Request extends React.Component {

  constructor(props) {
		super(props);
		this.state = { 
			spinner: true,
		};
  }
  
  hideSpinner() {
    this.setState({ spinner: false });
  }

	render() {
		return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
					<Spinner
          	visible={this.state.spinner}
          	textContent="読込中..."
            textStyle={{ color: "#fff" }}
            overlayColor="rgba(0,0,0,0.5)"
        	/>
          <WebView
            onLoad={() => this.hideSpinner()}
            source={{uri: "https://kenmo-reader.ml/request/"}} 
          />
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});