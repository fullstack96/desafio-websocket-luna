const fs = require("fs");

class ProductManager {
  constructor() {
    this.file = "./src/data/products.json";
  }

  addFile = (obj) => {
    try {
      if (!fs.existsSync(this.file)) {
        fs.writeFileSync(this.file, JSON.stringify([], null, 2));
      }
      let data = fs.readFileSync(this.file, "utf-8");
      let files = JSON.parse(data);
      console.log(data);
      if (files.length === 0) {
        obj.id = 1;
      } else {
        obj.id = Math.max(...files.map((f) => f.id)) + 1;
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

  deleteById = async (id) => {
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
          let newFiles = files.filter((f) => f.id !== id);
          fs.writeFileSync(this.file, JSON.stringify(newFiles, null, 2));
          return newFiles;
        }
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
          return "File does not exist";
        } else {
          const indexToUpdate = files.findIndex((f) => f.id === id);
          if (indexToUpdate !== -1) {
            files[indexToUpdate] = { ...files[indexToUpdate], ...obj };
            fs.writeFileSync(this.file, JSON.stringify(files, null, 2));
            return files[indexToUpdate];
          } else {
            return "File does not exist";
          }
        }
      }
    } catch (err) {
      return err;
    }
  };
}

const productManager = new ProductManager();

module.exports = productManager;