+++
title = "RAPID"
author = ["Javier Pacheco"]
description = "Breve Introduccion a RAPID, el lenguage de programacion de robots ABB."
date = 2025-12-23
publishDate = 2025-12-24
tags = ["robots", "programacion"]
draft = false
toc = true
+++

## ¿Qué es RAPID? {#qué-es-rapid}

RAPID es el lenguaje de programación utilizado por los robots industriales de **ABB**.
Está diseñado para el control de movimientos, manejo de entradas y salidas, y la integración con sistemas industriales como PLCs, HMIs y redes industriales.


## Características principales {#características-principales}

-   Lenguaje estructurado y tipado
-   Orientado a control de movimiento
-   Soporta programación modular
-   Manejo de interrupciones y tareas paralelas
-   Integración con E/S digitales y analógicas


## Estructura básica de un programa {#estructura-básica-de-un-programa}

Un programa en RAPID se organiza en **módulos**, los cuales contienen **procedimientos** y **funciones**.

```text
MODULE MainModule

    PROC main()
        TPWrite "Hola mundo desde RAPID";
    ENDPROC

ENDMODULE
```


## Tipos de datos comunes {#tipos-de-datos-comunes}

-   num: valores numéricos
-   bool: verdadero / falso
-   string: texto
-   robtarget: posición del robot
-   tooldata: herramienta
-   wobjdata: objeto de trabajo


## Uso típico en planta {#uso-típico-en-planta}

RAPID se utiliza para:

-   Programar trayectorias del robot
-   Controlar pinzas, válvulas y sensores
-   Sincronizar el robot con PLCs
-   Ejecutar secuencias automáticas y manuales


## Nota final {#nota-final}

RAPID es muy potente para automatización industrial y, combinado con una buena estructura de programa, permite sistemas robustos y mantenibles.

RAPID cuenta con muchos tipos de datos, de momento (2025-12-21 Sun) escribiré los mas comunes:

-   num: Datos numéricos, 1,2,3,4,90...etc. puede incluir números negativos.
-   string: Cadenas de texto, "Cadena de texto", tiene un limite de 80 caracteres.
-   bool: Variables Booleanas. `TRUE` o `FALSE`


## Declarando variables. {#declarando-variables-dot}


### VAR. {#var-dot}

La declaración de una variable es la forma de definir un nombre de variable y su contenido.
Las variables se declaran con la palabra clave `VAR`, siguiendo la siguiente sintaxis:

```text
! VAR datatype identifier;
! Las variables se pueden declarar y posteriormente se asigna un valor:

VAR num nPrpog;
VAR string nModel;
VAR bool cComplete;

nPrpog := 1;
nModel := "RB-123456";
cComplete := FALSE;

! Tambien se puede asignar al mismo tiempo que se declaran.

VAR num nPrpog := 1;
VAR string nModel := "RB-123456";
VAR bool cComplete := FALSE;
```

El tipo de dato `VAR` pierde su valor o regresa a su valor definido al inicio al correr de nuevo el programa `main`, es decir, no guarda en memoria el ultimo dato si es que se cambio en algún momento en la lógica.


### PERS. {#pers-dot}

Estos datos son igual que las variables, salvo que estos recuerdan el ultimo valor asignado. Su palabra asignada es `PERS`

```text
PERS num nPrpog := 1;

PROC main()
     nProg := 2;
ENDPROC
```

Al detener el robot y volver a arrancarlo, el modulo tendrá el siguiente aspecto:

```text
PERS num nPrpog := 2;

PROC main()
     nProg := 2;
ENDPROC
```


### CONST. {#const-dot}

El tipo de dato constante, palabra asignada `CONST`, como su nombre lo indica, sus valor es constante, y deberá ser declarado siempre al inicio del programa, el usar `CONST` asegura que los valores serán fijos siempre:

```text
CONST num nPrpog := 2;

PROC main()
    ! No podremos cambiar la variable despues de haberla declarado
    ! nProg := 2;
    TPWrite nProg;
    ! Esto debera mostrar en el Teach pendant: el numero 2 que hemos asignado a la constante.
ENDPROC
```


## Operadores Numéricos. {#operadores-numéricos-dot}

Estas operaciones se realizan con datos de tipo `num` y devuelven datos tipo `num`.

| Operador | Descripcion    | Ejemplo              |
|----------|----------------|----------------------|
| o+"      | Suma           | reg1:= reg2 + reg3;  |
| "-"      | Resta          | reg1:= reg3 - reg2;  |
| "\*"     | Multiplicacion | reg1:= reg2 \* reg3; |
| "/"      | Divicion       | reg3:= reg2 / reg1;  |


## Operadores Relacionales. {#operadores-relacionales-dot}

Estos  operadores devuelven datos de tipo `bool`. En el ejemplo usaremos estos datos de esta manera:

reg1 y reg2
: datos de tipo =num.

flag1
: dato tipo `bool`.

| Operador | Descripción       | Ejemplo                                                                 |
|----------|-------------------|-------------------------------------------------------------------------|
| =        | Igual que         | flag1 := reg1 = reg2;  flag1 es TRUE si reg1 es igual a reg2            |
| &lt;     | Menor que         | flag1 := reg1 &lt; reg2;  flag1 es TRUE si reg1 es menor que reg2       |
| &gt;     | Mayor que         | flag1 := reg1 &gt; reg2;  flag1 es TRUE si reg1 es mayor que reg2       |
| &lt;=    | Menor o igual que | flag1 := reg1 &lt;= reg2; flag1 es TRUE si reg1 es menor o igual a reg2 |
| &gt;=    | Mayor o igual que | flag1 := reg1 &gt;= reg2; flag1 es TRUE si reg1 es mayor o igual a reg2 |
| &lt;&gt; | Distinto que      | flag1 := reg1 &lt;&gt; reg2; flag1 es TRUE si reg1 es distinto de reg2  |


## Operadores de Cadena. {#operadores-de-cadena-dot}

| Operador | Descripción   | Ejemplo                                               |
|----------|---------------|-------------------------------------------------------|
| +        | Concatenación | VAR string firstname := "John";                       |
|          |               | VAR string lastname := "Smith";                       |
|          |               | VAR string fullname;                                  |
|          |               | fullname := firstname + " " + lastname;               |
|          |               | La variable fullname contendrá la cadena "John Smith" |


## Control del flujo de programa {#control-del-flujo-de-programa}


### Compact IF {#compact-if}

Se utiliza cuando sólo es necesario ejecutar una instrucción si se cumple una condición determinada.

```text
IF <condición> <instrucción>;
```

Ejemplo:

```text
IF reg1 > 5 Set do1;
```

Las señales `do1` se activará cuando `reg1` sea mayor a 5.


### IF (estructura completa) {#if--estructura-completa}

Se utiliza cuando es necesario ejecutar más de una instrucción diferente en función de si se cumple una condición.

```text
IF <condición> THEN
    <Instrucciones>;
ELSIF <condición> THEN
    <Instrucciones>;
ELSE
    <Instrucciones>;
ENDIF
```

Ejemplo sin ELSE:
Las señales `do1` y `do2` sólo se activan si `reg1` es mayor que 5.

```text
IF reg1 > 5 THEN
    Set do1;
    Set do2;
ENDIF
```

Ejemplo con ELSE:
Las señales `do1` y `do2` se activan o desactivan en función de si `reg1` es mayor que 5.

```text
IF reg1 > 5 THEN
    Set do1;
    Reset do2;
ELSE
    Reset do1;
    Set do2;
ENDIF
```


### TEST – en función del valor de una expresión {#test-en-función-del-valor-de-una-expresión}

El comando `TEST` se utiliza cuando es necesario ejecutar instrucciones diferentes en función del valor de una expresión o un dato.
Si no hay demasiadas alternativas, también es posible utilizar la instrucción `IF..ELSE`.

```text
TEST <expresión>
    (CASE <valor> { , <valor> } :;
        <instrucciones> )
    (CASE <valor> { , <valor> } :;
        <instrucciones> )
    (CASE <valor> { , <valor> } :;
        <instrucciones> )
    [DEFAULT :;
        <instrucciones> ]
ENDTEST
```
