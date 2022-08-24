import React from 'react';
import ReactDOM from 'react-dom';
import {SpeechProvider} from '@speechly/react-client';

import {Provider} from './context/context'
import App from './App'
import './index.css'

ReactDOM.render(
    <SpeechProvider appId='06195e2a-6eeb-4a22-a14f-a8c3e35a16dc' language='en-US' >
        <Provider>
            <App/>
        </Provider>
    </SpeechProvider>,

 document.getElementById('root'));
