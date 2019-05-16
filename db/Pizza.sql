CREATE DATABASE Pizza;

USE Pizza;

CREATE TABLE clientes(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apaterno VARCHAR(50) NOT NULL,
    amaterno VARCHAR(50) NOT NULL,
    telefono INT(15) NOT NULL,
    direccion VARCHAR(50) NOT NULL
);

CREATE TABLE empleados(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(30) NOT NULL,
    contraseña VARCHAR(16) NOT NULL
);

CREATE TABLE datos_empleados(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apaterno VARCHAR(50) NOT NULL,
    amaterno VARCHAR(50) NOT NULL,
    telefono INT(15) NOT NULL,
    direccion VARCHAR(50) NOT NULL
);

CREATE TABLE ingredientes(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_proveedor INT(10),
    nombre VARCHAR(30) NOT NULL,
    FOREIGN KEY(id_proveedor) REFERENCES proveedores(id)
);

CREATE TABLE proveedores(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    cantidad_kg DOUBLE(10,3) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    telefono INT(15) NOT NULL,
    total_p DOUBLE(10,2) NOT NULL
);

CREATE TABLE producto(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_proveedor INT(10),
    nombre VARCHAR(30) NOT NULL,
    existencia_b DOUBLE(10,3) NOT NULL,
    disponible_v DOUBLE(10,3) NOT NULL,
    FOREIGN KEY(id_proveedor) REFERENCES proveedores(id)
);

CREATE TABLE tipos_pizza(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL
);
CREATE TABLE tamano(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tamano VARCHAR(30) NOT NULL,
    rebanada INT(3) NOT NULL
);

CREATE TABLE pedido(
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_pizza INT(10),
    id_tamano INT(10),
    id_ingrediente INT(10),
    precio DOUBLE(10,2) NOT NULL,
    id_cliente INT(10),
    id_empleado INT(10),
    FOREIGN KEY(id_pizza) REFERENCES tipos_pizza(id),
    FOREIGN KEY(id_tamano) REFERENCES tamano(id),
    FOREIGN KEY(id_ingrediente) REFERENCES ingredientes(id),
    FOREIGN KEY(id_cliente) REFERENCES clientes(id),
    FOREIGN KEY(id_empleado) REFERENCES empleados(id)
);

DESCRIBE clientes;