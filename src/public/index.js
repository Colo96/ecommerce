window.onload = () => {
  getProducts().then((arrayProducts) =>
    arrayProducts.map((product) => createProductCards(product))
  );
};

const categoryForm = document.getElementById("category-form");
const cardContainer = document.getElementById("card-container");

const getBusinesses = async () => {
  await fetch("/api/businesses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      const categoryBusiness = data.businesses;
      const selectMenu = categoryForm.children[0];
      createBusinessOptions(categoryBusiness, selectMenu);
      const selectedOption = selectMenu.options[0].id;
      obtenerProductCards(selectedOption);
    })
    .catch((error) => {
      console.log(error);
    });
};

getBusinesses();

const createBusinessOptions = (listBusinesses, selectMenu) => {
  for (let index = 0; index < listBusinesses.length; index++) {
    const option = document.createElement("option");
    option.setAttribute("id", listBusinesses[index]._id);
    option.setAttribute("value", index);
    option.textContent = listBusinesses[index].name;
    selectMenu.appendChild(option);
  }
};

categoryForm.children[1].addEventListener("click", (event) => {
  event.preventDefault();
  let selectedOption =
    categoryForm.children[0].options[categoryForm.children[0].selectedIndex].id;
  let options = Object.values(categoryForm.children[0].options);
  let optionsWithoutDuplicates = [...new Set(options)];
  let filteredOptions = optionsWithoutDuplicates.filter(
    (option) => option.id != ""
  );
  if (selectedOption == "") {
    for (let index = 0; index < filteredOptions.length; index++) {
      fetch(`/api/businesses/${filteredOptions[index].id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw data.error;
          }
          const productsInBusiness = data.business.products;
          clearCardContainer();
          for (let index = 0; index < productsInBusiness.length; index++) {
            obtenerProductCards(productsInBusiness[index]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    fetch(`/api/businesses/${selectedOption}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        const productsInBusiness = data.business.products;
        clearCardContainer();
        for (let index = 0; index < productsInBusiness.length; index++) {
          obtenerProductCards(productsInBusiness[index]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const clearCardContainer = () => {
  cardContainer.innerHTML = "";
};

const obtenerProductCards = async (productId) => {
  let productDiv = document.getElementById(productId);
  await fetch(`/api/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      const product = data.product;
      createProductCards(product);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createProductCards = (product) => {
  const div = document.createElement("div");
  div.setAttribute("id", product._id);
  div.setAttribute("class", "col-lg-4 mb-5");

  const divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.setAttribute("data-business", product.business);

  div.appendChild(divCard);

  const img = document.createElement("img");
  img.setAttribute("src", product.thumbnail_url);
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", product.description);

  divCard.appendChild(img);

  const divCardBody = document.createElement("div");
  divCardBody.setAttribute("class", "card-body bg-primary");

  divCard.appendChild(divCardBody);

  const h5 = document.createElement("h5");
  h5.setAttribute("class", "card-title");
  h5.textContent = product.title;

  divCardBody.appendChild(h5);

  const p = document.createElement("p");
  p.setAttribute("class", "card-text");
  p.textContent = product.description;

  divCardBody.appendChild(p);

  const divBtnPrice = document.createElement("div");
  divBtnPrice.setAttribute(
    "class",
    "d-flex justify-content-between align-items-center"
  );

  divCardBody.appendChild(divBtnPrice);

  const divBtnGroup = document.createElement("div");
  divBtnGroup.setAttribute("class", "btn-group");

  divBtnPrice.appendChild(divBtnGroup);

  const span = document.createElement("span");
  span.setAttribute("class", "price");
  span.textContent = "$" + product.price;

  divBtnPrice.appendChild(span);

  const buttonView = document.createElement("button");
  buttonView.setAttribute("type", "button");
  buttonView.setAttribute("class", "btnView btn btn-sm");
  buttonView.setAttribute("onclick", "acciones()");
  buttonView.textContent = "View";

  divBtnGroup.appendChild(buttonView);

  const buttonAdd = document.createElement("button");
  buttonAdd.setAttribute("type", "button");
  buttonAdd.setAttribute("class", "btn btn-sm");
  buttonAdd.textContent = "Add to cart";

  divBtnGroup.appendChild(buttonAdd);

  cardContainer.appendChild(div);
};

const getProducts = async () => {
  let listaProducts = [];
  await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      const products = data.products;
      listaProducts = products;
    })
    .catch((error) => {
      console.log(error);
    });
  return listaProducts;
};

const getProductIdFromCard = async () => {
  let buttonsView = document.getElementsByClassName("btnView");
  let buttonViewId;
  for (let index = 0; index < buttonsView.length; index++) {
    buttonsView[index].addEventListener("click", (event) => {
      event.preventDefault();
      buttonViewId =
        buttonsView[index].parentElement.parentElement.parentElement
          .parentElement.parentElement.id;
      console.log(buttonViewId);
      localStorage.setItem("IdProduct", buttonViewId);
      window.location.href = "/api/productView";
    });
  }
};

const select = document.getElementById("prodViewSelect");

const acciones = async () => {
  await getProductIdFromCard();
  let productId = localStorage.getItem("IdProduct");
  if (productId) {
    await fetch(`/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        const product = data.product;
        createProductView(product);
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.clear();
  }
};

acciones();

const createProductView = (product) => {
  if (select) {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container");

    select.appendChild(divContainer);

    const divRow = document.createElement("div");
    divRow.setAttribute("class", "row gx-5");

    divContainer.appendChild(divRow);

    const aside = document.createElement("aside");
    aside.setAttribute("class", "col-lg-6");

    divRow.appendChild(aside);

    const main = document.createElement("main");
    main.setAttribute("class", "col-lg-6");

    divRow.appendChild(main);

    const divInAside = document.createElement("div");
    divInAside.setAttribute(
      "class",
      "border rounded-4 mb-3 d-flex justify-content-center"
    );

    aside.appendChild(divInAside);

    const aInDivInAside = document.createElement("a");
    aInDivInAside.setAttribute("data-fslightbox", "mygalley");
    aInDivInAside.setAttribute("class", "rounded-4");
    aInDivInAside.setAttribute("target", "_blank");
    aInDivInAside.setAttribute("data-type", "image");
    aInDivInAside.setAttribute("href", product.thumbnail_url);

    divInAside.appendChild(aInDivInAside);

    const imageInAInAside = document.createElement("img");
    imageInAInAside.setAttribute(
      "style",
      "max-width: 100%; max-height: 100vh; margin: auto"
    );
    imageInAInAside.setAttribute("class", "rounded-4 fit");
    imageInAInAside.setAttribute("src", product.thumbnail_url);

    aInDivInAside.appendChild(imageInAInAside);

    const divInMain = document.createElement("div");
    divInMain.setAttribute("class", "ps-lg-3");

    main.appendChild(divInMain);

    const h4InDivInMain = document.createElement("h4");
    h4InDivInMain.setAttribute("class", "title text-dark");
    h4InDivInMain.innerHTML = product.title;

    divInMain.appendChild(h4InDivInMain);

    const divInDivInMain = document.createElement("div");
    divInDivInMain.setAttribute("class", "d-flex flex-row my-3");

    divInMain.appendChild(divInDivInMain);

    const spanInDivInDivInMain = document.createElement("span");
    spanInDivInDivInMain.setAttribute("class", "text-muted");

    divInDivInMain.appendChild(spanInDivInDivInMain);

    const iInSpanInDivInDivInMain = document.createElement("i");
    iInSpanInDivInDivInMain.setAttribute(
      "class",
      "fas fa-shopping-basket fa-sm mx-1"
    );
    iInSpanInDivInDivInMain.innerHTML = product.stock;

    spanInDivInDivInMain.appendChild(iInSpanInDivInDivInMain);

    const spanTwoInDivInDivInMain = document.createElement("span");
    spanTwoInDivInDivInMain.setAttribute("class", "text-success ms-2");
    spanTwoInDivInDivInMain.innerHTML = "In stock";

    divInDivInMain.appendChild(spanTwoInDivInDivInMain);

    const divTwoInDivInMain = document.createElement("div");
    divTwoInDivInMain.setAttribute("class", "mb-3");

    divInMain.appendChild(divTwoInDivInMain);

    const spanInDivTwoInDivInMain = document.createElement("span");
    spanInDivTwoInDivInMain.setAttribute("class", "h5");
    spanInDivTwoInDivInMain.innerHTML = "$" + product.price;

    divTwoInDivInMain.appendChild(spanInDivTwoInDivInMain);

    const spanTwoInDivTwoInDivInMain = document.createElement("span");
    spanTwoInDivTwoInDivInMain.setAttribute("class", "text-muted");
    spanTwoInDivTwoInDivInMain.innerHTML = " per unit";

    divTwoInDivInMain.appendChild(spanTwoInDivTwoInDivInMain);

    const pInDivInMain = document.createElement("p");
    pInDivInMain.innerHTML = product.description;

    divInMain.appendChild(pInDivInMain);

    const hrInDivInMain = document.createElement("hr");

    divInMain.appendChild(hrInDivInMain);

    const divThreeInDivInMain = document.createElement("div");
    divThreeInDivInMain.setAttribute("class", "row mb-4");

    divInMain.appendChild(divThreeInDivInMain);

    const divInDivThreeInDivInMain = document.createElement("div");
    divInDivThreeInDivInMain.setAttribute("class", "col-md-4 col-6 mb-3");

    divThreeInDivInMain.appendChild(divInDivThreeInDivInMain);

    const labelInDivInDivThreeInDivInMain = document.createElement("label");
    labelInDivInDivThreeInDivInMain.setAttribute("class", "mb-2 d-block");
    labelInDivInDivThreeInDivInMain.innerHTML = "Quantity";

    divInDivThreeInDivInMain.appendChild(labelInDivInDivThreeInDivInMain);

    const divInDivInDivThreeInDivInMain = document.createElement("div");
    divInDivInDivThreeInDivInMain.setAttribute("class", "input-group mb-3");
    divInDivInDivThreeInDivInMain.setAttribute("style", "width: 170px");

    divInDivThreeInDivInMain.appendChild(divInDivInDivThreeInDivInMain);

    const buttonInDivInDivInDivThreeInDivInMain =
      document.createElement("button");
    buttonInDivInDivInDivThreeInDivInMain.setAttribute(
      "class",
      "btn btn-white border border-secondary px-3"
    );
    buttonInDivInDivInDivThreeInDivInMain.setAttribute("type", "button");
    buttonInDivInDivInDivThreeInDivInMain.setAttribute("id", "button-addon1");
    buttonInDivInDivInDivThreeInDivInMain.setAttribute(
      "data-mdb-ripple-color",
      "dark"
    );

    divInDivInDivThreeInDivInMain.appendChild(
      buttonInDivInDivInDivThreeInDivInMain
    );

    const iInButtonInDivInDivInDivThreeInDivInMain =
      document.createElement("i");
    iInButtonInDivInDivInDivThreeInDivInMain.setAttribute(
      "class",
      "fas fa-minus"
    );

    buttonInDivInDivInDivThreeInDivInMain.appendChild(
      iInButtonInDivInDivInDivThreeInDivInMain
    );

    const inputInDivInDivInDivThreeInDivInMain =
      document.createElement("input");
    inputInDivInDivInDivThreeInDivInMain.setAttribute("type", "text");
    inputInDivInDivInDivThreeInDivInMain.setAttribute(
      "class",
      "form-control text-center border border-secondary"
    );
    inputInDivInDivInDivThreeInDivInMain.setAttribute("placeholder", "14");
    inputInDivInDivInDivThreeInDivInMain.setAttribute(
      "aria-label",
      "Example text with button addon"
    );
    inputInDivInDivInDivThreeInDivInMain.setAttribute(
      "aria-describedby",
      "button-addon1"
    );

    divInDivInDivThreeInDivInMain.appendChild(
      inputInDivInDivInDivThreeInDivInMain
    );

    const buttonTwoInDivInDivInDivThreeInDivInMain =
      document.createElement("button");
    buttonTwoInDivInDivInDivThreeInDivInMain.setAttribute(
      "class",
      "btn btn-white border border-secondary px-3"
    );
    buttonTwoInDivInDivInDivThreeInDivInMain.setAttribute("type", "button");
    buttonTwoInDivInDivInDivThreeInDivInMain.setAttribute(
      "id",
      "button-addon2"
    );
    buttonTwoInDivInDivInDivThreeInDivInMain.setAttribute(
      "data-mdb-ripple-color",
      "dark"
    );

    divInDivInDivThreeInDivInMain.appendChild(
      buttonTwoInDivInDivInDivThreeInDivInMain
    );

    const iInButtonTwoInDivInDivInDivThreeInDivInMain =
      document.createElement("i");
    iInButtonTwoInDivInDivInDivThreeInDivInMain.setAttribute(
      "class",
      "fas fa-plus"
    );

    buttonTwoInDivInDivInDivThreeInDivInMain.appendChild(
      iInButtonTwoInDivInDivInDivThreeInDivInMain
    );

    const aInDivInMain = document.createElement("a");
    aInDivInMain.setAttribute("href", "#");
    aInDivInMain.setAttribute("class", "btn btn-primary shadow-0");
    aInDivInMain.innerHTML = " Add to cart" + " ";

    divInMain.appendChild(aInDivInMain);

    const iInAInDivInMain = document.createElement("i");
    iInAInDivInMain.setAttribute("class", "me-1 fa fa-shopping-basket");
    // iInAInDivInMain.innerHTML = " Add to cart";

    aInDivInMain.appendChild(iInAInDivInMain);
  }
};
