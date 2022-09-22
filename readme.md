This is a minimal program where you provide a program id and encoded data and it will try to decode the data from the related ABI.

```js
import solanaProgramDataExtractor from 'solana-program-data-extractor'

await solanaProgramDataExtractor({
  programId: string, 
  encodedData: string, 
  connection: connection
})
```