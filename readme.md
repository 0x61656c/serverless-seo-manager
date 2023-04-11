# Meta Tag Updater for Dynamic Webpages

This project provides a simple yet powerful solution to dynamically update the meta tags of your webpages. The code snippet is a Cloudflare Worker script that listens for incoming requests and updates the meta tags of your HTML files on-the-fly.

The script fetches the required metadata from an API and uses the HTMLRewriter API to modify the meta tags before serving the HTML file to the client. This ensures that social media platforms and search engines can crawl and display the correct information for your dynamic webpages.

## Features

- Updates the <title> tag of your HTML files
- Updates the Open Graph (og) and Twitter Card meta tags, including:
- og:title
- twitter:title
- og:description
- twitter:description
- og:image
- twitter:image
- og:url
- Fetches metadata from a custom API based on the listing_id query parameter
- Handles non-HTML files without modification

## Usage

To use this script in your Cloudflare Worker, follow these steps:

- Copy the entire code snippet from the js code block above.
- Go to the Cloudflare Workers dashboard and create a new Worker.
- Replace the default code in the Worker script editor with the copied code.
- Save and deploy your Worker.
- After deploying the Worker, you can use it as a proxy for your website by setting the appropriate route in your Cloudflare Worker configuration.

For example, if your website is example.com, set the route to example.com/\* so that all requests to your website are handled by the Worker.

Make sure to modify the fetchMetaData function to point to your own API endpoint for fetching the metadata.

        async function fetchMetaData(listingId) {
            const response = await fetch(`https://your-api.example.com/api/v1/listings/${listingId}/metadata`);
            return response.json();
        }

## Customization

The MetaTagUpdater class and the handleRequest function can be customized to handle different meta tags or API responses as needed.

To add support for additional meta tags, update the element method in the MetaTagUpdater class with the new cases. For example, to add support for the twitter:card meta tag, you can add the following case:

        case "twitter:card":
            element.setAttribute("content", this.metaData.cardType);
            break;

Make sure your API response includes the necessary data to populate the new meta tags.

## Contributing

Contributions to improve or extend the functionality of this project are welcome! Please submit a pull request with your changes or open an issue to discuss your ideas.

## License

This project is released under the MIT License.
