function crearfacturas() {
  
    <meta charset="UTF-8">
    <title>Factura Dinámica</title>
    <style>
        /* --- ESTILOS BÁSICOS PARA EL FORMULARIO --- */
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        .contenedor-factura {
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 20px;
            color: #333;
        }
        .linea-formulario {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            align-items: center;
        }
        .campo {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        .campo label {
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"], input[type="date"], select, input[type="number"] {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box; /* Incluye padding y borde en el ancho total */
        }

        /* --- ESTILOS DE LA TABLA DE CONCEPTOS --- */
        #tablaConceptos {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        #tablaConceptos th, #tablaConceptos td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        #tablaConceptos th {
            background-color: #f2f2f2;
            font-size: 0.9em;
        }
        #tablaConceptos td input, #tablaConceptos td select {
            border: none;
            padding: 0;
            margin: 0;
        }
        .col-concepto { width: 35%; }
        .col-unidades, .col-precio, .col-total { width: 15%; }
        .col-iva { width: 10%; }
        .btn-accion {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .btn-accion:hover { background-color: #45a049; }
        
        /* --- ESTILOS DE TOTALES Y BOTONES FINALES --- */
        .totales-factura {
            margin-top: 25px;
            display: flex;
            justify-content: flex-end; /* Alinea los totales a la derecha */
        }
        .totales-tabla {
            width: 300px;
        }
        .totales-tabla td {
            padding: 5px 0;
            border-bottom: 1px dashed #ddd;
        }
        .totales-tabla .resultado {
            font-weight: bold;
            text-align: right;
            color: #000;
        }
        .total-final {
            font-size: 1.2em;
            color: #d9534f;
        }
        .controles-finales {
            margin-top: 30px;
            text-align: center;
        }
        .controles-finales button {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        .btn-guardar { background-color: #007bff; color: white; }
        .btn-imprimir { background-color: #17a2b8; color: white; }
        .btn-pdf { background-color: #dc3545; color: white; }
        .btn-salir { background-color: #6c757d; color: white; }
    </style>
</head>
<body>

<div class="contenedor-factura">
    <h2>Datos del Cliente y Factura</h2>
    
    <form id="formularioFactura">
        <div class="linea-formulario">
            <div class="campo" style="flex-basis: 60%;">
                <label for="nombreCliente">Cliente:</label>
                <input type="text" id="nombreCliente" name="nombreCliente" required>
            </div>
            <div class="campo" style="flex-basis: 40%;">
                <label for="cif">CIF/NIF:</label>
                <input type="text" id="cif" name="cif" required>
            </div>
        </div>

        <div class="linea-formulario">
            <div class="campo" style="flex-basis: 35%;">
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" required>
            </div>
            <div class="campo" style="flex-basis: 15%;">
                <label for="cp">C.P.:</label>
                <input type="text" id="cp" name="cp" required>
            </div>
            <div class="campo" style="flex-basis: 25%;">
                <label for="poblacion">Población:</label>
                <input type="text" id="poblacion" name="poblacion" required>
            </div>
            <div class="campo" style="flex-basis: 25%;">
                <label for="provincia">Provincia:</label>
                <input type="text" id="provincia" name="provincia" required>
            </div>
        </div>
        
        <div class="linea-formulario">
            <div class="campo" style="flex-basis: 33%;">
                <label for="fechaFactura">Fecha de Factura:</label>
                <input type="date" id="fechaFactura" name="fechaFactura" required> 
            </div>
            <div class="campo" style="flex-basis: 33%;">
                <label for="numFactura">Nº Factura:</label>
                <input type="text" id="numFactura" name="numFactura" value="2025/0001" readonly>
            </div>
            <div class="campo" style="flex-basis: 33%;">
                <label for="estadoPago">Estado de Pago:</label>
                <select id="estadoPago" name="estadoPago" required>
                    <option value="pendiente" selected>Pendiente</option>
                    <option value="pagado">Pagado</option>
                    <option value="parcial">Pagado Parcial</option>
                </select>
            </div>
        </div>
        
        <h2>Detalle de Conceptos</h2>

        <table id="tablaConceptos">
            <thead>
                <tr>
                    <th class="col-concepto">Concepto</th>
                    <th class="col-unidades">Unidades</th>
                    <th class="col-precio">Precio Unidad (€)</th>
                    <th class="col-iva">IVA (%)</th>
                    <th class="col-total">Total (€)</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody id="cuerpoTablaConceptos">
                </tbody>
        </table>
        
        <button type="button" class="btn-accion" onclick="agregarLineaConcepto()">+ Añadir Concepto</button>

        <div class="totales-factura">
            <table class="totales-tabla">
                <tr>
                    <td>Base Imponible:</td>
                    <td class="resultado" id="baseImponible">0.00</td>
                </tr>
                <tr>
                    <td>Cantidad Total IVA:</td>
                    <td class="resultado" id="cantidadIVA">0.00</td>
                </tr>
                <tr class="total-final">
                    <td>Total Factura:</td>
                    <td class="resultado" id="totalFactura">0.00</td>
                </tr>
            </table>
        </div>

        <div class="controles-finales">
            <button type="button" class="btn-guardar" onclick="guardarFactura()">Guardar</button>
            <button type="button" class="btn-imprimir" onclick="imprimirFactura()">Imprimir</button>
            <button type="button" class="btn-pdf" onclick="generarPDF()">Generar PDF</button>
            <button type="button" class="btn-salir" onclick="salirMenu()">Salir (Menú Principal)</button>
        </div>

    </form>
</div>

<script>
    // --- LÓGICA DE FECHA Y CÁLCULO DE LA FACTURA (JavaScript) ---

    // 1. Rellenar Fecha Actual
    function rellenarFechaActual() {
        const inputFecha = document.getElementById('fechaFactura');
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        inputFecha.value = `${anio}-${mes}-${dia}`;
    }

    // 2. Agregar Líneas de Concepto Dinámicamente
    let idLinea = 0;
    function agregarLineaConcepto() {
        const tabla = document.getElementById('cuerpoTablaConceptos');
        const newRow = tabla.insertRow();
        newRow.id = `linea-${idLinea}`;
        
        newRow.innerHTML = `
            <td class="col-concepto">
                <input type="text" name="concepto" required>
            </td>
            <td class="col-unidades">
                <input type="number" name="unidades" value="1" min="1" oninput="calcularTotalLinea(${idLinea})" required>
            </td>
            <td class="col-precio">
                <input type="number" name="precio" value="0.00" min="0" step="0.01" oninput="calcularTotalLinea(${idLinea})" required>
            </td>
            <td class="col-iva">
                <select name="iva" onchange="calcularTotalLinea(${idLinea})">
                    <option value="21">21</option>
                    <option value="10">10</option>
                    <option value="4">4</option>
                    <option value="1">1</option>
                    <option value="0">0</option>
                </select>
            </td>
            <td class="col-total">
                <input type="text" name="totalLinea" value="0.00" readonly> 
                <input type="hidden" name="ivaLineaValor" value="0.00"> 
            </td>
            <td>
                <button type="button" onclick="eliminarLineaConcepto(${idLinea})">X</button>
            </td>
        `;
        
        idLinea++;
        calcularTotalesFactura(); // Recalcular después de añadir una nueva línea
    }
    
    // 3. Eliminar Líneas de Concepto
    function eliminarLineaConcepto(id) {
        const fila = document.getElementById(`linea-${id}`);
        if (fila) {
            fila.remove();
            calcularTotalesFactura(); // Recalcular después de eliminar
        }
    }

    // 4. Calcular el Total de una sola Línea
    function calcularTotalLinea(id) {
        const fila = document.getElementById(`linea-${id}`);
        if (!fila) return;

        // Obtener los valores de los inputs
        const unidades = parseFloat(fila.querySelector('input[name="unidades"]').value) || 0;
        const precio = parseFloat(fila.querySelector('input[name="precio"]').value) || 0;
        const ivaPorcentaje = parseFloat(fila.querySelector('select[name="iva"]').value) || 0;
        
        // Multiplicación de unidades * precio unidad
        const totalSinIVA = unidades * precio;
        
        // Calcular la cantidad de IVA
        const cantidadIVA = totalSinIVA * (ivaPorcentaje / 100);
        
        // Total final de la línea (Base Imponible + IVA)
        const totalConIVA = totalSinIVA + cantidadIVA;

        // Actualizar el campo Total de la línea
        fila.querySelector('input[name="totalLinea"]').value = totalConIVA.toFixed(2);

        // Almacenar el valor de IVA para el cálculo total de la factura
        fila.querySelector('input[name="ivaLineaValor"]').value = cantidadIVA.toFixed(2);
        
        // Llamar al cálculo de totales de la factura
        calcularTotalesFactura();
    }

    // 5. Calcular los Totales Finales de la Factura
    function calcularTotalesFactura() {
        let baseImponibleTotal = 0;
        let ivaTotal = 0;
        
        const filas = document.getElementById('cuerpoTablaConceptos').rows;
        
        for (let i = 0; i < filas.length; i++) {
            const fila = filas[i];
            
            // Obtener los valores de la fila
            const unidades = parseFloat(fila.querySelector('input[name="unidades"]').value) || 0;
            const precio = parseFloat(fila.querySelector('input[name="precio"]').value) || 0;
            const cantidadIVA = parseFloat(fila.querySelector('input[name="ivaLineaValor"]').value) || 0;

            // Sumar a la base imponible total
            const totalSinIVA = unidades * precio;
            baseImponibleTotal += totalSinIVA;
            
            // Sumar a la cantidad total de IVA
            ivaTotal += cantidadIVA;
        }

        const totalFacturaFinal = baseImponibleTotal + ivaTotal;

        // Actualizar los campos de la sección de Totales
        document.getElementById('baseImponible').textContent = baseImponibleTotal.toFixed(2);
        document.getElementById('cantidadIVA').textContent = ivaTotal.toFixed(2);
        document.getElementById('totalFactura').textContent = totalFacturaFinal.toFixed(2);
    }

    // 6. Funciones de Botones (Solo de ejemplo, la funcionalidad real requiere backend o librerías)
    function guardarFactura() {
        alert("Función 'Guardar' ejecutada. Los datos se enviarían a un servidor.");
        // Aquí iría el código para enviar los datos del formulario (AJAX/Fetch)
    }

    function imprimirFactura() {
        // Abre el diálogo de impresión del navegador
        window.print(); 
    }

    function generarPDF() {
        alert("Función 'Generar PDF' ejecutada. Esto requiere librerías como jsPDF o un servicio de backend.");
        // Aquí iría el código para generar el PDF (ej. usando jsPDF)
    }

    function salirMenu() {
        alert("Función 'Salir' ejecutada. Navegando al menú principal...");
        // Ejemplo de redirección: window.location.href = '/menu-principal.html';
    }

    // 7. Inicialización: Rellenar fecha y añadir la primera línea al cargar
    document.addEventListener('DOMContentLoaded', () => {
        rellenarFechaActual();
        agregarLineaConcepto(); // Añadir una primera línea por defecto
    });
  }

function tomas() {
  alert("¡La función desde script.js ha sido llamada con éxito!");
}
