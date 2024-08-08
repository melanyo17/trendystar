const btnCarrito = document.querySelector('.container-icon')
const containerCarrito = document.querySelector('carrito')

btnCarrito.addEventListener('click', () => {
    containerCarrito.classList.toggle('hidden-carrito')
})

//Variable que mantiene el estado visible del carrito


//esperamos que todods los elemento de la página se carguen para continuar con el script
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}




function ready(){
    //Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i]
        button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcionalidad al boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i < botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i]
        button.addEventListener('click', restarCantidad);
    }

    //Agrego fucionalidad a los botones Agregar al Carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoCliked);
    }

    //Agregar funcionalidad al boton de pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)

}



//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonCliked = event.target;
    buttonCliked.parentElement.parentElement.remove();

    //Actualizamos el total del carrito una vez que hemos eliminado un item
    actualizarTotalCarrito();


    //La siguiente funcion controla si hay elementos en el carrito una vez que se elimino
    //si no hay debo ocultar el carrito
    ocultarCarrito();
}

//Actualiza el total del carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems =carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i < carritoItems.length;i++){
        var item =carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        //quitamos el simbolo de peso y el punto de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('Q','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total +(precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'Q' + total.toLocaleString("es") + '.00';
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight ='-100%';
        carrito.style.opacity='0';
        carritoVisible = false;
        
        //ahora maximizo el contenedor
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
      

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonCliked = event.target;
    var selector = buttonCliked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el total
    actualizarTotalCarrito();
}


function restarCantidad(event){
    var buttonCliked = event.target;
    var selector = buttonCliked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //Controlamos que no sea mayor que 1
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el total
    actualizarTotalCarrito()
    }
    
}

function agregarAlCarritoCliked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);
    
    actualizarTotalCarrito();

    //La siguiente funcion agrega el elemento al carrito. le mando por parametros de valores
    agregarItemAlCarrito(titulo,precio, imagenSrc);

    hacerVisibleCarrito();
    actualizarTotalCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add ='item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //Vamos a controlar que el item que esta ingresando no se encuentra en el carrito.
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i <nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
                <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);


    var botonesSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonesSumarCantidad.addEventListener('click', sumarCantidad);

    var botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonesRestarCantidad.addEventListener('click', restarCantidad);

    actualizarTotalCarrito()
}

function pagarClicked(event){
    alert("Gracias por su compra");

    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito()
}


function hacerVisibleCarrito(){
    btnCarrito.addEventListener('click', () => {
        carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%;'
})
    
}