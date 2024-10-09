class Product {
  constructor(name, price, year) {
      this.name = name;
      this.price = price;
      this.year = year;
  }
}

class UI {
  addProduct(product) {
      const productList = document.getElementById('product-list');
      const element = document.createElement('div');
      element.innerHTML = `
          <div class="card text-center mb-4">
              <div class="card-body">
                  <strong>Nombre</strong>: ${product.name}
                  <strong>Precio</strong>: ${product.price}
                  <strong>Año</strong>: ${product.year}
                  <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
              </div>
          </div>
      `;
      productList.appendChild(element);
      this.resetForm();
  }

  resetForm() {
      document.getElementById('product-form').reset();
  }

  deleteProduct(element) {
      if (element.name === 'delete') {
          element.parentElement.parentElement.parentElement.remove();
          this.showMessage('Producto Eliminado Correctamente', 'danger');
      }
  }

  showMessage(message, cssClass) {
      const div = document.createElement('div');
      div.className = `alert alert-${cssClass} mt-3`;
      div.appendChild(document.createTextNode(message));

      const container = document.querySelector('.container-fluid');
      const app = document.querySelector('#app');
      container.insertBefore(div, app);

      setTimeout(function(){
          document.querySelector('.alert').remove();
      }, 2000);
  }
}

document.getElementById('product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const year = document.getElementById('year').value;

  const product = new Product(name, price, year);

  const ui = new UI();

  if (name === "" || price === "" || year === "") {
      ui.showMessage('Complete los Campos', 'warning');
      return;  
  }

  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage('Este producto ha sido agregado correctamente', 'success');
});

document.getElementById('product-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});