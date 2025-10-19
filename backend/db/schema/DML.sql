
INSERT INTO users (nombre, nro_documento, email, password, direccion, rol_administrador) VALUES
('Usuario Uno', '11111111-1', 'correo1@correo.com', '$2a$06$2rmN7zFdxGtUdhzM7y43mu867jzkCdedIrltlIhy3kG5QNChRZDWy', 'Av. Siempre Viva 1', true),
('Usuario Dos', '22222222-2', 'correo2@correo.com', '$2a$06$s/FVnqNAop.pkXaaLl7BNe1dy7NzndhqRjXP7QhDzgapJT26GuB9C', 'Av. Siempre Viva 2', false),
('Usuario Tres', '33333333-3', 'correo3@correo.com', '$2a$06$6u7LmPNNkG.CYrpLwKi3.ebpMGW8Lp7Z3Y9flkf0FKK93nl5QqcgO', 'Av. Siempre Viva 3', false),
('Usuario Cuatro', '44444444-4', 'correo4@correo.com', '$2a$06$u0PDEZj69OVckfDUULpeqedzHvWFn1cX9nvHOybUex2HTngjfYBiO', 'Av. Siempre Viva 4', false),
('Usuario Cinco', '55555555-5', 'correo5@correo.com', '$2a$06$HwhDsDG0HXFqjIrr8RQ.bOluvAsJjEzDgPoE6IYymfVOI1WUIfLKW', 'Av. Siempre Viva 5', false);


INSERT INTO categories (name)
VALUES
('Electrodomestico'),
('Cocina'),
('Muebles');



INSERT INTO products (nombre, descripcion, precio, image_url, category_id)
VALUES

('Refrigerador No Frost', 'Refrigerador de doble puerta con sistema No Frost y ahorro energético.', 450000, 'https://media.istockphoto.com/id/1314423803/es/vector/nevera-realista-con-juego-de-puertas-dobles-moderno-electrodom%C3%A9stico-de-dos-c%C3%A1maras.jpg?s=612x612&w=0&k=20&c=djzRzKO8F2X9F7t8R3sl7lGIIofSdegjQSWcuxkMkNs=', 1),
('Lavadora automática 12kg', 'Lavadora con múltiples programas y bajo consumo de agua.', 320000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4928348%2F1363445-0000-004.jpg%3Fv%3D638863608676270000&w=128&q=75', 1),
('Microondas digital 25L', 'Microondas con pantalla táctil y 10 niveles de potencia.', 98000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4837837%2F1272682-0000-001.jpg%3Fv%3D638733541075500000&w=128&q=75', 1),
('Horno eléctrico 45L', 'Horno eléctrico con control de temperatura y temporizador.', 120000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4837188%2F1275312-0000-001.jpg%3Fv%3D638837040962800000&w=128&q=75', 1),
('Aspiradora inalámbrica', 'Aspiradora liviana con batería recargable y filtro HEPA.', 87000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5139534%2F1442082-0000-008.jpg%3Fv%3D638918433873000000&w=128&q=75', 1),
('Licuadora de alta potencia', 'Licuadora profesional para batidos, jugos y salsas.', 65000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5078845%2F1282135-0001-001.jpg%3Fv%3D638863577193530000&w=128&q=75', 1),
('Cafetera espresso', 'Cafetera automática con vaporizador de leche.', 110000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5062401%2F1332727-0000-001.jpg%3Fv%3D638863595932630000&w=128&q=75', 1),


('Set de ollas de acero inoxidable', 'Juego de 5 piezas con tapas de vidrio templado.', 95000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F3737137%2F1409329-0000-001.jpg%3Fv%3D638719072971130000&w=128&q=75', 2),
('Sartén antiadherente 28cm', 'Sartén de aluminio con recubrimiento cerámico.', 38000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4360933%2F1339425-0000-001.jpg%3Fv%3D638728528140430000&w=128&q=75', 2),
('Juego de cuchillos profesionales', 'Set de 6 cuchillos con mango ergonómico.', 56000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4853120%2F1391016-0000-001.jpg%3Fv%3D638733573703570000&w=128&q=75', 2),
('Tabla de cortar bambú', 'Tabla ecológica y resistente, ideal para cocina diaria.', 18000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4853519%2F1391036-0000-001.jpg%3Fv%3D638733573899370000&w=128&q=75', 2),
('Tostadora doble ranura', 'Tostadora eléctrica con 6 niveles de dorado.', 45000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5066091%2F1421581-0000-002.jpg%3Fv%3D638863633561600000&w=128&q=75', 2),
('Exprimidor eléctrico', 'Exprimidor de cítricos con filtro para pulpa.', 39000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5085656%2F1406562-0000-001.jpg%3Fv%3D638863630792830000&w=128&q=75', 2),
('Juego de vasos de vidrio 6 unidades', 'Vasos de alta resistencia y diseño elegante.', 25000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F3726581%2F1335534-0000-001.jpg%3Fv%3D638863596497430000&w=128&q=75', 2),


('Sofá modular 3 cuerpos', 'Sofá tapizado en lino gris con cojines extraíbles.', 310000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4951760%2F1428224-0000-001.jpg%3Fv%3D638863637858530000&w=128&q=75', 3),
('Mesa de comedor extensible', 'Mesa de madera maciza con extensión para 8 personas.', 280000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4985451%2F1141770-0200-001.jpg%3Fv%3D638863541334030000&w=128&q=75', 3),
('Silla de comedor tapizada', 'Silla con patas de madera y respaldo ergonómico.', 45000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5000700%2F1308260-0000-003.jpg%3Fv%3D638878851660000000&w=128&q=75', 3),
('Estante de pared flotante', 'Estante de madera con soportes ocultos.', 36000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4951168%2F1421651-0000-001.jpg%3Fv%3D638739771736070000&w=128&q=75', 3),
('Velador nórdico', 'Mesa de noche con cajón y patas de roble.', 52000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5084874%2F1390576-0000-001.jpg%3Fv%3D638744082938630000&w=128&q=75', 3),
('Rack para TV 65"', 'Mueble para televisor con compartimientos abiertos.', 97000, 'https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5082861%2F1351236-0000-002.jpg%3Fv%3D638863598404170000&w=128&q=75', 3);