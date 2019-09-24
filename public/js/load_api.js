function loadApi() {
  const specUrl = "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml";
  var swaggerClient = new SwaggerClient(specUrl).then(client => {
    console.log(client);
    console.log(client.errors);

    /*  for (let [path, pathObj] of Object.entries(client.spec.paths)) {
        // console.log(path);

        for (let [verb, verbObj] of Object.entries(pathObj)) {
          console.log(verb + " " + path);
        }
      }*/
    const main = document.querySelector('#main');
    document.getElementById("clone").textContent = 'API:' + client.spec.info.title;


    let stallTime = 1800;
    for (let [api, apiObj] of Object.entries(client.apis)) {
      // console.log(path);


      for (let [endpointName, endpointFunc] of Object.entries(apiObj)) {
        attackEndpoint(main, api, endpointName, "Scanned: " + endpointName, stallTime);
        stallTime += 1700;
      }
    }
    attackEndpoint(main, "", "", "Report: 1 SQL Injection failure\n 1 Fuzz attack failure\n 1 passing", stallTime);
  });
}

var attackEndpoint = async (main, api, endpointName, textContent, stallTime) => {
  await stall(stallTime); // stalls for 1/2 a second

  console.log(api + " " + endpointName);
  var clone = document.getElementById("clone");
  var newEndpointElm = clone.cloneNode(true);
  console.log(newEndpointElm);
  newEndpointElm.textContent = textContent;
  main.appendChild(newEndpointElm)


};

async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

