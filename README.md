# Shippy-Flight

## FUNZIONALITA'

L'applicazione si articola in due pagine:

### 1.Home
Fornisce una lista di tutti i voli con possibilità di filtraggio per
- tipologia aeroporto(partenza, arrivo)
- iata aeroporto
- prezzo (ascendente, discendente)

### 2. Ricerca Tratta
Fornisce una ricerca della migliore tratta a partire da un aeroporto di partenza e uno di arrivo mostrando gli eventuali scali.

### SCELTE TECNOLOGICHE/PRATICHE

Ho fatto uso di:
- [Create React App](https://github.com/facebook/create-react-app) per avere uno scheletro standard adatto alla natura del progetto (NO SEO).
- [SWR](https://swr.vercel.app/) per gestire la comunicazione con le api e conservazione relativo dato in modo standardizzato e condividendone lo stato con l'intera applicazione. 
- [Redux Toolkit](https://redux-toolkit.js.org/) per la gestione dello stato locale (stato filtro voli, stato ricerca tratta).
- [Custom React Hooks](https://it.reactjs.org/docs/hooks-custom.html) per l'incapsulazione di funzionalità
    - useApiResource - fetching standardizzato di una risorsa api generica con creazione di una mappa della stessa per un veloce lookup per id
    - use(ResourceName) : restituzione di una specifica risorsa per id
    - useEnhancedFlight : dati di volo arricchiti con informazioni human-readable.
    - useFilteredFlights : stato SWR + Redux per gestione filtro pagina home
    - useRouteSearch + useRouteSearchForm + useSearchFormField : stato SWR + Redux per gestione filtro pagina Ricerca Tratta
- [Composition](https://it.reactjs.org/docs/composition-vs-inheritance.html) per massimizzare il riutilizzo di parti dell'interfaccia ove necessario 


## PER UTILIZZARE IL PROGETTO

Creare un file di .env con le seguenti chiavi sostituendo i valori in modo appropriato

```
REACT_APP_AUTH_TOKEN=my-api-token
REACT_APP_API_BASE_URL=my-api-url
```

utilizzare gli scripts in package.json a necessità.
- esecuzione locale `npm start`
- build produzione `npm run build`
