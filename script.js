document.getElementById("titulo").innerText = "Texto cambiado con JS";
/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: DANIEL AUGUSTO ACOSTA QUINTERO
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

// Función de apoyo para dibujar un píxel individual
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color = "#000000")      
    {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        //Esto es para hacer la direccion de avance en cada eje 
        let sx = (x0 < x1) ? 1 : -1; 
        let sy = (y0 < y1) ? 1 : -1;
        //Con esto iniciamos el error, que es la diferencia entre dx y dy, esto nos ayudara a decidir cuando avanzar en y mientras avanzamos en x
        let err = dx - dy;

        while (true) {
            drawPixel(ctx, x0, y0, color); // Dibuja el píxel actual

            if (x0 === x1 && y0 === y1) break; // Si hemos llegado al punto final, terminamos

            let err2 = 2 * err; // Duplicamos el error para comparar
            if (err2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX, centerY - Centro
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
    // Desarrollo del estudiante (Uso de Math.sin/Math.cos y retorno de datos)
    let vertices = [];
    let angle = (2 * Math.PI) / sides;
    for (let i = 0; i < sides; i++) 
        {
        let x = centerX + radius * Math.cos(i * angle);
        let y = centerY + radius * Math.sin(i * angle);
        vertices.push({ x, y });
    }
    return vertices;
}

function drawCircle(cx, cy, r,  color = "#000000") 
{
    let x = r;  
    let y = 0;
    let err = 0;
    //para cada punto (x, y) calculamos los 8 puntos simétricos en el círculo y los dibujamos, luego actualizamos el error para decidir si avanzamos en y o retrocedemos en x
    // El algoritmo de Bresenham para círculos se basa en la simetría del círculo, lo que permite dibujar solo un octante y reflejar los puntos para completar el círculo.

    while (x >= y) {
        drawPixel(ctx, cx + x, cy + y, color);
        drawPixel(ctx, cx + y, cy + x, color);
        drawPixel(ctx, cx - y, cy + x, color);
        drawPixel(ctx, cx - x, cy + y, color);
        drawPixel(ctx, cx - x, cy - y, color);
        drawPixel(ctx, cx - y, cy - x, color);
        drawPixel(ctx, cx + y, cy - x, color);
        drawPixel(ctx, cx + x, cy - y, color);

        if (err <= 0) {
            y += 1;
            err += 2 * y + 1;
        } else {
            x -= 1;
            err -= 2 * x + 1;
        }
    }
}
function drawScene() 
{
   const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const R = 150;
    const sides = Math.floor(Math.random() * 6) + 5;
    const vertices = getPolygonVertices(centerX, centerY, sides, R);

    // Dibujar polígono
    for (let i = 0; i < sides; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % sides];
        bresenhamLine(v1.x, v1.y, v2.x, v2.y);
    }

    // Dibujar círculos
    for (let v of vertices) {
        drawCircle(v.x, v.y, R / 4);
    }
 
}
