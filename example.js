import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import solanaProgramDataExtractor from ".";

async function main() {
  const connection = new Connection(process.env.RPC_URL);

  const resp = await connection.getParsedTransaction(
    `4NRG7HjdweknnWpGL89sSXHX6ph7DrmuHvWB6KBtC8dAzhHsSR2mA6hEhsumBwVvfb7biYBVDJhb4yvcWuEBfdpd`,
    "confirmed"
  );
  
  console.log(JSON.stringify({resp}));
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
