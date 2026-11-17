-- ============================================================================
-- Base de Datos: Electro Tecno — Proyecto Final Práctica Profesional II
-- Motor compatible: MySQL 8.0+ / MariaDB 10.4+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `tienda_electro`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `tienda_electro`;

-- ----------------------------------------------------------------------------
-- Tabla 1: usuarios (Autenticación y roles)
-- Usuario de prueba: admin / Contraseña: admin123
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(60) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL DEFAULT 'Administrador',
  `rol` ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`usuario`, `password`, `nombre`, `rol`) VALUES
('admin', '$2b$10$nWm8dblzipKzMjLIcJFWsuInUFPeU62XdGxiYFoLlUMVNST8vtwEi', 'Administrador Electro Tecno', 'admin');

-- ----------------------------------------------------------------------------
-- Tabla 2: productos (Catálogo completo de tecnología sin duplicados)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `precio` DECIMAL(12, 2) NOT NULL,
  `precio_anterior` DECIMAL(12, 2) DEFAULT NULL,
  `estado` ENUM('nuevo', 'usado') NOT NULL DEFAULT 'nuevo',
  `categoria` VARCHAR(80) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `stock` INT NOT NULL DEFAULT 10,
  `destacado` TINYINT(1) NOT NULL DEFAULT 0,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_categoria` (`categoria`),
  INDEX `idx_estado` (`estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `productos` (`nombre`, `precio`, `precio_anterior`, `estado`, `categoria`, `descripcion`, `imagen`, `stock`, `destacado`) VALUES
(
  'iPhone 15 Pro Titanium 256GB',
  1190000.00,
  1350000.00,
  'nuevo',
  'Celulares',
  'Chasis de titanio aeroespacial, chip A17 Pro de 3 nm, pantalla Super Retina XDR ProMotion 120 Hz y sistema de cámaras Pro con teleobjetivo 3x.',
  '/src/assets/images/prod_iphone_15_pro_1794884334261.jpg',
  8,
  1
),
(
  'Samsung Galaxy S23 256GB Certificado',
  645000.00,
  780000.00,
  'usado',
  'Celulares',
  'Equipo usado seleccionado con batería al 96%, revisión de 30 puntos en laboratorio técnico, pantalla Dynamic AMOLED 2X y garantía escrita de 6 meses.',
  '/src/assets/images/prod_samsung_s23_usado_1794884335066.jpg',
  5,
  1
),
(
  'Notebook ProBook X15 Ryzen 7 16GB',
  1420000.00,
  NULL,
  'nuevo',
  'Notebooks y PC',
  'Chasis unibody de aluminio anodizado, procesador AMD Ryzen 7, 16 GB RAM DDR5, SSD NVMe 1 TB y pantalla IPS antirreflejo de 15.6 pulgadas.',
  '/src/assets/images/prod_notebook_gamer_1794884335814.jpg',
  6,
  1
),
(
  'Monitor Curvo Nocturne 27" QHD 165Hz',
  489000.00,
  560000.00,
  'nuevo',
  'Monitores',
  'Panel curvo 1500R de 27 pulgadas resolución 2560x1440, tasa de refresco 165 Hz, 1 ms MPRT y cobertura sRGB 99% con soporte metálico regulable.',
  '/src/assets/images/prod_monitor_curvo_1794884335895.jpg',
  7,
  1
),
(
  'Teclado Mecánico 75% Aluminum Wireless',
  138000.00,
  NULL,
  'nuevo',
  'Periféricos',
  'Formato compacto 75% con estructura de aluminio CNC, switches lineales hot-swap prelubricados, keycaps PBT doble inyección y retroiluminación verde.',
  '/src/assets/images/prod_teclado_mecanico_1794884336855.jpg',
  14,
  0
),
(
  'Mouse Inalámbrico Precision Pro 26K DPI',
  89500.00,
  108000.00,
  'nuevo',
  'Periféricos',
  'Sensor óptico de 26.000 DPI, peso ultraligero de 58 gramos, conectividad Dual 2.4 GHz / Bluetooth y switches ópticos de baja latencia.',
  '/src/assets/images/prod_mouse_inalambrico_1794884336952.jpg',
  18,
  0
),
(
  'Auriculares Studio ANC Over-Ear',
  195000.00,
  NULL,
  'nuevo',
  'Audio',
  'Cancelación activa de ruido híbrida de hasta 42 dB, drivers de neodimio de 40 mm, bisagras de acero cepillado y 45 horas de autonomía USB-C.',
  '/src/assets/images/prod_auriculares_anc_1794884337504.jpg',
  11,
  1
),
(
  'Cargador GaN 65W Dual USB-C + Cable Trenzado',
  54900.00,
  NULL,
  'nuevo',
  'Accesorios',
  'Tecnología Nitruro de Galio (GaN) de alta eficiencia térmica con doble puerto USB-C Power Delivery 3.0. Incluye cable mallado de 2 metros.',
  '/src/assets/images/prod_cargador_gan_1794884338193.jpg',
  25,
  0
),
(
  'Funda Kevlar MagSafe + Protector Óptico',
  38500.00,
  NULL,
  'nuevo',
  'Accesorios',
  'Fibra de aramida tejida ultradelgada compatible con carga magnética y bordes amortiguadores. Incluye cristal templado para módulos de cámara.',
  '/src/assets/images/prod_funda_kevlar_1794884338585.jpg',
  30,
  0
),
(
  'Power Bank Aluminio 20.000 mAh PD 45W',
  79000.00,
  95000.00,
  'usado',
  'Accesorios',
  'Unidad de exhibición testeada al 100% de capacidad real. Carcasa metálica con indicador LED de carga y salida USB-C apta para notebooks y celulares.',
  '/src/assets/images/prod_powerbank_ssd_1794884339097.jpg',
  9,
  0
),
(
  'PC Gamer Nocturne Ryzen 5 RTX 4060 16GB',
  1690000.00,
  1890000.00,
  'nuevo',
  'Notebooks y PC',
  'Gabinete vidrio templado, procesador AMD Ryzen 5 7600, placa GeForce RTX 4060 8GB, refrigeración líquida 240 mm, 16 GB DDR5 y SSD NVMe 1 TB.',
  '/src/assets/images/prod_pc_desktop_gamer_1794885118149.jpg',
  4,
  1
),
(
  'Netbook Compacta 11.6" SSD 256GB Reacondicionada',
  265000.00,
  NULL,
  'usado',
  'Notebooks y PC',
  'Equipo liviano ideal para estudio y oficina móvil. Pantalla HD 11.6 pulgadas, 8 GB RAM, SSD 256 GB, batería verificada y garantía de 6 meses.',
  '/src/assets/images/prod_netbook_usada_1794885117936.jpg',
  7,
  0
),
(
  'Xiaomi Redmi Note 13 Pro 256GB 5G',
  495000.00,
  565000.00,
  'nuevo',
  'Celulares',
  'Pantalla AMOLED 120 Hz de 6.67 pulgadas, cámara principal de 200 MP con estabilización óptica OIS, carga turbo 67W y almacenamiento de 256 GB.',
  '/src/assets/images/prod_xiaomi_redmi_1794885118563.jpg',
  12,
  1
),
(
  'Motorola Edge 40 Neo 256GB Certificado',
  389000.00,
  NULL,
  'usado',
  'Celulares',
  'Equipo usado seleccionado en estado impecable con acabado en cuero vegano, pantalla pOLED curva 144 Hz, certificación IP68 y cargador TurboPower.',
  '/src/assets/images/prod_motorola_edge_1794885118131.jpg',
  5,
  0
),
(
  'Webcam 4K Pro Stream Autofocus + Trípode',
  112000.00,
  NULL,
  'nuevo',
  'Periféricos',
  'Sensor Sony 4K a 30 fps / 1080p a 60 fps, enfoque automático rápido, doble micrófono con cancelación de ruido y trípode metálico de escritorio.',
  '/src/assets/images/prod_webcam_4k_1794885118920.jpg',
  10,
  0
),
(
  'Hub USB-C 7 en 1 + Soporte Aluminio Plegable',
  64500.00,
  78000.00,
  'nuevo',
  'Accesorios',
  'Combo de productividad: hub multipuerto con HDMI 4K, lector SD/microSD, carga PD 100W y soporte ergonómico plegable de aluminio mecanizado.',
  '/src/assets/images/prod_hub_soporte_1794885119751.jpg',
  16,
  0
),
(
  'Parlante Bluetooth Portátil 30W IP67',
  124000.00,
  NULL,
  'nuevo',
  'Audio',
  'Sonido estéreo 360 grados con radiador pasivo de graves, resistencia total al agua y polvo IP67 y hasta 18 horas de reproducción continua.',
  '/src/assets/images/prod_parlante_bt_1794885119636.jpg',
  13,
  0
),
(
  'Disco SSD Externo NVMe 1TB USB 3.2 Gen 2',
  149000.00,
  175000.00,
  'nuevo',
  'Accesorios',
  'Chasis metálico disipador de titanio, velocidades de lectura de hasta 1050 MB/s y cable USB-C mallado compatible con PC, Mac y consolas.',
  '/src/assets/images/prod_ssd_externo_1794885120225.jpg',
  11,
  0
),
(
  'Monitor Ultrawide 34" WQHD 144Hz Curvo',
  745000.00,
  860000.00,
  'nuevo',
  'Monitores',
  'Pantalla panorámica 21:9 de 34 pulgadas resolución 3440x1440, 144 Hz, panel VA de alto contraste y soporte metálico regulable en altura.',
  '/src/assets/images/prod_monitor_ultrawide_1794885565076.jpg',
  5,
  1
),
(
  'Auriculares In-Ear TWS Pro ANC',
  98000.00,
  119000.00,
  'nuevo',
  'Audio',
  'Cancelación activa de ruido adaptativa, modo transparencia, audio espacial de baja latencia y estuche con 32 horas totales de carga USB-C.',
  '/src/assets/images/prod_earbuds_tws_1794885565310.jpg',
  20,
  0
),
(
  'Micrófono Condensador USB Studio + Shock Mount',
  134000.00,
  NULL,
  'nuevo',
  'Periféricos',
  'Cápsula cardioide profesional de 24-bit/192 kHz, soporte antivibración metálico, perilla de ganancia integrada y botón táctil mute con aro LED.',
  '/src/assets/images/prod_microfono_usb_1794885566209.jpg',
  9,
  0
),
(
  'iPhone 13 128GB Midnight Certificado',
  569000.00,
  645000.00,
  'usado',
  'Celulares',
  'Equipo usado seleccionado con batería al 94%, Face ID 100% operativo, pantalla Super Retina XDR intacta y garantía escrita de 6 meses.',
  '/src/assets/images/prod_iphone_13_usado_1794885566134.jpg',
  6,
  0
),
(
  'Base de Carga Inalámbrica 3 en 1 MagSafe',
  86000.00,
  NULL,
  'nuevo',
  'Accesorios',
  'Estación magnética de aluminio anodizado para cargar simultáneamente smartphone, reloj inteligente y auriculares inalámbricos hasta 15W.',
  '/src/assets/images/prod_cargador_magsafe_1794885567573.jpg',
  14,
  0
),
(
  'Smartwatch Titanio AMOLED GPS 46mm',
  219000.00,
  255000.00,
  'nuevo',
  'Accesorios',
  'Caja de titanio cepillado, pantalla AMOLED zafiro de 1.43 pulgadas, GPS dual banda, monitoreo cardíaco 24/7 y autonomía de hasta 14 días.',
  '/src/assets/images/prod_smartwatch_amoled_1794885567350.jpg',
  8,
  0
),
(
  'Tablet Pro 11" 256GB Wi-Fi + Pencil Magnético',
  695000.00,
  790000.00,
  'nuevo',
  'Notebooks y PC',
  'Pantalla Liquid 120 Hz de 11 pulgadas, procesador de 8 núcleos, 256 GB de almacenamiento y lápiz óptico magnético incluido para diseño y estudio.',
  '/src/assets/images/prod_tablet_pro_1794886081745.jpg',
  7,
  1
),
(
  'Router Wi-Fi 6E Mesh Gaming Tri-Band AX5400',
  248000.00,
  NULL,
  'nuevo',
  'Accesorios',
  'Cobertura de alta velocidad hasta 5.4 Gbps con banda dedicada de 6 GHz, puerto WAN 2.5G y priorización inteligente de tráfico para baja latencia.',
  '/src/assets/images/prod_router_wifi6e_1794886082541.jpg',
  9,
  0
),
(
  'Mousepad Gaming XXL Micro-Weave 900x400mm',
  34500.00,
  42000.00,
  'nuevo',
  'Periféricos',
  'Superficie de tejido micro-texturizado optimizada para sensores ópticos de alta precisión, base de caucho antideslizante y bordes cosidos reforzados.',
  '/src/assets/images/prod_mousepad_xxl_1794886083272.jpg',
  22,
  0
),
(
  'Memoria RAM DDR5 32GB (2x16GB) 6000MHz CL30',
  189000.00,
  NULL,
  'nuevo',
  'Notebooks y PC',
  'Kit dual channel de alto rendimiento con disipadores de aluminio anodizado, perfiles EXPO / XMP 3.0 e iluminación superior verde configurable.',
  '/src/assets/images/prod_ram_ddr5_1794886083383.jpg',
  12,
  0
),
(
  'Placa de Video RTX 4070 Super 12GB Triple Fan',
  980000.00,
  1120000.00,
  'nuevo',
  'Notebooks y PC',
  'Arquitectura Ada Lovelace con 12 GB GDDR6X, DLSS 3.5 con generación de fotogramas, Ray Tracing dedicado y triple ventilador silencioso.',
  '/src/assets/images/prod_gpu_rtx4070_1794886083006.jpg',
  4,
  1
),
(
  'Aro de Luz LED Estudio + Soporte Celular',
  49000.00,
  NULL,
  'usado',
  'Accesorios',
  'Unidad de estudio testeada con temperatura bicolor regulable (3200K–5600K), control de intensidad y brazo metálico con pinza universal.',
  '/src/assets/images/prod_aro_led_estudio_1794886083975.jpg',
  6,
  0
),
(
  'Google Pixel 8 Pro 256GB Obsidian',
  925000.00,
  1040000.00,
  'nuevo',
  'Celulares',
  'Procesador Tensor G3, pantalla Super Actua LTPO 120 Hz, triple cámara profesional con teleobjetivo 5x y 7 años de soporte oficial.',
  '/src/assets/images/prod_pixel_8_pro_1794886493232.jpg',
  6,
  1
),
(
  'Samsung Galaxy A55 5G 256GB Graphite',
  469000.00,
  NULL,
  'nuevo',
  'Celulares',
  'Marco de aluminio cepillado, pantalla Super AMOLED 120 Hz de 6.6 pulgadas, resistencia al agua IP67 y triple cámara de 50 MP con OIS.',
  '/src/assets/images/prod_galaxy_a55_1794886493587.jpg',
  15,
  0
),
(
  'iPhone 14 Pro 256GB Space Black Certificado',
  840000.00,
  960000.00,
  'usado',
  'Celulares',
  'Equipo usado seleccionado con batería al 93%, Dynamic Island, cámara ProRAW de 48 MP y garantía escrita de 6 meses.',
  '/src/assets/images/prod_iphone_14_pro_1794886494812.jpg',
  4,
  0
),
(
  'Samsung Galaxy Z Flip 5 256GB Certificado',
  765000.00,
  NULL,
  'usado',
  'Celulares',
  'Plegable compacto revisado en laboratorio con bisagra cero brecha, pantalla externa Flex Window y Snapdragon 8 Gen 2.',
  '/src/assets/images/prod_galaxy_flip5_1794886493895.jpg',
  3,
  0
),
(
  'Mini PC Workstation Ryzen 9 32GB SSD 1TB',
  1180000.00,
  1320000.00,
  'nuevo',
  'Notebooks y PC',
  'Chasis compacto de aluminio anodizado con Ryzen 9, 32 GB DDR5, doble salida HDMI/USB4 8K y red Ethernet 2.5G para estudio o trabajo.',
  '/src/assets/images/prod_mini_pc_1794886494887.jpg',
  5,
  1
),
(
  'Fuente Modular 850W 80+ Gold ATX 3.0',
  198000.00,
  NULL,
  'nuevo',
  'Notebooks y PC',
  'Certificación 80 Plus Gold, cableado 100% modular mallado con conector nativo PCIe 5.0 12VHPWR y ventilador FDB silencioso.',
  '/src/assets/images/prod_psu_850w_1794886495063.jpg',
  10,
  0
),
(
  'SSD Interno M.2 NVMe PCIe Gen4 2TB',
  215000.00,
  249000.00,
  'nuevo',
  'Notebooks y PC',
  'Lectura secuencial de hasta 7300 MB/s con disipador de aluminio acanalado de fábrica, ideal para PC de alto rendimiento y PS5.',
  '/src/assets/images/prod_ssd_nvme_intern_1794886495107.jpg',
  14,
  0
),
(
  'Motherboard Z790 Pro Gaming Wi-Fi 6E',
  385000.00,
  NULL,
  'nuevo',
  'Notebooks y PC',
  'Fases de alimentación 16+1+2, soporte DDR5 hasta 7600 MHz, cuatro slots M.2 con disipadores y conectividad Wi-Fi 6E integrada.',
  '/src/assets/images/prod_motherboard_1794886495241.jpg',
  7,
  0
),
(
  'Monitor OLED 27" QHD 240Hz 0.03ms',
  1150000.00,
  1290000.00,
  'nuevo',
  'Monitores',
  'Panel OLED de negros puros con respuesta instantánea de 0.03 ms, frecuencia de 240 Hz, cobertura DCI-P3 99% y HDMI 2.1.',
  '/src/assets/images/prod_monitor_oled_1794886495995.jpg',
  4,
  1
),
(
  'Monitor Profesional 32" 4K UHD IPS Creator',
  690000.00,
  NULL,
  'nuevo',
  'Monitores',
  'Resolución 3840x2160 calibrada de fábrica Delta E < 2, hub USB-C con carga de 90W para notebook y base ergonómica pivoteable.',
  '/src/assets/images/prod_monitor_4k_1794886496498.jpg',
  6,
  0
),
(
  'Brazo Articulado Neumático para Monitor 17"-34"',
  74000.00,
  89000.00,
  'nuevo',
  'Monitores',
  'Pistón a gas reforzado para pantallas de hasta 10 kg, gestión oculta de cables, rotación 360 grados y fijación por prensa o pasacables.',
  '/src/assets/images/prod_brazo_monitor_1794886496890.jpg',
  15,
  0
),
(
  'Joystick Inalámbrico Pro Dual Hall Effect',
  92000.00,
  109000.00,
  'nuevo',
  'Periféricos',
  'Sticks magnéticos Hall anti-drift, gatillos con bloqueo corto, botones traseros programables y receptor USB 2.4 GHz + Bluetooth.',
  '/src/assets/images/prod_gamepad_pro_1794886496704.jpg',
  12,
  0
),
(
  'Macro Pad Mecánico CNC 8 Teclas + Perilla',
  68000.00,
  NULL,
  'nuevo',
  'Periféricos',
  'Cuerpo sólido de aluminio mecanizado compatible con QMK/VIA, encoder rotatorio de precisión e iluminación inferior configurable.',
  '/src/assets/images/prod_macropad_1794886497847.jpg',
  11,
  0
),
(
  'Stream Control Deck 15 Teclas LCD',
  195000.00,
  229000.00,
  'nuevo',
  'Periféricos',
  'Quince teclas LCD personalizables para disparar escenas, macros de edición, audio y atajos en un toque con soporte inclinado.',
  '/src/assets/images/prod_stream_deck_1794886497474.jpg',
  8,
  0
),
(
  'Tableta Gráfica Digitalizadora Pro 10x6"',
  108000.00,
  NULL,
  'usado',
  'Periféricos',
  'Unidad de demostración impecable con 8192 niveles de presión, inclinación de 60 grados, 6 teclas rápidas y lápiz sin batería.',
  '/src/assets/images/prod_tableta_grafica_1794886499203.jpg',
  5,
  0
),
(
  'Barra de Sonido Compacta PC USB-C / Bluetooth',
  84000.00,
  99000.00,
  'nuevo',
  'Audio',
  'Diseño de perfil bajo para ubicar debajo del monitor, doble driver de rango completo, perilla de volumen física y conexión USB o BT 5.3.',
  '/src/assets/images/prod_soundbar_pc_1794886498168.jpg',
  13,
  0
),
(
  'Interfaz de Audio USB-C 2x2 Estudio 24-Bit',
  165000.00,
  NULL,
  'nuevo',
  'Audio',
  'Dos preamplificadores de bajo ruido con alimentación Phantom 48V, monitoreo directo sin latencia y chasis metálico cepillado.',
  '/src/assets/images/prod_interfaz_audio_1794886498804.jpg',
  7,
  0
),
(
  'Cargador Auto Carga Rápida 60W Dual USB-C',
  29500.00,
  NULL,
  'nuevo',
  'Accesorios',
  'Cuerpo metálico ultracompacto con doble puerto USB-C Power Delivery, aro LED verde indicador y cable mallado reforzado incluido.',
  '/src/assets/images/prod_cargador_auto_1794886499074.jpg',
  24,
  0
),
(
  'Base Refrigerante Notebook Dual Fan Metálica',
  58000.00,
  72000.00,
  'nuevo',
  'Accesorios',
  'Superficie de malla metálica con doble ventilador silencioso de 140 mm, 5 niveles de inclinación y hub USB integrado.',
  '/src/assets/images/prod_base_cooler_1794886499807.jpg',
  15,
  0
),
(
  'Cámara Seguridad Smart Wi-Fi 2K Motorizada',
  62000.00,
  NULL,
  'nuevo',
  'Accesorios',
  'Resolución 2K QHD, visión nocturna infrarroja, seguimiento automático de movimiento 360°, audio bidireccional y ranura microSD.',
  '/src/assets/images/prod_camara_smart_1794886499991.jpg',
  18,
  0
);

-- ----------------------------------------------------------------------------
-- Tabla 3: consultas (Mensajes desde formulario de contacto y servicio técnico)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `consultas`;
CREATE TABLE `consultas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(50) DEFAULT NULL,
  `asunto` VARCHAR(120) NOT NULL DEFAULT 'Consulta general',
  `mensaje` TEXT NOT NULL,
  `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `consultas` (`nombre`, `email`, `telefono`, `asunto`, `mensaje`) VALUES
('Martín Gómez', 'martin.gomez@correo.com', '+54 9 11 5542-8810', 'Servicio Técnico', 'Hola, necesito consultar presupuesto para cambio de módulo de pantalla de un Galaxy S23.'),
('Lucía Fernández', 'lucia.f@correo.com', '+54 9 11 4412-9034', 'Stock Notebooks', '¿Tienen disponible envío inmediato a Córdoba para la Notebook ProBook X15?');
