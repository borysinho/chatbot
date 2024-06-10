-- Productos
INSERT INTO Productos (nombre, descripcion, precio, moneda, stock) VALUES
('Centro de Mesa Floral', 'Elegante centro de mesa con flores frescas de temporada, perfecto para cualquier tipo de boda.', 840.00, 'BS', 40),
('Vela Aromática de Lavanda', 'Vela aromática de lavanda para crear un ambiente relajante y acogedor.', 56.00, 'BS', 150),
('Invitaciones de Boda Clásicas', 'Invitaciones de boda con diseño clásico y elegante, personalizadas con los nombres de los novios.', 17.50, 'BS', 1000),
('Libro de Firmas de Lujo', 'Libro de firmas con cubierta de cuero y detalles dorados, para que los invitados dejen sus mensajes.', 245.00, 'BS', 80),
('Arco Floral para Ceremonia', 'Arco decorativo con flores artificiales de alta calidad, ideal para la ceremonia de la boda.', 1400.00, 'BS', 15),
('Cojines para Anillos', 'Cojines de satén blanco para llevar los anillos durante la ceremonia.', 105.00, 'BS', 50),
('Letras Gigantes LOVE', 'Letras gigantes iluminadas con luces LED, formando la palabra LOVE.', 1750.00, 'BS', 5),
('Confeti Biodegradable', 'Paquetes de confeti biodegradable para lanzar a los novios al salir de la ceremonia.', 70.00, 'BS', 300),
('Vasos Personalizados', 'Vasos personalizados con los nombres de los novios y la fecha de la boda.', 28.00, 'BS', 200),
('Cajas de Regalo para Invitados', 'Cajas de regalo con recuerdos y dulces para los invitados.', 42.00, 'BS', 250);


-- Paquetes
INSERT INTO Paquetes (nombre, descripcion, precio) VALUES
('Paquete Esencial', 'Incluye la coordinación del día de la boda y la decoración básica del lugar.', 7000.00),
('Paquete Romántico', 'Decoración romántica con velas aromáticas y flores frescas, ideal para bodas íntimas.', 10500.00),
('Paquete Elegante', 'Invitaciones personalizadas, libro de firmas de lujo y cojines para anillos.', 8400.00),
('Paquete Floral', 'Centro de mesa floral, arco floral para ceremonia y confeti biodegradable.', 15400.00),
('Paquete Fotografía y Video', 'Servicio completo de fotografía y video profesional para capturar todos los momentos especiales.', 21000.00),
('Paquete Musical', 'Música en vivo con banda o DJ, sistema de sonido y luces para la pista de baile.', 15000.00),
('Paquete Gourmet', 'Servicio de catering gourmet con menú personalizado para todos los invitados.', 30000.00),
('Paquete Transporte', 'Transporte de lujo para los invitados y los novios.', 8400.00),
('Paquete Completo', 'Planificación completa de la boda incluyendo todos los servicios: decoración, catering, fotografía, música, y transporte.', 100000.00),
('Paquete Económico', 'Servicios esenciales de coordinación y decoración básica a un precio accesible.', 5600.00),
('Paquete Ceremonia', 'Organización y decoración de la ceremonia civil y religiosa.', 12600.00),
('Paquete Luna de Miel', 'Planificación de la luna de miel y asesoría de estilo para los novios.', 14000.00),
('Paquete Deluxe', 'Incluye todos los servicios del paquete completo más detalles adicionales y exclusivos.', 150000.00),
('Paquete Decoración', 'Servicios completos de decoración y diseño del evento, incluyendo centro de mesa floral y letras gigantes LOVE.', 42000.00),
('Paquete Infantil', 'Decoración especial para bodas con invitados niños, incluyendo áreas de juego y animadores.', 28000.00),
('Paquete Vintage', 'Decoración con temática vintage, invitaciones personalizadas y detalles de época.', 21000.00),
('Paquete Playa', 'Decoración temática de playa, transporte para los invitados y catering con menú de mariscos.', 56000.00),
('Paquete Jardín', 'Decoración al aire libre con temática de jardín, centro de mesa floral y arco floral.', 35000.00),
('Paquete Personalizado', 'Planificación de boda a medida según las preferencias y gustos específicos de los novios.', 50000.00),
('Paquete VIP', 'Servicio exclusivo para bodas de lujo, incluyendo planificación completa, transporte de lujo y detalles personalizados.', 200000.00),
('Paquete Express', 'Planificación rápida y efectiva para bodas con poco tiempo de preparación, incluye los servicios básicos.', 35000.00),
('Paquete Clásico', 'Servicios tradicionales y elegantes, incluyendo invitaciones, libro de firmas y música clásica.', 28000.00),
('Paquete Moderno', 'Decoración y servicios con un toque moderno y vanguardista, ideal para bodas urbanas.', 45000.00);


-- ElementosPaquetes
INSERT INTO ElementosPaquetes (paquete_id, tipo_item, item_id, cantidad) VALUES
-- Coordinación del Día de la Boda
(1, 'Servicio', 1, 1),	
-- Centro de Mesa Floral
(1, 'Producto', 1, 10), 

-- Paquete Romántico
-- Vela Aromática de Lavanda
(2, 'Producto', 2, 50), 
-- Centro de Mesa Floral
(2, 'Producto', 1, 10), 

-- Paquete Elegante
-- Invitaciones Personalizadas
(3, 'Producto', 3, 100), 
-- Libro de Firmas
(3, 'Producto', 4, 1), 
-- Cojines para Anillos
(3, 'Producto', 6, 1), 

-- Paquete Floral
-- Centro de Mesa Floral
(4, 'Producto', 1, 20), 
-- Arco Floral
(4, 'Producto', 5, 1), 
-- Confeti Biodegradable
(4, 'Producto', 8, 50), 

-- Paquete Fotografía y Video
-- Fotografía y Video Profesional
(5, 'Servicio', 5, 1), 

-- Paquete Musical
-- Música y Entretenimiento en Vivo
(6, 'Servicio', 6, 1), 
-- Fotografía y Video Profesional
(6, 'Servicio', 5, 1), 

-- Paquete Gourmet
-- Servicio de Catering Gourmet
(7, 'Servicio', 4, 1), 

-- Paquete Transporte
-- Transporte de Invitados
(8, 'Servicio', 8, 2), 

-- Paquete Completo
-- Planificación Completa de la Boda
(9, 'Servicio', 2, 1), 
-- Servicio de Catering Gourmet
(9, 'Servicio', 4, 1), 
-- Fotografía y Video Profesional
(9, 'Servicio', 5, 1), 
-- Música y Entretenimiento en Vivo
(9, 'Servicio', 6, 1), 
-- Transporte de Invitados
(9, 'Servicio', 8, 2), 

-- Paquete Económico
-- Coordinación del Día de la Boda
(10, 'Servicio', 1, 1), 
-- Centro de Mesa Floral
(10, 'Producto', 1, 5), 

-- Paquete Ceremonia
-- Ceremonia Civil y Religiosa
(11, 'Servicio', 9, 1), 
-- Arco Floral
(11, 'Producto', 5, 1), 

-- Paquete Luna de Miel
-- Planificación de la Luna de Miel
(12, 'Servicio', 10, 1), 
-- Asesoría de Estilo para los Novios
(12, 'Servicio', 7, 1), 

-- Paquete Deluxe
-- Planificación Completa de la Boda
(13, 'Servicio', 2, 1), 
-- Servicio de Catering Gourmet
(13, 'Servicio', 4, 1), 
-- Fotografía y Video Profesional
(13, 'Servicio', 5, 1), 
-- Música y Entretenimiento en Vivo
(13, 'Servicio', 6, 1), 
-- Transporte de Invitados
(13, 'Servicio', 8, 2), 
-- Centro de Mesa Floral
(13, 'Producto', 1, 20), 
-- Arco Floral
(13, 'Producto', 5, 2), 

-- Paquete Decoración
-- Centro de Mesa Floral
(14, 'Producto', 1, 30), 
-- Letras Gigantes LOVE
(14, 'Producto', 7, 1), 

-- Paquete Infantil
-- Vasos Personalizados
(15, 'Producto', 9, 100), 
-- Música y Entretenimiento en Vivo
(15, 'Servicio', 6, 1), 

-- Paquete Vintage
-- Invitaciones Personalizadas
(16, 'Producto', 3, 100), 
-- Libro de Firmas
(16, 'Producto', 4, 1), 

-- Paquete Playa
-- Centro de Mesa Floral
(17, 'Producto', 1, 30), 
-- Servicio de Catering Gourmet
(17, 'Servicio', 4, 1), 
-- Transporte de Invitados
(17, 'Servicio', 8, 2), 

-- Paquete Jardín
-- Centro de Mesa Floral
(18, 'Producto', 1, 20), 
-- Arco Floral
(18, 'Producto', 5, 1), 

-- Paquete Personalizado
-- Planificación Completa de la Boda
(19, 'Servicio', 2, 1), 

-- Paquete VIP
-- Planificación Completa de la Boda
(20, 'Servicio', 2, 1), 
-- Servicio de Catering Gourmet
(20, 'Servicio', 4, 1), 
-- Fotografía y Video Profesional
(20, 'Servicio', 5, 1), 
-- Música y Entretenimiento en Vivo
(20, 'Servicio', 6, 1), 
-- Transporte de Invitados
(20, 'Servicio', 8, 2), 
-- Centro de Mesa Floral
(20, 'Producto', 1, 30), 
-- Arco Floral
(20, 'Producto', 5, 2), 
-- Letras Gigantes LOVE
(20, 'Producto', 7, 1), 
-- Vasos Personalizados
(20, 'Producto', 9, 200), 

-- Paquete Express
-- Coordinación del Día de la Boda
(21, 'Servicio', 1, 1), 
-- Invitaciones Personalizadas
(21, 'Producto', 3, 50), 

-- Paquete Clásico
-- Invitaciones Personalizadas
(22, 'Producto', 3, 100), 
-- Libro de Firmas
(22, 'Producto', 4, 1), 
-- Música y Entretenimiento en Vivo
(22, 'Servicio', 6, 1), 

-- Paquete Moderno
-- Centro de Mesa Floral
(23, 'Producto', 1, 20), 
-- Letras Gigantes LOVE
(23, 'Producto', 7, 1), 
-- Música y Entretenimiento en Vivo
(23, 'Servicio', 6, 1); 

