import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export interface Usuario {
  id: number;
  usuario: string;
  password: string;
  nombre: string;
  rol: 'admin' | 'cliente';
  fecha_creacion: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precio_anterior: number | null;
  estado: 'nuevo' | 'usado';
  categoria: string;
  descripcion: string;
  imagen: string;
  stock: number;
  destacado: number;
  fecha_creacion: string;
}

export interface Consulta {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  asunto: string;
  mensaje: string;
  fecha: string;
}

interface LocalStore {
  usuarios: Usuario[];
  productos: Producto[];
  consultas: Consulta[];
}

const DATA_FILE = path.resolve(process.cwd(), 'server/data/tienda_electro.json');

const SEED_DATA: LocalStore = {
  usuarios: [
    {
      id: 1,
      usuario: 'admin',
      password:
        '$2b$10$nWm8dblzipKzMjLIcJFWsuInUFPeU62XdGxiYFoLlUMVNST8vtwEi',
      nombre: 'Administrador Electro Tecno',
      rol: 'admin',
      fecha_creacion: '2026-01-10T10:00:00.000Z',
    },
  ],
  productos: [
    {
      id: 1,
      nombre: 'iPhone 15 Pro Titanium 256GB',
      precio: 1190000,
      precio_anterior: 1350000,
      estado: 'nuevo',
      categoria: 'Celulares',
      descripcion:
        'Chasis de titanio aeroespacial, chip A17 Pro de 3 nm, pantalla Super Retina XDR ProMotion 120 Hz y sistema de cámaras Pro con teleobjetivo 3x.',
      imagen: '/src/assets/images/prod_iphone_15_pro_1794884334261.jpg',
      stock: 8,
      destacado: 1,
      fecha_creacion: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 2,
      nombre: 'Samsung Galaxy S23 256GB Certificado',
      precio: 645000,
      precio_anterior: 780000,
      estado: 'usado',
      categoria: 'Celulares',
      descripcion:
        'Equipo usado seleccionado con batería al 96%, revisión de 30 puntos en laboratorio técnico, pantalla Dynamic AMOLED 2X y garantía escrita de 6 meses.',
      imagen: '/src/assets/images/prod_samsung_s23_usado_1794884335066.jpg',
      stock: 5,
      destacado: 1,
      fecha_creacion: '2026-02-02T10:00:00.000Z',
    },
    {
      id: 3,
      nombre: 'Notebook ProBook X15 Ryzen 7 16GB',
      precio: 1420000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Chasis unibody de aluminio anodizado, procesador AMD Ryzen 7, 16 GB RAM DDR5, SSD NVMe 1 TB y pantalla IPS antirreflejo de 15.6 pulgadas.',
      imagen: '/src/assets/images/prod_notebook_gamer_1794884335814.jpg',
      stock: 6,
      destacado: 1,
      fecha_creacion: '2026-02-03T10:00:00.000Z',
    },
    {
      id: 4,
      nombre: 'Monitor Curvo Nocturne 27" QHD 165Hz',
      precio: 489000,
      precio_anterior: 560000,
      estado: 'nuevo',
      categoria: 'Monitores',
      descripcion:
        'Panel curvo 1500R de 27 pulgadas resolución 2560x1440, tasa de refresco 165 Hz, 1 ms MPRT y cobertura sRGB 99% con soporte metálico regulable.',
      imagen: '/src/assets/images/prod_monitor_curvo_1794884335895.jpg',
      stock: 7,
      destacado: 1,
      fecha_creacion: '2026-02-04T10:00:00.000Z',
    },
    {
      id: 5,
      nombre: 'Teclado Mecánico 75% Aluminum Wireless',
      precio: 138000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Formato compacto 75% con estructura de aluminio CNC, switches lineales hot-swap prelubricados, keycaps PBT doble inyección y retroiluminación verde.',
      imagen: '/src/assets/images/prod_teclado_mecanico_1794884336855.jpg',
      stock: 14,
      destacado: 0,
      fecha_creacion: '2026-02-05T10:00:00.000Z',
    },
    {
      id: 6,
      nombre: 'Mouse Inalámbrico Precision Pro 26K DPI',
      precio: 89500,
      precio_anterior: 108000,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Sensor óptico de 26.000 DPI, peso ultraligero de 58 gramos, conectividad Dual 2.4 GHz / Bluetooth y switches ópticos de baja latencia.',
      imagen: '/src/assets/images/prod_mouse_inalambrico_1794884336952.jpg',
      stock: 18,
      destacado: 0,
      fecha_creacion: '2026-02-06T10:00:00.000Z',
    },
    {
      id: 7,
      nombre: 'Auriculares Studio ANC Over-Ear',
      precio: 195000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Audio',
      descripcion:
        'Cancelación activa de ruido híbrida de hasta 42 dB, drivers de neodimio de 40 mm, bisagras de acero cepillado y 45 horas de autonomía USB-C.',
      imagen: '/src/assets/images/prod_auriculares_anc_1794884337504.jpg',
      stock: 11,
      destacado: 1,
      fecha_creacion: '2026-02-07T10:00:00.000Z',
    },
    {
      id: 8,
      nombre: 'Cargador GaN 65W Dual USB-C + Cable Trenzado',
      precio: 54900,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Tecnología Nitruro de Galio (GaN) de alta eficiencia térmica con doble puerto USB-C Power Delivery 3.0. Incluye cable mallado de 2 metros.',
      imagen: '/src/assets/images/prod_cargador_gan_1794884338193.jpg',
      stock: 25,
      destacado: 0,
      fecha_creacion: '2026-02-08T10:00:00.000Z',
    },
    {
      id: 9,
      nombre: 'Funda Kevlar MagSafe + Protector Óptico',
      precio: 38500,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Fibra de aramida tejida ultradelgada compatible con carga magnética y bordes amortiguadores. Incluye cristal templado para módulos de cámara.',
      imagen: '/src/assets/images/prod_funda_kevlar_1794884338585.jpg',
      stock: 30,
      destacado: 0,
      fecha_creacion: '2026-02-09T10:00:00.000Z',
    },
    {
      id: 10,
      nombre: 'Power Bank Aluminio 20.000 mAh PD 45W',
      precio: 79000,
      precio_anterior: 95000,
      estado: 'usado',
      categoria: 'Accesorios',
      descripcion:
        'Unidad de exhibición testeada al 100% de capacidad real. Carcasa metálica con indicador LED de carga y salida USB-C apta para notebooks y celulares.',
      imagen: '/src/assets/images/prod_powerbank_ssd_1794884339097.jpg',
      stock: 9,
      destacado: 0,
      fecha_creacion: '2026-02-10T10:00:00.000Z',
    },
    {
      id: 11,
      nombre: 'PC Gamer Nocturne Ryzen 5 RTX 4060 16GB',
      precio: 1690000,
      precio_anterior: 1890000,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Gabinete vidrio templado, procesador AMD Ryzen 5 7600, placa GeForce RTX 4060 8GB, refrigeración líquida 240 mm, 16 GB DDR5 y SSD NVMe 1 TB.',
      imagen: '/src/assets/images/prod_pc_desktop_gamer_1794885118149.jpg',
      stock: 4,
      destacado: 1,
      fecha_creacion: '2026-02-11T10:00:00.000Z',
    },
    {
      id: 12,
      nombre: 'Netbook Compacta 11.6" SSD 256GB Reacondicionada',
      precio: 265000,
      precio_anterior: null,
      estado: 'usado',
      categoria: 'Notebooks y PC',
      descripcion:
        'Equipo liviano ideal para estudio y oficina móvil. Pantalla HD 11.6 pulgadas, 8 GB RAM, SSD 256 GB, batería verificada y garantía de 6 meses.',
      imagen: '/src/assets/images/prod_netbook_usada_1794885117936.jpg',
      stock: 7,
      destacado: 0,
      fecha_creacion: '2026-02-12T10:00:00.000Z',
    },
    {
      id: 13,
      nombre: 'Xiaomi Redmi Note 13 Pro 256GB 5G',
      precio: 495000,
      precio_anterior: 565000,
      estado: 'nuevo',
      categoria: 'Celulares',
      descripcion:
        'Pantalla AMOLED 120 Hz de 6.67 pulgadas, cámara principal de 200 MP con estabilización óptica OIS, carga turbo 67W y almacenamiento de 256 GB.',
      imagen: '/src/assets/images/prod_xiaomi_redmi_1794885118563.jpg',
      stock: 12,
      destacado: 1,
      fecha_creacion: '2026-02-13T10:00:00.000Z',
    },
    {
      id: 14,
      nombre: 'Motorola Edge 40 Neo 256GB Certificado',
      precio: 389000,
      precio_anterior: null,
      estado: 'usado',
      categoria: 'Celulares',
      descripcion:
        'Equipo usado seleccionado en estado impecable con acabado en cuero vegano, pantalla pOLED curva 144 Hz, certificación IP68 y cargador TurboPower.',
      imagen: '/src/assets/images/prod_motorola_edge_1794885118131.jpg',
      stock: 5,
      destacado: 0,
      fecha_creacion: '2026-02-14T10:00:00.000Z',
    },
    {
      id: 15,
      nombre: 'Webcam 4K Pro Stream Autofocus + Trípode',
      precio: 112000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Sensor Sony 4K a 30 fps / 1080p a 60 fps, enfoque automático rápido, doble micrófono con cancelación de ruido y trípode metálico de escritorio.',
      imagen: '/src/assets/images/prod_webcam_4k_1794885118920.jpg',
      stock: 10,
      destacado: 0,
      fecha_creacion: '2026-02-15T10:00:00.000Z',
    },
    {
      id: 16,
      nombre: 'Hub USB-C 7 en 1 + Soporte Aluminio Plegable',
      precio: 64500,
      precio_anterior: 78000,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Combo de productividad: hub multipuerto con HDMI 4K, lector SD/microSD, carga PD 100W y soporte ergonómico plegable de aluminio mecanizado.',
      imagen: '/src/assets/images/prod_hub_soporte_1794885119751.jpg',
      stock: 16,
      destacado: 0,
      fecha_creacion: '2026-02-16T10:00:00.000Z',
    },
    {
      id: 17,
      nombre: 'Parlante Bluetooth Portátil 30W IP67',
      precio: 124000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Audio',
      descripcion:
        'Sonido estéreo 360 grados con radiador pasivo de graves, resistencia total al agua y polvo IP67 y hasta 18 horas de reproducción continua.',
      imagen: '/src/assets/images/prod_parlante_bt_1794885119636.jpg',
      stock: 13,
      destacado: 0,
      fecha_creacion: '2026-02-17T10:00:00.000Z',
    },
    {
      id: 18,
      nombre: 'Disco SSD Externo NVMe 1TB USB 3.2 Gen 2',
      precio: 149000,
      precio_anterior: 175000,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Chasis metálico disipador de titanio, velocidades de lectura de hasta 1050 MB/s y cable USB-C mallado compatible con PC, Mac y consolas.',
      imagen: '/src/assets/images/prod_ssd_externo_1794885120225.jpg',
      stock: 11,
      destacado: 0,
      fecha_creacion: '2026-02-18T10:00:00.000Z',
    },
    {
      id: 19,
      nombre: 'Monitor Ultrawide 34" WQHD 144Hz Curvo',
      precio: 745000,
      precio_anterior: 860000,
      estado: 'nuevo',
      categoria: 'Monitores',
      descripcion:
        'Pantalla panorámica 21:9 de 34 pulgadas resolución 3440x1440, 144 Hz, panel VA de alto contraste y soporte metálico regulable en altura.',
      imagen: '/src/assets/images/prod_monitor_ultrawide_1794885565076.jpg',
      stock: 5,
      destacado: 1,
      fecha_creacion: '2026-02-19T10:00:00.000Z',
    },
    {
      id: 20,
      nombre: 'Auriculares In-Ear TWS Pro ANC',
      precio: 98000,
      precio_anterior: 119000,
      estado: 'nuevo',
      categoria: 'Audio',
      descripcion:
        'Cancelación activa de ruido adaptativa, modo transparencia, audio espacial de baja latencia y estuche con 32 horas totales de carga USB-C.',
      imagen: '/src/assets/images/prod_earbuds_tws_1794885565310.jpg',
      stock: 20,
      destacado: 0,
      fecha_creacion: '2026-02-20T10:00:00.000Z',
    },
    {
      id: 21,
      nombre: 'Micrófono Condensador USB Studio + Shock Mount',
      precio: 134000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Cápsula cardioide profesional de 24-bit/192 kHz, soporte antivibración metálico, perilla de ganancia integrada y botón táctil mute con aro LED.',
      imagen: '/src/assets/images/prod_microfono_usb_1794885566209.jpg',
      stock: 9,
      destacado: 0,
      fecha_creacion: '2026-02-21T10:00:00.000Z',
    },
    {
      id: 22,
      nombre: 'iPhone 13 128GB Midnight Certificado',
      precio: 569000,
      precio_anterior: 645000,
      estado: 'usado',
      categoria: 'Celulares',
      descripcion:
        'Equipo usado seleccionado con batería al 94%, Face ID 100% operativo, pantalla Super Retina XDR intacta y garantía escrita de 6 meses.',
      imagen: '/src/assets/images/prod_iphone_13_usado_1794885566134.jpg',
      stock: 6,
      destacado: 0,
      fecha_creacion: '2026-02-22T10:00:00.000Z',
    },
    {
      id: 23,
      nombre: 'Base de Carga Inalámbrica 3 en 1 MagSafe',
      precio: 86000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Estación magnética de aluminio anodizado para cargar simultáneamente smartphone, reloj inteligente y auriculares inalámbricos hasta 15W.',
      imagen: '/src/assets/images/prod_cargador_magsafe_1794885567573.jpg',
      stock: 14,
      destacado: 0,
      fecha_creacion: '2026-02-23T10:00:00.000Z',
    },
    {
      id: 24,
      nombre: 'Smartwatch Titanio AMOLED GPS 46mm',
      precio: 219000,
      precio_anterior: 255000,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Caja de titanio cepillado, pantalla AMOLED zafiro de 1.43 pulgadas, GPS dual banda, monitoreo cardíaco 24/7 y autonomía de hasta 14 días.',
      imagen: '/src/assets/images/prod_smartwatch_amoled_1794885567350.jpg',
      stock: 8,
      destacado: 0,
      fecha_creacion: '2026-02-24T10:00:00.000Z',
    },
    {
      id: 25,
      nombre: 'Tablet Pro 11" 256GB Wi-Fi + Pencil Magnético',
      precio: 695000,
      precio_anterior: 790000,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Pantalla Liquid 120 Hz de 11 pulgadas, procesador de 8 núcleos, 256 GB de almacenamiento y lápiz óptico magnético incluido para diseño y estudio.',
      imagen: '/src/assets/images/prod_tablet_pro_1794886081745.jpg',
      stock: 7,
      destacado: 1,
      fecha_creacion: '2026-02-25T10:00:00.000Z',
    },
    {
      id: 26,
      nombre: 'Router Wi-Fi 6E Mesh Gaming Tri-Band AX5400',
      precio: 248000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Cobertura de alta velocidad hasta 5.4 Gbps con banda dedicada de 6 GHz, puerto WAN 2.5G y priorización inteligente de tráfico para baja latencia.',
      imagen: '/src/assets/images/prod_router_wifi6e_1794886082541.jpg',
      stock: 9,
      destacado: 0,
      fecha_creacion: '2026-02-26T10:00:00.000Z',
    },
    {
      id: 27,
      nombre: 'Mousepad Gaming XXL Micro-Weave 900x400mm',
      precio: 34500,
      precio_anterior: 42000,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Superficie de tejido micro-texturizado optimizada para sensores ópticos de alta precisión, base de caucho antideslizante y bordes cosidos reforzados.',
      imagen: '/src/assets/images/prod_mousepad_xxl_1794886083272.jpg',
      stock: 22,
      destacado: 0,
      fecha_creacion: '2026-02-27T10:00:00.000Z',
    },
    {
      id: 28,
      nombre: 'Memoria RAM DDR5 32GB (2x16GB) 6000MHz CL30',
      precio: 189000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Kit dual channel de alto rendimiento con disipadores de aluminio anodizado, perfiles EXPO / XMP 3.0 e iluminación superior verde configurable.',
      imagen: '/src/assets/images/prod_ram_ddr5_1794886083383.jpg',
      stock: 12,
      destacado: 0,
      fecha_creacion: '2026-02-28T10:00:00.000Z',
    },
    {
      id: 29,
      nombre: 'Placa de Video RTX 4070 Super 12GB Triple Fan',
      precio: 980000,
      precio_anterior: 1120000,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Arquitectura Ada Lovelace con 12 GB GDDR6X, DLSS 3.5 con generación de fotogramas, Ray Tracing dedicado y triple ventilador silencioso.',
      imagen: '/src/assets/images/prod_gpu_rtx4070_1794886083006.jpg',
      stock: 4,
      destacado: 1,
      fecha_creacion: '2026-03-01T10:00:00.000Z',
    },
    {
      id: 30,
      nombre: 'Aro de Luz LED Estudio + Soporte Celular',
      precio: 49000,
      precio_anterior: null,
      estado: 'usado',
      categoria: 'Accesorios',
      descripcion:
        'Unidad de estudio testeada con temperatura bicolor regulable (3200K–5600K), control de intensidad y brazo metálico con pinza universal.',
      imagen: '/src/assets/images/prod_aro_led_estudio_1794886083975.jpg',
      stock: 6,
      destacado: 0,
      fecha_creacion: '2026-03-02T10:00:00.000Z',
    },
    {
      id: 31,
      nombre: 'Google Pixel 8 Pro 256GB Obsidian',
      precio: 925000,
      precio_anterior: 1040000,
      estado: 'nuevo',
      categoria: 'Celulares',
      descripcion:
        'Procesador Tensor G3, pantalla Super Actua LTPO 120 Hz, triple cámara profesional con teleobjetivo 5x y 7 años de soporte oficial.',
      imagen: '/src/assets/images/prod_pixel_8_pro_1794886493232.jpg',
      stock: 6,
      destacado: 1,
      fecha_creacion: '2026-03-03T10:00:00.000Z',
    },
    {
      id: 32,
      nombre: 'Samsung Galaxy A55 5G 256GB Graphite',
      precio: 469000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Celulares',
      descripcion:
        'Marco de aluminio cepillado, pantalla Super AMOLED 120 Hz de 6.6 pulgadas, resistencia al agua IP67 y triple cámara de 50 MP con OIS.',
      imagen: '/src/assets/images/prod_galaxy_a55_1794886493587.jpg',
      stock: 15,
      destacado: 0,
      fecha_creacion: '2026-03-04T10:00:00.000Z',
    },
    {
      id: 33,
      nombre: 'iPhone 14 Pro 256GB Space Black Certificado',
      precio: 840000,
      precio_anterior: 960000,
      estado: 'usado',
      categoria: 'Celulares',
      descripcion:
        'Equipo usado seleccionado con batería al 93%, Dynamic Island, cámara ProRAW de 48 MP y garantía escrita de 6 meses.',
      imagen: '/src/assets/images/prod_iphone_14_pro_1794886494812.jpg',
      stock: 4,
      destacado: 0,
      fecha_creacion: '2026-03-05T10:00:00.000Z',
    },
    {
      id: 34,
      nombre: 'Samsung Galaxy Z Flip 5 256GB Certificado',
      precio: 765000,
      precio_anterior: null,
      estado: 'usado',
      categoria: 'Celulares',
      descripcion:
        'Plegable compacto revisado en laboratorio con bisagra cero brecha, pantalla externa Flex Window y Snapdragon 8 Gen 2.',
      imagen: '/src/assets/images/prod_galaxy_flip5_1794886493895.jpg',
      stock: 3,
      destacado: 0,
      fecha_creacion: '2026-03-06T10:00:00.000Z',
    },
    {
      id: 35,
      nombre: 'Mini PC Workstation Ryzen 9 32GB SSD 1TB',
      precio: 1180000,
      precio_anterior: 1320000,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Chasis compacto de aluminio anodizado con Ryzen 9, 32 GB DDR5, doble salida HDMI/USB4 8K y red Ethernet 2.5G para estudio o trabajo.',
      imagen: '/src/assets/images/prod_mini_pc_1794886494887.jpg',
      stock: 5,
      destacado: 1,
      fecha_creacion: '2026-03-07T10:00:00.000Z',
    },
    {
      id: 36,
      nombre: 'Fuente Modular 850W 80+ Gold ATX 3.0',
      precio: 198000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Certificación 80 Plus Gold, cableado 100% modular mallado con conector nativo PCIe 5.0 12VHPWR y ventilador FDB silencioso.',
      imagen: '/src/assets/images/prod_psu_850w_1794886495063.jpg',
      stock: 10,
      destacado: 0,
      fecha_creacion: '2026-03-08T10:00:00.000Z',
    },
    {
      id: 37,
      nombre: 'SSD Interno M.2 NVMe PCIe Gen4 2TB',
      precio: 215000,
      precio_anterior: 249000,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Lectura secuencial de hasta 7300 MB/s con disipador de aluminio acanalado de fábrica, ideal para PC de alto rendimiento y PS5.',
      imagen: '/src/assets/images/prod_ssd_nvme_intern_1794886495107.jpg',
      stock: 14,
      destacado: 0,
      fecha_creacion: '2026-03-09T10:00:00.000Z',
    },
    {
      id: 38,
      nombre: 'Motherboard Z790 Pro Gaming Wi-Fi 6E',
      precio: 385000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Notebooks y PC',
      descripcion:
        'Fases de alimentación 16+1+2, soporte DDR5 hasta 7600 MHz, cuatro slots M.2 con disipadores y conectividad Wi-Fi 6E integrada.',
      imagen: '/src/assets/images/prod_motherboard_1794886495241.jpg',
      stock: 7,
      destacado: 0,
      fecha_creacion: '2026-03-10T10:00:00.000Z',
    },
    {
      id: 39,
      nombre: 'Monitor OLED 27" QHD 240Hz 0.03ms',
      precio: 1150000,
      precio_anterior: 1290000,
      estado: 'nuevo',
      categoria: 'Monitores',
      descripcion:
        'Panel OLED de negros puros con respuesta instantánea de 0.03 ms, frecuencia de 240 Hz, cobertura DCI-P3 99% y HDMI 2.1.',
      imagen: '/src/assets/images/prod_monitor_oled_1794886495995.jpg',
      stock: 4,
      destacado: 1,
      fecha_creacion: '2026-03-11T10:00:00.000Z',
    },
    {
      id: 40,
      nombre: 'Monitor Profesional 32" 4K UHD IPS Creator',
      precio: 690000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Monitores',
      descripcion:
        'Resolución 3840x2160 calibrada de fábrica Delta E < 2, hub USB-C con carga de 90W para notebook y base ergonómica pivoteable.',
      imagen: '/src/assets/images/prod_monitor_4k_1794886496498.jpg',
      stock: 6,
      destacado: 0,
      fecha_creacion: '2026-03-12T10:00:00.000Z',
    },
    {
      id: 41,
      nombre: 'Brazo Articulado Neumático para Monitor 17"-34"',
      precio: 74000,
      precio_anterior: 89000,
      estado: 'nuevo',
      categoria: 'Monitores',
      descripcion:
        'Pistón a gas reforzado para pantallas de hasta 10 kg, gestión oculta de cables, rotación 360 grados y fijación por prensa o pasacables.',
      imagen: '/src/assets/images/prod_brazo_monitor_1794886496890.jpg',
      stock: 15,
      destacado: 0,
      fecha_creacion: '2026-03-13T10:00:00.000Z',
    },
    {
      id: 42,
      nombre: 'Joystick Inalámbrico Pro Dual Hall Effect',
      precio: 92000,
      precio_anterior: 109000,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Sticks magnéticos Hall anti-drift, gatillos con bloqueo corto, botones traseros programables y receptor USB 2.4 GHz + Bluetooth.',
      imagen: '/src/assets/images/prod_gamepad_pro_1794886496704.jpg',
      stock: 12,
      destacado: 0,
      fecha_creacion: '2026-03-14T10:00:00.000Z',
    },
    {
      id: 43,
      nombre: 'Macro Pad Mecánico CNC 8 Teclas + Perilla',
      precio: 68000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Cuerpo sólido de aluminio mecanizado compatible con QMK/VIA, encoder rotatorio de precisión e iluminación inferior configurable.',
      imagen: '/src/assets/images/prod_macropad_1794886497847.jpg',
      stock: 11,
      destacado: 0,
      fecha_creacion: '2026-03-15T10:00:00.000Z',
    },
    {
      id: 44,
      nombre: 'Stream Control Deck 15 Teclas LCD',
      precio: 195000,
      precio_anterior: 229000,
      estado: 'nuevo',
      categoria: 'Periféricos',
      descripcion:
        'Quince teclas LCD personalizables para disparar escenas, macros de edición, audio y atajos en un toque con soporte inclinado.',
      imagen: '/src/assets/images/prod_stream_deck_1794886497474.jpg',
      stock: 8,
      destacado: 0,
      fecha_creacion: '2026-03-16T10:00:00.000Z',
    },
    {
      id: 45,
      nombre: 'Tableta Gráfica Digitalizadora Pro 10x6"',
      precio: 108000,
      precio_anterior: null,
      estado: 'usado',
      categoria: 'Periféricos',
      descripcion:
        'Unidad de demostración impecable con 8192 niveles de presión, inclinación de 60 grados, 6 teclas rápidas y lápiz sin batería.',
      imagen: '/src/assets/images/prod_tableta_grafica_1794886499203.jpg',
      stock: 5,
      destacado: 0,
      fecha_creacion: '2026-03-17T10:00:00.000Z',
    },
    {
      id: 46,
      nombre: 'Barra de Sonido Compacta PC USB-C / Bluetooth',
      precio: 84000,
      precio_anterior: 99000,
      estado: 'nuevo',
      categoria: 'Audio',
      descripcion:
        'Diseño de perfil bajo para ubicar debajo del monitor, doble driver de rango completo, perilla de volumen física y conexión USB o BT 5.3.',
      imagen: '/src/assets/images/prod_soundbar_pc_1794886498168.jpg',
      stock: 13,
      destacado: 0,
      fecha_creacion: '2026-03-18T10:00:00.000Z',
    },
    {
      id: 47,
      nombre: 'Interfaz de Audio USB-C 2x2 Estudio 24-Bit',
      precio: 165000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Audio',
      descripcion:
        'Dos preamplificadores de bajo ruido con alimentación Phantom 48V, monitoreo directo sin latencia y chasis metálico cepillado.',
      imagen: '/src/assets/images/prod_interfaz_audio_1794886498804.jpg',
      stock: 7,
      destacado: 0,
      fecha_creacion: '2026-03-19T10:00:00.000Z',
    },
    {
      id: 48,
      nombre: 'Cargador Auto Carga Rápida 60W Dual USB-C',
      precio: 29500,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Cuerpo metálico ultracompacto con doble puerto USB-C Power Delivery, aro LED verde indicador y cable mallado reforzado incluido.',
      imagen: '/src/assets/images/prod_cargador_auto_1794886499074.jpg',
      stock: 24,
      destacado: 0,
      fecha_creacion: '2026-03-20T10:00:00.000Z',
    },
    {
      id: 49,
      nombre: 'Base Refrigerante Notebook Dual Fan Metálica',
      precio: 58000,
      precio_anterior: 72000,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Superficie de malla metálica con doble ventilador silencioso de 140 mm, 5 niveles de inclinación y hub USB integrado.',
      imagen: '/src/assets/images/prod_base_cooler_1794886499807.jpg',
      stock: 15,
      destacado: 0,
      fecha_creacion: '2026-03-21T10:00:00.000Z',
    },
    {
      id: 50,
      nombre: 'Cámara Seguridad Smart Wi-Fi 2K Motorizada',
      precio: 62000,
      precio_anterior: null,
      estado: 'nuevo',
      categoria: 'Accesorios',
      descripcion:
        'Resolución 2K QHD, visión nocturna infrarroja, seguimiento automático de movimiento 360°, audio bidireccional y ranura microSD.',
      imagen: '/src/assets/images/prod_camara_smart_1794886499991.jpg',
      stock: 18,
      destacado: 0,
      fecha_creacion: '2026-03-22T10:00:00.000Z',
    },
  ],
  consultas: [
    {
      id: 1,
      nombre: 'Martín Gómez',
      email: 'martin.gomez@correo.com',
      telefono: '+54 9 11 5542-8810',
      asunto: 'Servicio Técnico',
      mensaje:
        'Hola, necesito consultar presupuesto para cambio de módulo de pantalla de un Galaxy S23.',
      fecha: '2026-03-01T14:20:00.000Z',
    },
    {
      id: 2,
      nombre: 'Lucía Fernández',
      email: 'lucia.f@correo.com',
      telefono: '+54 9 11 4412-9034',
      asunto: 'Stock Notebooks',
      mensaje:
        '¿Tienen disponible envío inmediato a Córdoba para la Notebook ProBook X15?',
      fecha: '2026-03-02T16:45:00.000Z',
    },
  ],
};

let mysqlPool: mysql.Pool | null = null;
let mysqlAvailable: boolean | null = null;

async function getMysqlPool(): Promise<mysql.Pool | null> {
  if (mysqlAvailable === false) return null;
  if (!process.env.DB_HOST || !process.env.DB_NAME) {
    mysqlAvailable = false;
    return null;
  }

  if (!mysqlPool) {
    try {
      mysqlPool = mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'tienda_electro',
        waitForConnections: true,
        connectionLimit: 10,
      });
      await mysqlPool.query('SELECT 1');
      mysqlAvailable = true;
    } catch {
      mysqlAvailable = false;
      mysqlPool = null;
      return null;
    }
  }
  return mysqlPool;
}

function readLocalStore(): LocalStore {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_DATA, null, 2), 'utf-8');
    return JSON.parse(JSON.stringify(SEED_DATA)) as LocalStore;
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as LocalStore;
}

function writeLocalStore(store: LocalStore): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export interface ProductFilter {
  categoria?: string;
  estado?: string;
  q?: string;
  ofertas?: boolean;
}

export async function getProductos(filter: ProductFilter = {}): Promise<Producto[]> {
  const pool = await getMysqlPool();
  if (pool) {
    const clauses: string[] = [];
    const params: unknown[] = [];
    if (filter.categoria && filter.categoria !== 'Todas') {
      clauses.push('categoria = ?');
      params.push(filter.categoria);
    }
    if (filter.estado && (filter.estado === 'nuevo' || filter.estado === 'usado')) {
      clauses.push('estado = ?');
      params.push(filter.estado);
    }
    if (filter.ofertas) {
      clauses.push('precio_anterior IS NOT NULL AND precio_anterior > precio');
    }
    if (filter.q) {
      clauses.push('(nombre LIKE ? OR descripcion LIKE ? OR categoria LIKE ?)');
      const term = `%${filter.q}%`;
      params.push(term, term, term);
    }
    const where = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      `SELECT * FROM productos ${where} ORDER BY destacado DESC, id ASC`,
      params,
    );
    return rows.map((r) => ({
      ...(r as Producto),
      precio: Number(r.precio),
      precio_anterior: r.precio_anterior !== null ? Number(r.precio_anterior) : null,
    }));
  }

  const store = readLocalStore();
  let list = [...store.productos];
  if (filter.categoria && filter.categoria !== 'Todas') {
    list = list.filter((p) => p.categoria.toLowerCase() === filter.categoria!.toLowerCase());
  }
  if (filter.estado && (filter.estado === 'nuevo' || filter.estado === 'usado')) {
    list = list.filter((p) => p.estado === filter.estado);
  }
  if (filter.ofertas) {
    list = list.filter((p) => p.precio_anterior !== null && p.precio_anterior > p.precio);
  }
  if (filter.q) {
    const term = filter.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term),
    );
  }
  return list.sort((a, b) => b.destacado - a.destacado || a.id - b.id);
}

export async function getProductoById(id: number): Promise<Producto | null> {
  const pool = await getMysqlPool();
  if (pool) {
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM productos WHERE id = ? LIMIT 1',
      [id],
    );
    if (!rows.length) return null;
    const r = rows[0];
    return {
      ...(r as Producto),
      precio: Number(r.precio),
      precio_anterior: r.precio_anterior !== null ? Number(r.precio_anterior) : null,
    };
  }
  const store = readLocalStore();
  return store.productos.find((p) => p.id === id) || null;
}

export async function createProducto(
  data: Omit<Producto, 'id' | 'fecha_creacion'>,
): Promise<Producto> {
  const pool = await getMysqlPool();
  if (pool) {
    const [result] = await pool.query<mysql.ResultSetHeader>(
      `INSERT INTO productos (nombre, precio, precio_anterior, estado, categoria, descripcion, imagen, stock, destacado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.precio,
        data.precio_anterior,
        data.estado,
        data.categoria,
        data.descripcion,
        data.imagen,
        data.stock,
        data.destacado,
      ],
    );
    const created = await getProductoById(result.insertId);
    if (created) return created;
  }

  const store = readLocalStore();
  const nextId =
    store.productos.length > 0 ? Math.max(...store.productos.map((p) => p.id)) + 1 : 1;
  const newProd: Producto = {
    ...data,
    id: nextId,
    fecha_creacion: new Date().toISOString(),
  };
  store.productos.push(newProd);
  writeLocalStore(store);
  return newProd;
}

export async function updateProducto(
  id: number,
  data: Partial<Omit<Producto, 'id' | 'fecha_creacion'>>,
): Promise<Producto | null> {
  const pool = await getMysqlPool();
  if (pool) {
    const existing = await getProductoById(id);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    await pool.query(
      `UPDATE productos SET nombre=?, precio=?, precio_anterior=?, estado=?, categoria=?, descripcion=?, imagen=?, stock=?, destacado=? WHERE id=?`,
      [
        merged.nombre,
        merged.precio,
        merged.precio_anterior,
        merged.estado,
        merged.categoria,
        merged.descripcion,
        merged.imagen,
        merged.stock,
        merged.destacado,
        id,
      ],
    );
    return getProductoById(id);
  }

  const store = readLocalStore();
  const idx = store.productos.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store.productos[idx] = { ...store.productos[idx], ...data };
  writeLocalStore(store);
  return store.productos[idx];
}

export async function deleteProducto(id: number): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    const [res] = await pool.query<mysql.ResultSetHeader>(
      'DELETE FROM productos WHERE id = ?',
      [id],
    );
    return res.affectedRows > 0;
  }
  const store = readLocalStore();
  const prevLen = store.productos.length;
  store.productos = store.productos.filter((p) => p.id !== id);
  if (store.productos.length === prevLen) return false;
  writeLocalStore(store);
  return true;
}

export async function findUsuarioByUsername(usuario: string): Promise<Usuario | null> {
  const pool = await getMysqlPool();
  if (pool) {
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM usuarios WHERE usuario = ? LIMIT 1',
      [usuario],
    );
    return rows.length ? (rows[0] as Usuario) : null;
  }
  const store = readLocalStore();
  return store.usuarios.find((u) => u.usuario === usuario) || null;
}

export async function createConsulta(data: {
  nombre: string;
  email: string;
  telefono?: string | null;
  asunto?: string;
  mensaje: string;
}): Promise<Consulta> {
  const pool = await getMysqlPool();
  if (pool) {
    const [result] = await pool.query<mysql.ResultSetHeader>(
      `INSERT INTO consultas (nombre, email, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.email,
        data.telefono || null,
        data.asunto || 'Consulta general',
        data.mensaje,
      ],
    );
    return {
      id: result.insertId,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || null,
      asunto: data.asunto || 'Consulta general',
      mensaje: data.mensaje,
      fecha: new Date().toISOString(),
    };
  }

  const store = readLocalStore();
  const nextId =
    store.consultas.length > 0 ? Math.max(...store.consultas.map((c) => c.id)) + 1 : 1;
  const nueva: Consulta = {
    id: nextId,
    nombre: data.nombre,
    email: data.email,
    telefono: data.telefono || null,
    asunto: data.asunto || 'Consulta general',
    mensaje: data.mensaje,
    fecha: new Date().toISOString(),
  };
  store.consultas.unshift(nueva);
  writeLocalStore(store);
  return nueva;
}

export async function getConsultas(): Promise<Consulta[]> {
  const pool = await getMysqlPool();
  if (pool) {
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM consultas ORDER BY fecha DESC',
    );
    return rows as Consulta[];
  }
  const store = readLocalStore();
  return [...store.consultas].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  );
}

export async function deleteConsulta(id: number): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    const [res] = await pool.query<mysql.ResultSetHeader>(
      'DELETE FROM consultas WHERE id = ?',
      [id],
    );
    return res.affectedRows > 0;
  }
  const store = readLocalStore();
  const prev = store.consultas.length;
  store.consultas = store.consultas.filter((c) => c.id !== id);
  if (store.consultas.length === prev) return false;
  writeLocalStore(store);
  return true;
}
