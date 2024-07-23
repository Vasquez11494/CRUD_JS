const BtnGuardar = document.getElementById('BtnGuardar');
const BtnBuscar = document.getElementById('BtnBuscar');
const BtnModificar = document.getElementById('BtnModificar');
const BtnCancelar = document.getElementById('BtnCancelar');
const BtnLimpiar = document.getElementById('BtnLimpiar');
const tablaClientes = document.getElementById('tablaClientes');
const FormularioClientes = document.querySelector('form');

BtnModificar.parentElement.style.display= 'none'
BtnCancelar.parentElement.style.display= 'none'

const ObtenerClientes = async () => {
    const nombres = FormularioClientes.cli_nombre.value;
    const apellidos = FormularioClientes.cli_apellido.value;
    const nit = FormularioClientes.cli_nit.value;
    const telefono = FormularioClientes.cli_telefono.value;


    const url = `/CRUD_JS/controladores/clientes/index.php?cli_nombre=${nombres}&cli_apellido=${apellidos}&cli_nit=${nit}&cli_telefono=${telefono}`;
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        console.log(data); 

        tablaClientes.tBodies[0].innerHTML = '';
        const fragment = document.createDocumentFragment();
        let contador = 1;

        if (respuesta.status == 200) {
            if (data.length > 0) {
                data.forEach(cliente => {
                    const tr = document.createElement('tr');
                    const celda1 = document.createElement('td');
                    const celda2 = document.createElement('td');
                    const celda3 = document.createElement('td');
                    const celda4 = document.createElement('td');
                    const celda5 = document.createElement('td');
                    const celda6 = document.createElement('td');
                    const celda7 = document.createElement('td');

                    celda1.innerText = contador;

                    const BtnModificar = document.createElement('button');
                    const BtnEliminar = document.createElement('button');

                    BtnModificar.textContent = 'Modificar';
                    BtnModificar.classList.add('btn', 'btn-warning', 'w-100');

                    
                    BtnEliminar.textContent = 'Eliminar';
                    BtnEliminar.classList.add('btn', 'btn-danger', 'w-100');
                    
                    BtnModificar.addEventListener('click', () => llenarDatos(cliente)); 
                    BtnEliminar.addEventListener('click', () => EliminarClientes(cliente.cli_codigo)) ;
                    celda2.innerText = cliente.cli_nombre;
                    celda3.innerText = cliente.cli_apellido;
                    celda4.innerText = cliente.cli_nit;
                    celda5.innerText = cliente.cli_telefono;
                    
                    celda6.appendChild(BtnModificar);
                    celda7.appendChild(BtnEliminar);

                    tr.appendChild(celda1);
                    tr.appendChild(celda2);
                    tr.appendChild(celda3);
                    tr.appendChild(celda4);
                    tr.appendChild(celda5);
                    tr.appendChild(celda6);
                    tr.appendChild(celda7);

                    fragment.appendChild(tr);
                    contador++;
                });
            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.innerText = 'No hay clientes ';
                td.colSpan = 7;

                tr.appendChild(td);
                fragment.appendChild(tr);
            }
            tablaClientes.tBodies[0].appendChild(fragment); 
        } else {
            console.log('No se encontraron Datos');
        }
    } catch (error) {
        console.log(error);
    }

}
const llenarDatos = (cliente) =>{
    console.log(cliente)
    FormularioClientes.cli_codigo.value = cliente.cli_codigo 
    FormularioClientes.cli_nombre.value = cliente.cli_nombre 
    FormularioClientes.cli_apellido.value = cliente.cli_apellido 
    FormularioClientes.cli_nit.value = cliente.cli_nit
    FormularioClientes.cli_telefono.value = cliente.cli_telefono
    
    BtnModificar.parentElement.style.display= ""
    BtnCancelar.parentElement.style.display= ""
    BtnGuardar.parentElement.style.display= "none"
    BtnBuscar.parentElement.style.display= "none"
    BtnLimpiar.parentElement.style.display= "none"

}


ObtenerClientes();

const GuardarClientes = async (event) => {

    event.preventDefault();

    BtnGuardar.disabled = true;

    const url = '/CRUD_JS/controladores/clientes/index.php'
    const formData = new FormData(FormularioClientes)
    formData.append('tipo', 1);
    formData.delete('cli_codigo')

    const config = {
        method: 'POST',
        body: formData

    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        const { mensaje, codigo, detalle } = data

        alert(mensaje)
        console.log(data);

        if (codigo == 1 && respuesta.status == 200) {
            ObtenerClientes();
            FormularioClientes.reset();

        } else {
            console.log(detalle);
        } 


    } catch (error) {
        console.log(error);
    }
    BtnGuardar.disabled = false;
}

const ModificarClientes = async (event) => {

    event.preventDefault();

    BtnModificar.disabled = true;

    const url = '/CRUD_JS/controladores/clientes/index.php'
    const formData = new FormData(FormularioClientes)
    formData.append('tipo', 2);

    const config = {
        method: 'POST',
        body: formData

    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        const { mensaje, codigo, detalle } = data

        alert(mensaje)

        if (codigo == 2 && respuesta.status == 200) {
            BtnModificar.parentElement.style.display= "none"
            BtnCancelar.parentElement.style.display= "none"
            BtnGuardar.parentElement.style.display= ""
            BtnBuscar.parentElement.style.display= ""
            BtnLimpiar.parentElement.style.display= ""
            
            FormularioClientes.reset();
            ObtenerClientes();
        } else {
            console.log(detalle);
        } 


    } catch (error) {
        console.log(error);
    }
    BtnGuardar.disabled = false;
}

const Cancelar = async (e) =>{
    FormularioClientes.reset();
    BtnModificar.parentElement.style.display= "none"
    BtnCancelar.parentElement.style.display= "none"
    BtnGuardar.parentElement.style.display= ""
    BtnBuscar.parentElement.style.display= ""
    BtnLimpiar.parentElement.style.display= ""
    ObtenerClientes();
}


const EliminarClientes = async (id) => {

    if(confirm('¿Esta Seguro que desea Eliminar este Cliente?')){

        console.log(id)

        const formData = new FormData();
        formData.append('tipo', 3);
        formData.append('cli_codigo', id);

        const url = '/CRUD_JS/controladores/clientes/index.php'
        const config = {
            method: 'POST',
            body: formData
    
        }
    
        try {
            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            console.log(data);
    
            const { mensaje, codigo, detalle } = data
    
            alert(mensaje)
    
            if (codigo == 3 && respuesta.status == 200) {
                FormularioClientes.reset();
                ObtenerClientes();
            } else {
                console.log(detalle);
            } 
    
    
        } catch (error) {
            console.log(error);
        }
    }

}
BtnCancelar.addEventListener('click', Cancelar)
BtnModificar.addEventListener('click', ModificarClientes)
FormularioClientes.addEventListener('submit', GuardarClientes)

BtnBuscar.addEventListener('click', ObtenerClientes)
