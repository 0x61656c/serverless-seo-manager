addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  
  class MetaTagUpdater {
    constructor(metaData) {
      this.metaData = metaData;
    }
  
    element(element) {
      const attrName = element.getAttribute("name") || element.getAttribute("property");
      console.log(attrName);
      switch (attrName) {
        case "og:title":
        case "twitter:title":
          element.setAttribute("content", this.metaData.title);
          break;
        case "og:description":
        case "twitter:description":
          element.setAttribute("content", this.metaData.description);
          break;
        case "og:image":
        case "twitter:image":
          element.setAttribute("content", this.metaData.photo);
          break;
        case "og:url":
          element.setAttribute("content", `${this.metaData.id}`);
          break;
      }
    }
  }
  
  async function fetchMetaData(listingId) {
    const api_endpoint = `https://tangram.ngrok.io/api/v1/listings/${listingId}/metadata`;
    const response = await fetch(api_endpoint);
    return response.json();
  }
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const listingId = url.searchParams.get("listing_id");
    
    if (!listingId) {
      return new Response("listing_id is required", { status: 400 });
    }
  
    const metaData = await fetchMetaData(listingId);
  
    const response = await fetch(request);
    const contentType = response.headers.get("Content-Type") || "";
  
    if (contentType.includes("text/html")) {
      return new HTMLRewriter()
        .on("title", { element: (element) => element.setInnerContent(metaData.title) })
        .on("meta", new MetaTagUpdater(metaData))
        .transform(response);
    } else {
      return response;
    }
  }
  