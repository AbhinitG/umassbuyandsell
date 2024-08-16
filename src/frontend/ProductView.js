import { Events } from './Events.js';
import { Store } from './Store.js'

export class ProductView {
  constructor() {}

  async render() {
    // Create the root element
    const productViewElm = document.createElement('div');
    productViewElm.id = 'product-view';
    productViewElm.className = 'post_container';

    const browserPosts = new BrowserPosts();
    productViewElm.appendChild(await browserPosts.render());

    return productViewElm;


    // // Create the outer div with class 'product_container'
    // const productContainer = document.createElement('div');
    // productContainer.className = 'product_container relative';

    // // Create the inner div with class 'product_image_container'
    // const imageContainer = document.createElement('div');
    // imageContainer.className = 'product_image_container';

    // // Create the image element
    // const img = document.createElement('img');
    // img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNiAqRnzwKt1nLUpWkRKEYzVCsU9QafUmcw&s';
    // img.alt = 'Product Image';

    // // Append the image to the image container
    // imageContainer.appendChild(img);

    // // Create the div with class 'product_details'
    // const productDetails = document.createElement('div');
    // productDetails.className = 'product_details';

    // // Create the h1 element with class 'product_title'
    // const title = document.createElement('h1');
    // title.className = 'product_title';
    // title.textContent = 'Product Title';

    // // Create the div with class 'product_price'
    // const price = document.createElement('div');
    // price.className = 'product_price';
    // price.textContent = '$99.99';

    // // Create the div with class 'product_description'
    // const description = document.createElement('div');
    // description.className = 'product_description';

    // // Create the paragraph element for description text
    // const descText = document.createElement('p');
    // descText.textContent = 'This is a brief description of the product. It highlights the key features and benefits to entice the customer.';

    // // Append the paragraph to the description div
    // description.appendChild(descText);

    // // Create the div with class 'seller_email_container'
    // const sellerEmailContainer = document.createElement('div');
    // sellerEmailContainer.className = 'seller_email_container';

    // // Create the paragraph element for seller email
    // const sellerEmailPara = document.createElement('p');

    // // Create the anchor element for email
    // const emailLink = document.createElement('a');
    // emailLink.href = 'mailto:seller@example.com';
    // emailLink.className = 'seller_email';
    // emailLink.textContent = 'seller@example.com';

    // // Append the anchor to the paragraph
    // sellerEmailPara.textContent = 'Sold by: ';
    // sellerEmailPara.appendChild(emailLink);

    // // Append the paragraph to the seller email container
    // sellerEmailContainer.appendChild(sellerEmailPara);

    // // Append all the created elements to the product details div
    // productDetails.appendChild(title);
    // productDetails.appendChild(price);
    // productDetails.appendChild(description);
    // productDetails.appendChild(sellerEmailContainer);

    // // Create the delete button
    // const deleteButton = document.createElement('button');
    // deleteButton.className = 'bg-red-800 text-white px-4 py-2 rounded opacity-100 cursor-pointer absolute bottom-4 right-4';
    // deleteButton.disabled = true;  // Initially disabled
    // deleteButton.textContent = 'Delete';

    // // Append the image container and product details to the product container
    // productContainer.appendChild(imageContainer);
    // productContainer.appendChild(productDetails);
    // productContainer.appendChild(deleteButton);

    // // Append the product container to the body (or another container in your document)
    // productViewElm.appendChild(productContainer);

    // return productViewElm;
  }
}

class BrowserPosts {
  #events = null;
  #posts = null;

  constructor() {
    this.#events = Events.events();
  }

  async render() {
    if (this.#posts === null) {
      this.#posts = [];
      this.#posts = await this.#getPosts();
    }

    const postsElm = document.createElement('div');
    postsElm.id = 'browser-posts';

    console.log(this.#posts);
    const postItems = this.#posts.map(post => this.#makePost(post));

    postItems.forEach(post => postsElm.appendChild(post));

    this.#events.subscribe('create-post', post => {
      this.#posts.push(post);
      const newPost = this.#makePost(post);
      postsElm.appendChild(newPost);
      this.#savePosts();
    });

    return postsElm;
  }

  #makePost(post) {
    // Create the root element
    const productViewElm = document.createElement('div');
    productViewElm.id = 'product-view';
    productViewElm.className = 'post_container';

    // Create the outer div with class 'product_container'
    const productContainer = document.createElement('div');
    productContainer.className = 'product_container relative';

    // Create the inner div with class 'product_image_container'
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product_image_container';

    // Create the image element
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = 'Product Image';

    // Append the image to the image container
    imageContainer.appendChild(img);

    // Create the div with class 'product_details'
    const productDetails = document.createElement('div');
    productDetails.className = 'product_details';

    // Create the h1 element with class 'product_title'
    const title = document.createElement('h1');
    title.className = 'product_title';
    title.textContent = post.title;

    // Create the div with class 'product_price'
    const price = document.createElement('div');
    price.className = 'product_price';
    price.textContent = post.price;

    // Create the div with class 'product_description'
    const description = document.createElement('div');
    description.className = 'product_description';

    // Create the paragraph element for description text
    const descText = document.createElement('p');
    descText.textContent = post.description;

    // Append the paragraph to the description div
    description.appendChild(descText);

    // Create the div with class 'seller_email_container'
    const sellerEmailContainer = document.createElement('div');
    sellerEmailContainer.className = 'seller_email_container';

    // Create the paragraph element for seller email
    const sellerEmailPara = document.createElement('p');

    // Create the anchor element for email
    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:' + post.seller;
    emailLink.className = 'seller_email';
    emailLink.textContent = post.seller;

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

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.disabled = true;  // Initially disabled
    deleteButton.textContent = 'Delete';

    // Append the image container and product details to the product container
    productContainer.appendChild(imageContainer);
    productContainer.appendChild(productDetails);
    productContainer.appendChild(deleteButton);

    // Append the product container to the body (or another container in your document)
    productViewElm.appendChild(productContainer);

    return productViewElm;
  }
  
  async #getPosts() {
    // const response = await fetch('/tasks');
    // if (response.status === 200) {
    //   return this.#parse(response.body);
    // } else {
    //   return [];
    // }
    const store = Store.store();
    if (store.has("users")) {
      const users = store.get("users");
      let postArr = [];
      users.forEach(user => {
        if (user.posts.length > 0) {
          postArr = postArr.concat(user.posts);
        }
      });
      return postArr;
    }
    else {
      return [];
    }
    console.log(this.#posts);
  }

  async #savePosts() {
    // await fetch('/tasks', {
    //   method: 'POST',
    //   body: JSON.stringify(this.#posts),
    // });
    const store = Store.store();
    const before = store.get("users");
    // const current = this.#posts;
    const after = [];

    before.forEach(user => {
      const filtered = this.#posts.filter(post => post.seller === user.id);
      const newObj = {id: user.id};
      newObj.posts = filtered;
      after.push(newObj);
    });

    store.set("users", after);
  }


  async #deletePost(id) {
    // await fetch('/tasks', {
    //   method: 'DELETE',
    //   body: id,
    // });
    const store = Store.store();
    this.#posts = this.#posts.filter(post => post.id !== id);
    this.#savePosts();
  }

  #parse(json) {
    const obj = JSON.parse(json);
    const posts = obj.map(post => new Post(post.id, post.image, post.title, post.price, post.description, post.seller));
    return posts;
  }
}


class Post {
  constructor(id, image, title, price, description, seller) {
    if (id === undefined) {
      this.id = Math.random().toString(36);
    } else {
      this.id = id;
    }
    this.image = image;
    this.title = title;
    this.price = price;
    this.description = description;
    this.seller = seller;
  }
}
