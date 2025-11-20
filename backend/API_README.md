# API Documentation - Parche Lector

## Swagger UI

Para explorar y probar los endpoints de la API, accede a la documentación interactiva de Swagger:

**URL:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## OpenAPI Docs (JSON)

Documentación en formato JSON disponible en:

**URL:** [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Endpoints Disponibles

### Base URL
```
http://localhost:8080
```

### Formato de Respuesta Estándar

Todas las respuestas de la API siguen el formato:

```json
{
  "status": "SUCCESS" | "ERROR",
  "message": "Mensaje descriptivo",
  "data": { ... }
}
```

## Cómo usar Swagger UI

1. Asegúrate de que la aplicación esté corriendo en el puerto 8080
2. Abre tu navegador y navega a: `http://localhost:8080/swagger-ui.html`
3. Explora los endpoints disponibles organizados por controladores
4. Haz clic en cualquier endpoint para ver sus detalles
5. Usa el botón "Try it out" para probar las peticiones directamente desde el navegador

## Notas

- La documentación se genera automáticamente a partir de las anotaciones en el código
- Todos los endpoints están documentados con ejemplos de request/response
- El manejo de errores está centralizado y devuelve códigos HTTP apropiados
