import { waitFor } from "@/lib/helper/waitFor";
import { Environement } from "@/types/executor";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  environment: Environement
): Promise<boolean> {
  try {
    console.log("====================================");
    console.log("@ENV", environment);
    console.log("====================================");
    const browser = await puppeteer.launch({
      headless: false, // for testing
    });
    await waitFor(3000);
    await browser.close();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
