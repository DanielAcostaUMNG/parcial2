document.getElementById("titulo").innerText = "Texto cambiado con JS";
/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: DANIEL AUGUSTO ACOSTA QUINTERO
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

// Función de apoyo para dibujar un píxel individual
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
    
}
