const generateDefaultProducts = () => {
  const products = [
    {
      title:
        "Smart TV Sony 65 OLED Pulgadas 4k Google Tv Netflix Youtube XR 65A80J",
      price: 1299999,
      stock: 15,
      thumbnail_url:
        "https://images.fravega.com/f300/688f48c75e41351aae9dbb1b6fb7df4a.jpg.webp",
      description:
        "Disfruta del entretenimiento realmente envolvente con el sonido y la imagen en completa armonia de este televisor OLED 4K, que cuenta con la tecnologia de nuestro revolucionario Cognitive Processor XR.",
      business: "TV",
    },
    {
      title: "Smart TV QNED 86” 4K LG MiniLED 86QNED85SQA",
      price: 1599999,
      stock: 15,
      thumbnail_url:
        "https://images.fravega.com/f300/118a33407016160efe686ef1198a831b.jpg.webp",
      description:
        "Cuenta con entradas HDMI (2.1 y 2.0) y USB para que logres conectar notebooks, pendrives, tablets, entre otros dispositivos. También posee Bluetooth 5.0 para conexiones inalámbricas.",
      business: "TV",
    },
    {
      title: "iPhone 13 256GB Midnight",
      price: 1059900,
      stock: 15,
      thumbnail_url:
        "https://images.fravega.com/f300/fd127ad03bb0ed21691b43f6bcc0a4cc.jpg.webp",
      description:
        "Disfruta de la nueva experiencia iphone con este nuevo modelo de ultima generacion",
      business: "Cellphones",
    },
    {
      title: "Celular Xiaomi Poco F3 6GB 128GB Blue Sin Cargador",
      price: 243399,
      stock: 15,
      thumbnail_url:
        "https://images.fravega.com/f300/1e24ab80f18fd27d2cbc6a200efd9fe5.jpg.webp",
      description:
        "Disfruta de la nueva experiencia xiaomi con este nuevo modelo de ultima generacion",
      business: "Cellphones",
    },
    {
      title:
        "Notebook Acer 15,6” Core i7 16GB 1TB SSD Predator Helios 300 PH315-55-77TX",
      price: 1049999,
      stock: 15,
      thumbnail_url:
        "https://images.fravega.com/f300/19835ea38d74f0816c81b17986c19e8a.jpg.webp",
      description:
        "La notebook Acer Predator Helios 300 cuenta con una pantalla de 15,6 pulgadas, con resolución FHD y una frecuencia de actualización de 165Hz.",
      business: "Notebooks",
    },
    {
      title: "Notebook Asus 15 Core i9 11900H 32GB 1TB RTX3080 Touch Win11Home",
      price: 2474799,
      stock: 15,
      thumbnail_url:
        "https://images.fravega.com/f300/bec8daf37e50804f7fefaa9d50990506.jpg.webp",
      description:
        "La notebook Asus 15 cuenta con una pantalla de 15,6 pulgadas, con resolución FHD y una frecuencia de actualización de 165Hz.",
      business: "Notebooks",
    },
  ];
  return products;
};

const generateDefaultBusinesses = () => {
  const businesses = [
    {
      name: "TV",
      products: [],
    },
    {
      name: "Cellphones",
      products: [],
    },
    {
      name: "Notebooks",
      products: [],
    },
  ];
  return businesses;
};

const generateDefaultUsers = () => {
  const users = [
    {
      first_name: "John",
      last_name: "Mcarry",
      age: 21,
      email: "john@gmail.com",
      password: "123abcd",
      role: "USER",
    },
    {
      first_name: "Paul",
      last_name: "Mclain",
      age: 33,
      email: "paul@gmail.com",
      password: "456ghi",
      role: "USER",
    },
    {
      first_name: "Steven",
      last_name: "Cornetas",
      age: 14,
      email: "steven@gmail.com",
      password: "789lmn",
      role: "USER",
    },
    {
      first_name: "Axel",
      last_name: "Langerman",
      age: 27,
      email: "axellangerman@yahoo.com",
      password: "898524Abc+",
      role: "ADMIN",
    },
  ];
  return users;
};

const generateOrder = () => {};

module.exports = {
  generateDefaultProducts,
  generateDefaultBusinesses,
  generateDefaultUsers,
  generateOrder,
};
