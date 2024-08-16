import { Events } from './Events.js';


export class ProductView {
  constructor() {}

  async render() {
    // Create the root element
    const productViewElm = document.createElement('div');
    productViewElm.id = 'product-view';
    productViewElm.className = 'post_container';

    // Create the outer div with class 'product_container'
    const productContainer = document.createElement('div');
    productContainer.className = 'product_container';

    // Create the inner div with class 'product_image_container'
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product_image_container';

    // Create the image element
    const img = document.createElement('img');
    img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNiAqRnzwKt1nLUpWkRKEYzVCsU9QafUmcw&s';
    img.alt = 'Product Image';

    // Append the image to the image container
    imageContainer.appendChild(img);

    // Create the div with class 'product_details'
    const productDetails = document.createElement('div');
    productDetails.className = 'product_details';

    // Create the h1 element with class 'product_title'
    const title = document.createElement('h1');
    title.className = 'product_title';
    title.textContent = 'Product Title';

    // Create the div with class 'product_price'
    const price = document.createElement('div');
    price.className = 'product_price';
    price.textContent = '$99.99';

    // Create the div with class 'product_description'
    const description = document.createElement('div');
    description.className = 'product_description';

    // Create the paragraph element for description text
    const descText = document.createElement('p');
    descText.textContent = 'This is a brief description of the product. It highlights the key features and benefits to entice the customer.';

    // Append the paragraph to the description div
    description.appendChild(descText);

    // Create the div with class 'seller_email_container'
    const sellerEmailContainer = document.createElement('div');
    sellerEmailContainer.className = 'seller_email_container';

    // Create the paragraph element for seller email
    const sellerEmailPara = document.createElement('p');

    // Create the anchor element for email
    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:seller@example.com';
    emailLink.className = 'seller_email';
    emailLink.textContent = 'seller@example.com';

    // Append the anchor to the paragraph
    sellerEmailPara.textContent = 'Sold by: ';
    sellerEmailPara.appendChild(emailLink);

    // Append the paragraph to the seller email container
    sellerEmailContainer.appendChild(sellerEmailPara);

    // Append all the created elements to the product details div
    productDetails.appendChild(title);
    productDetails.appendChild(price);
    productDetails.appendChild(description);
    productDetails.appendChild(sellerEmailContainer);

    // Append the image container and product details to the product container
    productContainer.appendChild(imageContainer);
    productContainer.appendChild(productDetails);

    // Append the product container to the body (or another container in your document)
    productViewElm.appendChild(productContainer);

    return productViewElm;
  }
}