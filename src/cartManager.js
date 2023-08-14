const fs = require("fs");

class CartManager {
  constructor() {
    this.file = "./src/data/carts.json";
  }

  addFile = (obj) => {
    try {
      if (!fs.existsSync(this.file)) {
        fs.writeFileSync(this.file, JSON.stringify([], null, 2));
      }

      let data = fs.readFileSync(this.file, "utf-8");
      let files = JSON.parse(data);

      if (files.length === 0) {
        obj.id = 1;
        obj.products = [];
      } else {
        const maxId = Math.max(...files.map((f) => f.id));
        obj.id = maxId + 1;
        obj.products = [];
      }

      files.push(obj);
      fs.writeFileSync(this.file, JSON.stringify(files, null, 2));
      return obj;
    } catch (err) {
      return err;
    }
  };

  getById = async (id) => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        let file = files.find((f) => f.id === id);
        if (!file) {
          return "File does not exist";
        } else {
          return file;
        }
      }
    } catch (err) {
      return err;
    }
  };

  getAll = async () => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        return files;
      }
    } catch (err) {
      return err;
    }
  };

  updateById = async (id, obj) => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        const maxId = Math.max(...files.map((f) => f.id));
        if (id > maxId) {
          return "file does not exist";
        } else {
          let newFiles = files.map((f) => {
            if (f.id === id) {
              return { ...f, ...obj };
            } else {
              return f;
            }
          });
          fs.writeFileSync(this.file, JSON.stringify(newFiles, null, 2));
          return newFiles;
        }
      }
    } catch (err) {
      return err;
    }
  };
}

const cartManager = new CartManager();

module.exports = cartManager;