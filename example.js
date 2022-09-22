import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import solanaProgramDataExtractor from ".";

async function main() {
  const connection = new Connection(process.env.RPC_URL);

  const resp = await connection.getParsedTransaction(
    `3TvRQsxxiywMJLY1oCYe5HakvuXyz1kKfpnbuxYXFQg5z9vtzGfnjnkZ1xZCUDinefGADzFU3jrSzbGjqzPT5UP2`,
    "confirmed"
  );

  const instruction = resp.transaction.message.instructions.find(
    (e) =>
      e.programId.toString() === "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk"
  );

  const decoded = await solanaProgramDataExtractor({
    programId: instruction.programId.toString(),
    connection,
    encodedData: instruction.data,
  });

  console.log(decoded);

  // console.log(resp);
}

main();
