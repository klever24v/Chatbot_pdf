

   

   
  

   

 

 

Manuales de Usuario 

Aplicaciones del Sistema de gestión de pedidos de Logística Blaniza 
 

 

 

 
 
 
 
 

TFG Desarrollo de Aplicaciones Móviles Multiplataforma 
José Luis Rubio Leira   

2 
 

  Índice 

I - MANUAL APLICACIÓN DE DESCARGA DE PEDIDOS ............................................................................. 3 

1.- CONEXIÓN VPN ...................................................................................................................................... 3 
2.- INSTALACIÓN Y EJECUCIÓN DE LA APLICACIÓN ................................................................................................. 3 
3.- FUNCIONAMIENTO DE LA APLICACIÓN ........................................................................................................... 3 
4.- INICIO DE LA SESIÓN DE DESCARGA DE ARCHIVOS ............................................................................................ 4 
5.- FINALIZACIÓN DE LA SESIÓN DE DESCARGA DE ARCHIVOS .................................................................................. 6 
6.- DESCRIPCIÓN DE POSIBLES ERRORES ............................................................................................................. 7 

II - MANUAL APLICACIÓN WEB GESTIÓN DE PEDIDOS ............................................................................ 8 

1.- INSTALACIÓN DE LA APLICACIÓN .................................................................................................................. 8 
2.- INICIO DE SESIÓN ...................................................................................................................................... 8 
3.- GESTIÓN DE LOS PEDIDOS .......................................................................................................................... 9 
3.1.- Modificación del estado de un pedido ....................................................................................... 11 
3.1.- Consultar pedidos de otras fechas ............................................................................................. 11 
4.- OPCIONES DE ADMINISTRACIÓN ................................................................................................................ 12 
4.1.- Informe de pedidos .................................................................................................................... 13 
4.2.- Cuadro de facturación ............................................................................................................... 14 
4.2.- Mantenimiento de usuarios ....................................................................................................... 15 

III - MANUAL APLICACIÓN MÓVIL ANDROID ........................................................................................ 18 

1.- INSTALACIÓN DE LA APLICACIÓN ................................................................................................................ 18 
2.- INICIO DE SESIÓN .................................................................................................................................... 19 
3.- GESTIÓN DE PEDIDOS .............................................................................................................................. 20 
4.- OPCIONES DE ADMINISTRACIÓN ................................................................................................................ 22 

   
 3 
 

 

I - Manual Aplicación de descarga de pedidos 

 
El presente manual proporciona instrucciones para utilizar la aplicación de descarga de 
pedidos de los servidores de Eroski. Esta aplicación, desarrollada en Node.js, descarga y 
procesa los pedidos pendientes de los servidores de Eroski, y los almacena en una base de 
datos MongoDB desplegada en un servidor en la nube.  

1.- Conexión VPN 
 
La aplicación necesita una conexión VPN para comunicarse con el servidor de Eroski de manera 
segura. Es importante asegurarse de que la conexión VPN está correctamente configurada y 
funcionando antes de iniciar la aplicación. Actualmente, Eroski recomienda el uso del cliente 
VPN GlobalPortect. Los detalles específicos sobre cómo configurar la conexión VPN los 
proporciona el departamento técnico de Eroski. 

 
2.- Instalación y ejecución de la aplicación 
 
Los pasos para poder ejecutar la aplicación son los siguientes: 

1.  Instalación de Node.js y NPM: Es necesario tener instalado Node.js y el administrador 
de paquetes NPM. Si no están instalados, se pueden descargar desde el sitio web 
oficial de Node.js (https://nodejs.org/es/download). Con la instalación de Node.js 
viene ya incluido el gestor de paquetes NPM, por lo que no es necesario instalarlo por 
separado. 
2.  Descomprimir los ficheros de la aplicación blanizanode en una carpeta  
3.  Mediante una ventana de intérprete de comandos, acceder a la carpeta de la 
aplicación 
4.  Como ya se han incluido en el paquete todas las dependencias no es necesario 
ejecutar npm install para descargarlas. 
5.  Ejecutar la aplicación escribiendo en la ventana de intérprete de comandos:  node 
index.js 
6.  También es posible ejecutar la aplicación haciendo doble click en el fichero 
DescargaPedidos.bat incluido en los archivos de la aplicación. 
 

3.- Funcionamiento de la aplicación 
 
Al ejecutar la aplicación, esta iniciará el servidor express con el que funciona Node. Dicho 
servidor permanece a la escucha en el puerto 3000. Veremos los siguientes mensajes en la 
ventana de intérprete de comandos: 
 4 
 
  

La aplicación en ese momento está lista para iniciar la sesión de descarga de pedidos. 

 
4.- Inicio de la sesión de descarga de archivos 
 
Para comenzar la sesión de descarga de archivos, use la ruta /start. Esta acción establecerá un 
intervalo (por defecto cada 60 segundos) durante el cual la aplicación comprobará si existen 
nuevos archivos en el servidor de Eroski, los descargará, procesará y almacenará los datos de 
los pedidos en la base de datos. 

Por ejemplo, se puede comenzar la sesión de descarga de archivos visitando la dirección 
http://localhost:3000/start en su navegador web, donde "localhost" es la dirección de su 
servidor y "3000" es el puerto en el que se está ejecutando la aplicación. 

En ese momento el proceso iniciará y se verá lo siguiente 
  

5 
 

La aplicación utiliza dos carpetas en el servidor FTP de Eroski: /datos/in y /datos/out. 

  Carpeta /in: Esta es la carpeta donde la aplicación busca nuevos archivos de pedido para 
procesar. Cuando hay un nuevo pedido, Eroski coloca un archivo correspondiente en 
esta carpeta. La aplicación descarga estos archivos, los procesa y luego los elimina de la 
carpeta /in. 
  Carpeta /out: Después de que la aplicación ha procesado un archivo de pedido y lo ha 
cargado en la base de datos, copia el archivo a la carpeta /out en el servidor FTP. Esto 
sirve como un registro de los archivos que han sido procesados. Si hay un problema con 
la aplicación, estos archivos pueden ser útiles para depuración y recuperación de datos. 

Es importante asegurarse de que estas carpetas existen en el servidor FTP y de que la aplicación 
tiene los permisos adecuados para leer, escribir y eliminar archivos en estas carpetas. Si hay un 
problema con las carpetas /in y /out, es posible que la aplicación no funcione correctamente. 

Durante  la  ejecución  de  la  sesión,  en  cada  ciclo  de  60  segundos,  la  aplicación  intentará 
establecer una conexión con el servidor de  Eroski, descargar cualquier archivo nuevo que  se 
encuentre  en  la  carpeta  remota  de  entrada  del    servidor  FTP,  leer  y  cargar  el  contenido  del 
archivo en la base de datos MongoDB, y luego mover el archivo a la carpeta /out del servidor 
remoto. La aplicación eliminará cualquier archivo que haya descargado localmente después de 
procesarlo y moverlo a la carpeta de salida del  servidor remoto.  

Para cada uno de los procesos descritos se mostrará un mensaje en la ventana de la aplicación: 

 

Si ocurre algún error durante el procesamiento de un archivo, la aplicación registrará el error y 
pasará al siguiente archivo. Si la aplicación no puede conectar con el servidor de Eroski o si hay 
un problema grave, la aplicación detendrá la sesión. 

   
 6 
 

 

5.- Finalización de la sesión de descarga de archivos 
 
Para finalizar la sesión de descarga de archivos, use la ruta /stop. Esta acción detendrá el 
intervalo de comprobación de archivos nuevos y la descarga y procesado de estos. 

Por ejemplo, puede finalizar la sesión de descarga de archivos visitando la dirección 
http://localhost:3000/stop en su navegador web, donde "localhost" es la dirección de su 
servidor y "3000" es el puerto en el que se está ejecutando la aplicación. 
  

 

   
 7 
 

6.- Descripción de posibles errores 
 
1.  No se puede conectar al servidor de Eroski: Este error puede ocurrir si la dirección del 
servidor FTP, el puerto, el nombre de usuario o las contraseñas son incorrectos. 
También puede ocurrir si la VPN o el servidor de Eroski está caído o no está accesible.  
 
2.  Error al descargar el archivo: Este error puede ocurrir si hay un problema con la 
conexión de red durante la descarga del archivo, si el archivo no existe en el servidor 
de Eroski, o si hay un problema con los permisos del archivo en el servidor. 
 
3.  Error al leer el archivo local: Este error puede ocurrir si hay un problema con el 
sistema de archivos local, si el archivo ha sido eliminado o modificado después de la 
descarga, o si hay un problema con los permisos del archivo. 
 
4.  Error al cargar el archivo en la base de datos: Este error puede ocurrir si hay un 
problema con la conexión a la base de datos. 
 
5.  Error al mover el archivo a la carpeta /out: Este error puede ocurrir si hay un 
problema con la conexión de red o la VPN durante la transferencia del archivo, si la 
carpeta /out no existe, o si hay un problema con los permisos de la carpeta. 
 
6.  Error al eliminar el archivo local: Este error puede ocurrir si hay un problema con el 
sistema de archivos local o si hay un problema con los permisos del archivo. 
 
7.  El centro no existe: Este error puede ocurrir si el código de centro (tienda)  
proporcionado en el archivo no existe en la base de datos. 
 
8.  El pedido ya existe: Este error puede ocurrir si el nombre del archivo ya existe en la 
base de datos, lo que indica que el pedido ya ha sido procesado. 
 
9.  Error de validación del pedido: Este error puede ocurrir si los datos en el archivo no 
cumplen con las reglas de validación de pedidos (pedidos con valores vacios, etc.). 

   
 8 
 

II - Manual Aplicación web gestión de pedidos 

 
El presente manual de usuario proporciona instrucciones para utilizar la aplicación de gestión 
de pedidos. Esta aplicación, desarrollada en lenguaje PHP mediante framework Laravel, 
explota la información almacenada en la base de datos MongoDB cargada previamente por la 
aplicación de descarga automática de pedidos. La aplicación proporciona funcionalidades de 
gestión de pedidos (Consulta de pedidos pendientes, modificación de estados, etc.), obtención 
de informes y estadísticas, así como cuadros de facturación mensual. También permite la 
gestión de los usuarios de la aplicación, registrando las nuevas altas, así como las bajas de los 
usuarios que dejan la empresa. 

 
1.- Instalación de la aplicación 
Los pasos para poder instalar la aplicación en un servidor son los siguientes: 

1.  Es necesario tener instalado PHP y Composer ( La aplicación se ha instalado con la 
versión 8 de PHP que se puede obtener del sitio oficial http://php.net o también 
descargando una versión de XAMPP que ya lo incluya. Composer se puede descargar 
de https://getcomposer.org/) 
2.  Extraer los ficheros con el código fuente en una carpeta  
3.  Ejecutar el comando “php artisan serve” para ejecutar el propio servidor de desarrollo 
que incorpora laravel.  
4.  Otra opción es copiarlo en la carpeta htdocs de un servidor como XAMPP y servirlo 
desde allí.  

 

2.- Inicio de sesión 
Al entrar por primera vez en la aplicación (introduciendo la URL del servidor donde esté 
alojada en la barra de direcciones del navegador), se nos pedirá iniciar sesión en la aplicación. 
Para ello se introducirá el nombre de usuario y la contraseña en los campos proporcionados y 
se pulsará el botón “Login”. Si los valores son válidos se mostrará la ventana de pedidos. 
  
9 
 

3.- Gestión de los pedidos 
Tras iniciar sesión se mostrará en un objeto de tipo acordeón el listado de todas las tiendas 
que tienen pedidos cargados en el día actual. A la derecha del nombre de cada tienda, en rojo, 
tendremos un indicador de pedidos entregados sobre el total de pedidos para dicha tienda. Se 
podrá acceder directamente a esta pantalla o recargarla en cualquier momento pulsando el 
logotipo de la aplicación con el texto BLANIZA. La pantalla mostrada será la siguiente: 
  

A medida que se vayan entregando pedidos, cuando todos los pedidos pendientes de una 
tienda estén entregados, se nos mostrará el nombre de dicha tienda en color verde. 

10 
 
  

Al pulsar en el registro de una tienda, se desplegará el acordeón y se verán los pedidos que se 
han recibido en ese día para esa tienda. Siempre aparecerán en la parte superior los pedidos 
pendientes de entrega, quedando en la parte inferior los pedidos que hayan pasado a estado 
“Entregado”. 
  

 
 11 
 

3.1.- Modificación del estado de un pedido 
Para modificar el estado de un pedido de “Pendiente” a “Entregado” o viceversa, se pulsará en 
el btón correspondiente dentro del pedido. Al hacerlo se mostrará un mensaje: “¿Está seguro 
de cambiar el estado de pedido a XXXXX?”,  que solicitará la confirmación para realizar la 
modificación del estado: 
  

3.1.- Consultar pedidos de otras fechas 
 
 Para consultar los pedidos de otras fechas, tanto pasadas como futuras, es posible utilizar el 
selectro de fechas que se encuentra en la parte superior de la pantalla. Para ello, se 
seleccionará la fecha deseada y se pulsará el botón “Ver”, 
  

 
 Una vez hecho esto, aparecerán los pedidos correspondientes a la fecha indicada. 
Normalmente todos los pedidos de fechas pasadas aparecerán en verde por estar todos 
entregados como se puede ver en la siguiente imagen: 

12 
 
  

  Si se desea volver a ver los pedidos del día actual se podrá hacer simplemente haciendo click en 
el logotipo de la aplicación. 

4.- Opciones de administración 
En el caso de que se inicie sesión en la aplicación con un usuario del perfil ‘GESTIÓN’, se 
mostrará en la parte izquierda de la cabecera de la pantalla un botón verde con el texto 
‘Administración’. Este botón da acceso a las opciones específicas del perfil ‘GESTIÓN’. 
 
  

Estas opciones son las siguientes: 

  Todos los pedidos: Informe de datos de pedidos entre pudiendo establecer filtros por 
rango de fechas y por tienda. 
  Cuadro de facturación: Esta opción permitirá generar un cuadro con el desglose de los 
pedidos de cada tienda en un periodo determinado, que por defecto será mensual. 
Esta será la información que se entregue con la facturación que se le haga a Eroski. 
  Mantenimiento de usuarios: Desde esta opción se podrán dar de alta y de baja 
usuarios en el sistema. 
 
 13 
 

4.1.- Informe de pedidos 
Mediante la opción “Todos los pedidos” del menú de administración, accederemos a la 
siguiente consulta, donde se nos mostrará de forma paginada una consulta con todos los 
pedidos que existan en el sistema: 

 
  

 
 Mediante las opciones de filtrado de la cabecera se podrá limitar la consulta entre un rango de 
fechas, en cuyo caso, aparecerán los datos de los pedidos en ese rango de fechas, agrupados 
por tienda.  
 14 
 
  

También se podrá acotar el ámbito del informe para obtener los datos de una tienda 
determinada, de forma que se mostrarán los pedidos en esa tienda en el rango de fechas 
seleccionado: 
  

 
 4.2.- Cuadro de facturación 
 
 Esta opción permitirá generar un cuadro con el desglose de los pedidos de cada tienda en un 
periodo determinado, que por defecto será mensual. Esta será la información que se entregue 
15 
 

con la facturación que se le haga a Eroski. Cuando se acceda a la opción, se mostrarán los 
selectores de fecha para acotar la información del cuadro al rango que interese.  Al seleccionar 
la fecha inicial, automáticamente se pondrá la fecha final un més más tarde de la fecha inicial, 
pudiendo este valor ser cambiado manualmente. 

 
  

Una vez seleccionado el rango de fechas deseado, al pulsar el botón ‘Ver’ obtendremos el 
cuado de facturación correspondiente donde veremos por cada día y tienda el número de 
pedidos entregados, obteniendo totalizadores por día y por tienda en el periodo: 
  

Se podrá exportar los datos del cuadro de facturación a una hoja Excel pulsando el botón de la 
cabecera ‘Exportar a Excel’. Al hacerlo se descargará un fichero con el nombre cuadro.xlsx con 
los datos. 

 
 4.2.- Mantenimiento de usuarios 
Accediendo a esta opción veremos un listado con los datos de los usuarios disponibles en el 
sistema. En este listado aparecerá el nombre del usuario, el email que hará las veces de código 

16 
 

de usuario, el perfil que será REPARTIDOR o ADMINISTRADOR (perfil gestión) y la fecha de alta 
de dicho usuario 

Se podrá eliminar un usuario determinado, pulsando el botón ‘Eliminar Usuario’ y confirmando 
la acción posteriormente. 
  

Para registrar un nuevo usuario, pulsaremos el botón verde de la cabecera que dice ‘Añadir 
Nuevo Usuario’. Al hacerlo, se mostrará la ventana de registro de nuevos usuarios:  
  

17 
 

Para dar de alta el nuevo usuario, se rellenarán los datos  incluyendo el perfil del usuario en la 
aplicación, y posteriormente se pulsará el bótón ‘Registrar’. Si los datos son correctos, se 
mostrará un mensaje de éxito del registro. Si existe algún problema se mostrará igualmente 
con un mensaje. Para volver al mantenimiento de pedidos se pulsará sobre el enlace que dice 
’Volver a listado de usuarios’.  

 

 
  

   
 18 
 

III - Manual Aplicación móvil Android 

 
1.- Instalación de la aplicación 
 

Para instalar la aplicación, habrá que copiar en un dispositivo Android el fichero Blaniza.apk y 
ejecutarlo. El dispositivo deberá tener activada la opción de instalación de aplicaciones desde 
orígenes desconocidos. Transconfirmar que se desea instalar la aplicación, aparecerá un icono 
en el escritorio o en el cajón de aplicaciones dependiendo del dispositivo. 

 

 
 
              

 

 

Para ejecutar la aplicación simplemente haremos click en el icono rosa con una B blanca con el 
título “Blaniza Pedidos”. 

 

 
 19 
 

2.- Inicio de sesión 
 
Tras ejecutar la aplicación se nos pedirá que iniciemos sesión si no lo hemos hecho antes. Para 
ello veremos la siguiente pantalla en la que se dispone de dos cajas de texto para introducir el 
usuario y la contraseña del usuario: 
  
  

Tras rellenar los datos y pulsar el botón ‘Login’, si los datos son correctos accederemos a la 
ventana principal de gestión de pedidos. Si existe algún error, se mostrará un mensaje 
indicándolo. Para que el uso de la aplicación sea lo más eficiente posible, El tiempo de 
duración de sesión está establecido en un valor lo suficientemente amplio para que solo sea 
necesario el iniciar sesión una vez cada día. 

 

   
 20 
 

3.- Gestión de pedidos 
 

Tras iniciar sesión con éxito, accederemos a la pantalla de gestión de pedidos. En dicha 
pantalla veremos un listado de las tiendas en las que se nos indicará mediante dos valores 
entre corchetes en texto rojo, el número de pedidos que están pendientes sobre el total de 
pedidos de la tienda. En el caso de que todos los pedidos de una tienda hayan sido entregados, 
el nombre de la tienda se mostrará en color verde como se puede observar en la siguiente 
imagen: 
  

 

Cada usuario puede tener asignadas unas tiendas concretas, pero en un momento dado, 
puede necesitar conocer los datos de cualquiera de las otras tiendas por tener que ayudar por 
motivos de demanda. El orden de aparición de las tiendas en el listado será el siguiente: 
Primero aparecerán las tiendas que el usuario tiene asignadas, y posteriormente el resto de 
tiendas ordenadas por código de tienda. De esta manera, cada repartidor siempre tendrá en la 
parte superior del listado las tiendas en las que está asignado. 
 

 

 
 21 
 

 

Para desplegar los pedidos del día de una de las tiendas, se pulsará el nombre de la tienda 
correspondiente. Esto desplegará en un objeto de tipo acordeón, los pedidos correspondientes 
a la tienda seleccionada. Los pedidos entregados figurarán en verde al final de la lista de 
pedidos, y en la parte superior se podrán ver los pedidos que están pendiente de entrega. 

Los primeros datos que se visualizarán del pedido serán las direcciones y las horas de entrega 
de los pedidos. No obstante, desplazando a la derecha la lista de pedidos tenemos todo el 
resto de datos, incluyendo el estado del pedido, los datos y el teléfono del cliente, el importe 
del pedido, etc. 

 

 

     
   

Como se puede ver en las capturas, pulsando en el botón de estado del pedido se podrá 
cambiar dicho estado de Pendiente a Entregado cuando un repartidor haya realizado una 
entrega. Al hacerlo, el pedido se pondrá en color verde y pasará a la parte inferior de la lista 
con el resto de pedidos Entregados. También se actualizarán los contadores de pedidos 
entregados sobre el total de pedidos. El objetivo es que todos los pedidos acaben estando en 
color verde. 
 22 
 
  

También será posible el ver los pedidos de una fecha pasada o futura. Es interesante el que se 
puedan ver pedidos de fechas futuras, ya que un cliente puede pedir que le entreguen un 
pedido en una fecha futura, de forma que por ejemplo se pueden ver los pedidos pendientes 
para por ejemplo, el día siguiente. Para ello, se utilizará el selector de fechas ubicado en la 
parte superior de la aplicación y se seleccionará la fecha cuyos pedidos se quieran consultar.  

 

Una vez seleccionada la fecha, y tras pulsar el botón ‘Ver’, se mostrarán los pedidos asociados 
a la fecha indicada.  

 
4.- Opciones de administración 
 
Aunque un usuario con perfil de gestión puede utilizar la aplicación móvil y acceder a las 
opciones de administración, esto no es lo recomendado ya que dichas opciones han sido 
diseñadas para ser utilizadas en un entorno de escritorio. Para acceder a dichas opciones se 
podrá acceder pulsando el icono del usuario situado en la parte superior derecha de la 
ventana.  
 
 23 
 

Para obtener indicaciones acerca de dichas opciones, se recomienda consultar el manual de 
usuario de la aplicación web de gestión de pedidos. 