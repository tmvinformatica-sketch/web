<?php
// Asegúrate de que la ruta al autoload de Dompdf es correcta
require_once 'dompdf/autoload.inc.php'; // Ajusta esta ruta si es necesario

use Dompdf\Dompdf;
use Dompdf\Options;

// 1. Configurar las opciones de Dompdf
$options = new Options();
$options->set('defaultFont', 'Arial'); // Establece una fuente por defecto
$options->set('isHtml5ParserEnabled', true); // Habilita el parser HTML5
// Otras opciones: set('isRemoteEnabled', true) para cargar imágenes externas

$dompdf = new Dompdf($options);

// 2. Definir el contenido HTML
// Aquí es donde incrustarías los datos de tu factura
$datos_factura = [
    'numero' => '2025-001A',
    'cliente' => 'Ejemplo S.L.',
    'fecha' => date('d/m/Y'),
    'total' => '150.00 €'
];

$html = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Factura ' . $datos_factura['numero'] . '</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #333; }
        .factura-info { margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; text-align: right; }
    </style>
</head>
<body>
    <h1>FACTURA - ' . $datos_factura['numero'] . '</h1>
    
    <div class="factura-info">
        <p><strong>Cliente:</strong> ' . $datos_factura['cliente'] . '</p>
        <p><strong>Fecha:</strong> ' . $datos_factura['fecha'] . '</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Servicio de Desarrollo Web</td>
                <td>1</td>
                <td>150.00 €</td>
                <td>150.00 €</td>
            </tr>
            </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="total">Total a Pagar:</td>
                <td class="total">' . $datos_factura['total'] . '</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>';

$dompdf->loadHtml($html);

// 3. (Opcional) Configurar el tamaño y orientación del papel
$dompdf->setPaper('A4', 'portrait');

// 4. Renderizar el HTML a PDF
$dompdf->render();

// 5. Definir la ruta de guardado
$nombre_archivo = 'factura_' . $datos_factura['numero'] . '.pdf';
// __DIR__ es el directorio del script actual. Ajusta 'Facturas/' a tu ruta real.
// Asegúrate de que la carpeta 'Facturas/' existe y tiene permisos de escritura (generalmente 755 o 777).
$ruta_guardado = __DIR__ . '/Facturas/' . $nombre_archivo; 

// 6. Guardar el archivo PDF en la carpeta
file_put_contents($ruta_guardado, $dompdf->output());

echo "La factura ha sido generada y guardada en: " . $ruta_guardado;

// Si también quieres forzar la descarga en el navegador (opcional):
// $dompdf->stream($nombre_archivo, ["Attachment" => true]);

?>
