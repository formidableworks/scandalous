import execa from "execa";
import express from "express";
import { createReadStream } from "fs";

const app = express();
const PORT = 3001;
app.get("/api/trigger-scan", async (req, res) => {
  const jobId = Date.now();
  console.log(jobId);
  const scanExec = await execa.command(
    `scanimage --verbose --device=airscan:w0:DCP-1610W --resolution=300 --format=pnm --output-file=${jobId}.scan_output.pnm`
  );
  const unpaperExec = await execa.command(
    `unpaper --size a4 --layout single --sheet-background white ${jobId}.scan_output.pnm ${jobId}.unpaper_output.pnm`
  );
  const compressExec = await execa.command(
    `convert ${jobId}.unpaper_output.pnm -wavelet-denoise 5% -quality 50 ${jobId}.compress_output.jpg`
  );

  const stream = createReadStream(`${jobId}.compress_output.jpg`);

  stream.on("error", function (error) {
    res.writeHead(404, "Not Found");
    res.end();
  });

  stream.pipe(res);
  // return res.send({ jobId, scanExec, unpaperExec, compressExec });
});
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
