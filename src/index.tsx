import React from 'react';
import { render } from 'react-dom';
import App from '@/App';
import { v4 as uuidv4 } from 'uuid';
import 'emoji-mart/css/emoji-mart.css';

const root = document.getElementById('root');
render([<App key={uuidv4()} />], root);
