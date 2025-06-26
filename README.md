# LineShare Expo

Benvenuto nel progetto **LineShare Expo**, una base per applicazioni mobile realizzate con [Expo](https://expo.dev). Questo repository contiene un piccolo esempio di app in React Native con routing automatico, gestione del tema chiaro/scuro e alcuni componenti personalizzati.

## Funzionalità principali

- **Navigazione tramite file-based routing**: le schermate sono definite nella cartella `app` e vengono collegate automaticamente.
- **Tema chiaro e scuro**: grazie al `ThemeContext` l'interfaccia si adatta alle preferenze di sistema.
- **Componenti riutilizzabili**: nella cartella `Components` trovi vari componenti (es. `BottomSheet`, `Dropdown`, `AnimatedTextInput`) pronti all'uso.
- **Esempi di pagine**: sono presenti una schermata Home con un esempio di dropdown, una pagina di Login e una sezione Test che mostra l'utilizzo di Bottom Sheet e campi di input animati.

## Installazione

1. Installa le dipendenze

   ```bash
   npm install
   ```
2. Avvia l'applicazione in modalità sviluppo

   ```bash
   npx expo start
   ```

A questo punto potrai scegliere se aprire l'app su un dispositivo fisico con Expo Go, su un simulatore iOS/Android oppure in una development build dedicata.

## Struttura del progetto

- **app/**: contiene le pagine e il routing dell'applicazione.
- **Components/**: raccolta di componenti UI riutilizzabili.
- **Context/**: provider di contesto per tema e utente.
- **Screens/**: logica e layout delle varie schermate.
- **hooks/**: custom hook (es. `useTheme`).
- **utils/**: funzioni di utilità come la gestione della validazione.

## Reset del progetto

Se vuoi ripartire da zero mantenendo questo repository come base, esegui

```bash
npm run reset-project
```

Il comando sposterà gli esempi nella cartella `app-example` creando una nuova cartella `app` vuota.

## Ulteriori risorse

- [Documentazione Expo](https://docs.expo.dev/)
- [Tutorial ufficiale](https://docs.expo.dev/tutorial/introduction/)

Buon divertimento con LineShare Expo!
