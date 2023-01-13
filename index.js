                   
const contenedorcarrito = document.getElementById("contenedorcarrito");
const contenedorproductos = document.getElementById("contenedorproductos");
const vaciarcarrito = document.getElementById("vaciarcarrito");
const payment = document.getElementById("payment")
const total = document.getElementById("total");


vaciarcarrito.addEventListener("click", () => {
    eliminarcarritototal(),
    Toastify({
        text: "tu carrito esta vacio"
    }).showToast();
 
})

payment.addEventListener("click",(e)=>{
     e.preventDefault()
     total.innerText = 0
     carrito = []
     mostrarCarrito()
     Swal.fire({
        title: 'Gracias Por Tu compra',
        imageUrl: 'https://www.innaturale.com/es/wp-content/uploads/2018/11/cangreburguer-Bob-Esponja-hamburguesa.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
    })
})

let carrito = [];


async function loadComidas() {
    const response = await fetch('./comidas.json');
    const comida = await response.json();
    return comida 
  }
  

const mostrarproductos = async () => {
    const comidas = await loadComidas()
    comidas.forEach(menu => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML =  `
        <div>
        <img src="./${menu.imagen}" class = "card-img-top imgmenu" alt = " ${menu.comida}">
        <div class ="card-body">
        </div>
        <h2> ${menu.comida} </h2>
        <p> ${menu.precio} </p>
        <button class = "botoncolor" id = "button ${menu.id}">agregar al carrito</button>
        </div>
        </div>
        `

    contenedorproductos.appendChild(card);
    const button =document.getElementById(`button ${menu.id}`)
    button.addEventListener("click",() => {
        agregaralcarrito(menu.id)
    })

    })
     }
 
     
const agregaralcarrito= async(id) => {
        const menucarritoo = carrito.find(menu => menu.id === id);
        Toastify({
            text: "menu agregado al carrito",
            color: "#716add",
        }).showToast();
        if(menucarritoo) {
            menucarritoo.cantidad++;
        } else { 
            const comidas = await loadComidas()
            const menu = comidas.find(menu => menu.id === id);
            menu.cantidad = 1
         carrito.push(menu);
         }
       calculartotal();
       mostrarCarrito()
       
     }


const mostrarCarrito = () => {
   contenedorcarrito.innerHTML = "";
    carrito.forEach(menu => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML =  `
        <div>
        <img src = "${menu.imagen}" class = "card-img-top imgmenu" alt = " ${menu.comida}">
        <div class ="card-body">
        </div>
        <h2> ${menu.comida} </h2>
        <p> ${menu.precio} </p>
        <p> ${menu.cantidad} </p>
        <button class = "botoncolor" id =  "eliminar${menu.id}">eliminar del carrito </button>
        </div>
        </div> `
        contenedorcarrito.appendChild(card);

        const boton = document.getElementById (`eliminar${menu.id}`);
        boton.addEventListener ("click", () => {
        eliminardelcarrito(menu.id)
        })

    })
    
}

const eliminardelcarrito = (id) => {
    const producto = carrito.find(menu => menu.id === id);
    carrito = carrito.filter(menu => menu.id != producto.id)
    mostrarCarrito();
}


const eliminarcarritototal = () => {
    carrito = [];
    total.innerText=0
    mostrarCarrito ();
}

const calculartotal =  () => {
    let totalmenu = 0;
    carrito.forEach (menu => {
        totalmenu += menu.precio * menu.cantidad;
    }) 
    total.innerHTML = `total: $${totalmenu}`;
}

 mostrarproductos();