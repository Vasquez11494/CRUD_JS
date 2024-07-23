create table clientes(
  cli_codigo SERIAL NOT NULL PRIMARY KEY,
  cli_nombre  VARCHAR(50),
  cli_apellido VARCHAR(50),
  cli_nit  INT,
  cli_telefono  INT,
  cli_situacion SMALLINT DEFAULT 1
);
     