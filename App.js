import App from './src/index'
import { WebView } from 'react-native-webview';
export default App

if (WebView.defaultProps == null) WebView.defaultProps = {};
    WebView.defaultProps.useWebKit=true;