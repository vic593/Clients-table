import { getClients } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { createClientsSection } from "./createClientsSection.js";
import { createClientsHeader } from "./createHeader.js"
import { searchClients } from "./searchClient.js";
import { sortTable } from "./sortClientTable.js";

const createApp = async () => {
  const header = createClientsHeader();
  const clientSection = createClientsSection();
  document.body.append(header, clientSection.$main);
  const preloader = document.querySelector('.preloader');

  try {
    const clients = await getClients();
    searchClients(clients)
    setTimeout(() => {
      for (const client of clients) {
        document.querySelector('.clients__tbody').append(createClientItem(client));
      }
    },300)

  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => preloader.remove(), 300)

  }

}
createApp();
document.addEventListener('DOMContentLoaded', sortTable);






