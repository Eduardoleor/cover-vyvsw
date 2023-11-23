const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Documento de Plantilla</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: block;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
        }
        .header img {
            width: 80px;
        }
        .title {
            text-align: center;
            margin: 20px 0;
        }
        .title h1 {
            margin: 5px;
        }
        .content, .footer {
            text-align: center;
            margin: 20px 0;
        }
        .content div, .footer div {
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="logo1.png" alt="Logo Izquierda">
        <img src="logo2.png" alt="Logo Derecha">
    </div>

    <div class="title">
        <h1>UANL</h1>
        <h1>FIME</h1>
    </div>

    <div class="content">
        <div>MATERIA</div>
        <div>PROFESOR</div>
        <div>HORA</div>
    </div>

    <div class="footer">
        <div id="fechaActual">FECHA: </div>
        <div>SEMESTRE: ENERO - JUNIO 2023</div>
    </div>

    <script>
        function formatearFecha(fecha) {
            const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
            return fecha.toLocaleDateString('es-ES', opciones);
        }

        document.addEventListener('DOMContentLoaded', function() {
            const fechaElemento = document.getElementById('fechaActual');
            const fechaHoy = new Date();
            fechaElemento.textContent += formatearFecha(fechaHoy);
        });
    </script>
</body>
</html>
`;

const createHtml = ({
  logoLeft,
  logoRight,
  title,
  subtitle,
  subject,
  teacher,
  hour,
  semester,
  location,
}: {
  logoLeft: string;
  logoRight: string;
  title: string;
  subtitle: string;
  subject: string;
  teacher: string;
  hour: string;
  semester: string;
  location: string;
}) => {
  return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Documento de Plantilla</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: block;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
            }
            .header img {
                width: 80px;
            }
            .title {
                text-align: center;
                margin: 120px 0;
            }
            .title h1 {
                margin: 5px;
            }
            .content, .footer {
                text-align: center;
                margin: 120px 0;
            }
            .content div, .footer div {
                margin: 25px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="${logoLeft}" alt="Logo Izquierda">
            <img src="${logoRight}" alt="Logo Derecha">
        </div>
    
        <div class="title">
            <h1>${title}</h1>
            <h1>${subtitle}</h1>
        </div>
    
        <div class="content">
            <div><b>MATERIA:</b> ${subject.toUpperCase()}</div>
            <div><b>PROFESOR:</b> ${teacher.toUpperCase()}</div>
            <div><b>HORA:</b> ${hour}</div>
        </div>
    
        <div class="footer">
            <div id="fechaActual"><b>FECHA:</b> </div>
            <div><b>SEMESTRE:</b> ${semester}</div>
            <div>${location}</div>
        </div>
    
        <script>
            function formatearFecha(fecha) {
                const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
                return fecha.toLocaleDateString('es-ES', opciones);
            }
    
            document.addEventListener('DOMContentLoaded', function() {
                const fechaElemento = document.getElementById('fechaActual');
                const fechaHoy = new Date();
                fechaElemento.textContent += formatearFecha(fechaHoy);
            });
        </script>
    </body>
    </html>`;
};

export { htmlContent, createHtml };
