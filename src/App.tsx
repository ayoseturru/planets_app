import React from 'react';
import {ThemeProvider} from "./providers/ThemeProvider";
import {TranslationsProvider} from "./providers/TranslationProvider";
import Main from "./pages/Main";
import {Provider} from "react-redux";
import store from "./state/store/store";
import {PlanetsService} from "./services/PlanetsService";
import PlanetsServiceFactory from "./services/PlanetsServiceFactory";
import RestPlanetsService from "./services/RestPlanetsService";

interface AppProps {
    planetsService?: PlanetsService
}

const App = ({planetsService}: AppProps) => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <TranslationsProvider>
                    <ThemeProvider>
                        <Main planetsService={planetsService || PlanetsServiceFactory.getService(typeof RestPlanetsService, "https://swapi.dev/api/planets/")}/>
                    </ThemeProvider>
                </TranslationsProvider>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
