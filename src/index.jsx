import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import configureStore from './store/configureStore';

import Root from './containers/Root';

const store = configureStore();
import {LocaleProvider} from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

//const { LocaleProvider, locales } = window.antd;

render(
    <LocaleProvider locale={ruRU}>
    <AppContainer>
        <Root
            store={ store }
        />
    </AppContainer>
    </LocaleProvider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const RootContainer = require('./containers/Root');
        render(
            <LocaleProvider locale={ruRU}>
            <AppContainer>
                <RootContainer
                    store={ store }
                />
            </AppContainer>
            </LocaleProvider>,
            document.getElementById('root')
        );
    });
}
