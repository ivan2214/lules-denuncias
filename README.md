# Mi Aplicación Genial

¡Bienvenido a Mi Aplicación Genial! Esta es una aplicación increíble que hace cosas geniales.

## Requisitos Previos

Antes de comenzar, asegúrate de tener Docker y Docker Compose instalados en tu sistema. Puedes encontrar instrucciones sobre cómo instalarlos en [docker.com](https://www.docker.com/get-started).

## Levantar la Aplicación

Para levantar la aplicación, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone git@github.com:ivan2214/lules-denuncias.git
    ```

2. Navega hasta el directorio de la aplicación:

    ```bash
    cd lules-denuncias
    ```

3. Ejecuta el comando Docker Compose para levantar la aplicación:

    ```bash
    docker-compose up
    ```

Esto iniciará los contenedores necesarios y levantará la aplicación. Una vez que veas que la aplicación está funcionando, puedes acceder a ella desde tu navegador web visitando `http://localhost:puerto` (donde `puerto` es el puerto configurado en el archivo `docker-compose.yml`).

## Detener la Aplicación

Para detener la aplicación y apagar los contenedores, simplemente presiona `Ctrl + C` en la terminal donde se está ejecutando Docker Compose. Luego puedes limpiar los contenedores detenidos con el siguiente comando:

```bash
docker-compose down
```