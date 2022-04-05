import ReactDOMClient from 'react-dom/client';
import App from './App';

const appContainer = document.getElementById('root');
const root = ReactDOMClient.createRoot(appContainer);

root.render(<App/>);