import React from 'react';
import {ThemeProvider} from "./providers/ThemeProvider";
import {TranslationsProvider} from "./providers/TranslationProvider";
import Main from "./components/pages/Main";
import {Provider} from "react-redux";
import store from "./state/store/store";

const App = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <TranslationsProvider>
                    <ThemeProvider>
                        <Main/>
                    </ThemeProvider>
                </TranslationsProvider>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
