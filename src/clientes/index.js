const BtnGuardar = document.getElementById('BtnGuardar');
const BtnBuscar = document.getElementById('BtnBuscar');
const tablaClientes = document.getElementById('tablaClientes');
const FormularioClientes = document.querySelector('form');


const ObtenerClientes = async () => {
    const nombres = FormularioClientes.cli_nombre.value;
    const apellidos = FormularioClientes.cli_apellido.value;
    const nit = FormularioClientes.cli_nit.value;
    const telefono = FormularioClientes.cli_telefono.value;
    

    const url = '/CRUD_JS/controladores/clientes/index.php';
    const config = {
        method: 'GET'
    }

    try {

        const respuesta =  await fetch (url, config);
        const data = await respuesta.json();

        console.log(data);

        tablaClientes.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        let contador = 1;

        if(respuesta.status == 200){
            alert('Clientes Encontrados');
            if(data.length > 0 ){
                
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

                    celda2.innerText = cliente.cli_nombre;
                    celda3.innerText = cliente.cli_apellido;
                    celda4.innerText = cliente.cli_nit;
                    celda5.innerText = cliente.cli_telefono;
                    
                    celda6.appendChild(BtnEliminar);
                    celda7.appendChild(BtnModificar);

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

            }else{
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay clientes '
                td.colSpan = 7;
        
                tr.appendChild(td)
                fragment.appendChild(tr)
            }

        }else{
            console.log('No se encontraron Datos');
        }
    } catch (error) {
        console.log(error)
    }

}

ObtenerClientes();

const GuardarClientes = async (event) =>{

    event.preventDefault();
    
    BtnGuardar.disabled = true;

    const url = '/CRUD_JS/controladores/clientes/index.php'
    const formData = new FormData(FormularioClientes)
    formData.append('tipo', 1);
    formData.delete('cli_codigo')

    const config = {
        method: 'POST',
        body : formData

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

FormularioClientes.addEventListener('submit', GuardarClientes)

BtnBuscar.addEventListener('click', ObtenerClientes)
