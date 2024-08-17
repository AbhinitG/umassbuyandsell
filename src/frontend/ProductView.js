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
  }
}

export class CreateView {
  constructor() {}

  async render() {
    // Create the root element
    const createContainer = document.createElement('div');
    createContainer.id = 'create-a-post';
    createContainer.className = 'create_container';

    // Create the h2 element for the title
    const titleElement = document.createElement('h2');
    titleElement.className = 'text-2xl font-semibold mb-6';
    titleElement.textContent = 'Create a New Product Post';
    createContainer.appendChild(titleElement);

    // Function to create input containers
    function createInputContainer(labelText, inputType, inputId, inputPlaceholder) {
      const inputContainer = document.createElement('div');
      inputContainer.className = 'create_input_container';

      const label = document.createElement('label');
      label.setAttribute('for', inputId);
      label.className = 'create_label';
      label.textContent = labelText;

      let inputElement;
      if (inputType === 'textarea') {
        inputElement = document.createElement('textarea');
        inputElement.rows = '4';
      } 
      else {
        inputElement = document.createElement('input');
        inputElement.type = inputType;

        if (inputId === 'productPrice') {
          inputElement.step = '0.01';
        }
      }

      inputElement.id = inputId;
      inputElement.className = 'create_input';
      if (inputPlaceholder) {
        inputElement.placeholder = inputPlaceholder;
      }

      inputContainer.appendChild(label);
      inputContainer.appendChild(inputElement);
      return inputContainer;
    }

    // Create Product Image Upload
    createContainer.appendChild(createInputContainer('Product Image', 'file', 'productImage'));

    // Create Product Title Input
    createContainer.appendChild(createInputContainer('Product Title', 'text', 'productTitle', 'Enter product title'));

    // Create Product Price Input
    createContainer.appendChild(createInputContainer('Product Price', 'number', 'productPrice', 'Enter product price'));

    // Create Product Description Input
    createContainer.appendChild(createInputContainer('Product Description', 'textarea', 'productDescription', 'Enter product description'));

    // Create Seller Email Input
    createContainer.appendChild(createInputContainer('Seller Email', 'email', 'sellerEmail', 'Enter seller email'));

    // Create the submit button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-end';

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.className = 'createButton';
    submitButton.textContent = 'Create Post';
    buttonContainer.appendChild(submitButton);

    // Append the button container to the createContainer
    createContainer.appendChild(buttonContainer);
    const events = Events.events();
    const createPost = function(post) {
      events.publish('create-post', new Post(undefined, post.image, post.title, post.price, post.description, post.seller));
    };

    // Add event listener to the submit button
    submitButton.addEventListener('click', function() {
      const productImageInput = document.getElementById('productImage');
      const productTitleInput = document.getElementById('productTitle').value.trim();
      const productPriceInput = document.getElementById('productPrice').value.trim();
      const productDescriptionInput = document.getElementById('productDescription').value.trim();
      const sellerEmailInput = document.getElementById('sellerEmail').value.trim();

      if (!productImageInput.files.length) {
        alert('Please upload a product image.');
        return;
      }
      if (!productTitleInput || !productPriceInput || !productDescriptionInput || !sellerEmailInput) {
        alert('Please fill in all fields.');
        return;
      }

      // Get the values
      const productImage = productImageInput.files[0]; // File object
      let productImageSrc = "/src/images/" + productImage.name;
      const productTitle = productTitleInput;
      const productPrice = '$' + productPriceInput; // Convert to a number
      const productDescription = productDescriptionInput;
      const sellerEmail = sellerEmailInput;

      createPost({image: productImageSrc, title: productTitle, price: productPrice, description: productDescription, seller: sellerEmail});

      document.getElementById('productImage').value = "";
      document.getElementById('productTitle').value = "";
      document.getElementById('productPrice').value = '';
      document.getElementById('productDescription').value = '';
      document.getElementById('sellerEmail').value = '';
    });

    return createContainer;
  }
}

export class MyPostsView {
  constructor() {}

  async render() {
    const store = Store.store();
    const myPostsViewElm = document.createElement('div');
    myPostsViewElm.id = 'my-post-view';

    const current_user = store.get('current_user');
    console.log(current_user);
    const tempArr = store.get("users");
    const filtered = tempArr.filter(user => user.id === current_user);
    console.log(filtered);
    const userObj = filtered[0];

    if (userObj.posts.length > 0) {
      userObj.posts.forEach(async post => {
        const myPost = new MyPosts(post);
        myPostsViewElm.appendChild(await myPost.render());
      });
    }
    else {
      const titleElm = document.createElement('h1');
      titleElm.innerText = 'You currently have no posts!'
      myPostsViewElm.appendChild(titleElm);
    }

    return myPostsViewElm;
  }
}

class MyPosts {
  #events = null;
  #post = null;

  constructor(post) {
    this.#events = Events.events();
    this.#post = post;
  }

  async render() {
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
    img.src = this.#post.image;
    img.alt = 'Product Image';

    // Append the image to the image container
    imageContainer.appendChild(img);

    // Create the div with class 'product_details'
    const productDetails = document.createElement('div');
    productDetails.className = 'product_details';

    // Create the h1 element with class 'product_title'
    const title = document.createElement('h1');
    title.className = 'product_title';
    title.textContent = this.#post.title;

    // Create the div with class 'product_price'
    const price = document.createElement('div');
    price.className = 'product_price';
    price.textContent = this.#post.price;

    // Create the div with class 'product_description'
    const description = document.createElement('div');
    description.className = 'product_description';

    // Create the paragraph element for description text
    const descText = document.createElement('p');
    descText.textContent = this.#post.description;

    // Append the paragraph to the description div
    description.appendChild(descText);

    // Create the div with class 'seller_email_container'
    const sellerEmailContainer = document.createElement('div');
    sellerEmailContainer.className = 'seller_email_container';

    // Create the paragraph element for seller email
    const sellerEmailPara = document.createElement('p');

    // Create the anchor element for email
    const emailLink = document.createElement('a');
    emailLink.href = 'mailto:' + this.#post.seller;
    emailLink.className = 'seller_email';
    emailLink.textContent = this.#post.seller;

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
    deleteButton.className = 'bg-red-800 text-white px-4 py-2 rounded opacity-100 cursor-pointer absolute bottom-4 right-4 hover:bg-red-950';
    deleteButton.disabled = false;  // Initially disabled
    deleteButton.textContent = 'Delete';

    // deleteButton.addEventListener("click", async () => {
      
    // });

    // Append the image container and product details to the product container
    productContainer.appendChild(imageContainer);
    productContainer.appendChild(productDetails);
    productContainer.appendChild(deleteButton);

    // Append the product container to the body (or another container in your document)
    productViewElm.appendChild(productContainer);

    return productViewElm;
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
